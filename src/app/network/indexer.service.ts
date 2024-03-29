import { Inject, Injectable, Optional } from '@angular/core';
import { Peer, Peers } from '@app/shared/services/network/peer.model';
import { Promise } from '@rx-angular/cdk/zone-less/browser';
import { SettingsService } from '@app/settings/settings.service';
import { arrayRandomPick, firstArrayValue, isNotNilOrBlank, toBoolean, toNumber } from '@app/shared/functions';
import { TypePolicies } from '@apollo/client/core';
import {
  APP_GRAPHQL_FRAGMENTS,
  APP_GRAPHQL_TYPE_POLICIES,
  GraphqlService,
  GraphqlServiceState,
} from '@app/shared/services/network/graphql/graphql.service';
import { DocumentNode } from 'graphql/index';
import { StorageService } from '@app/shared/services/storage/storage.service';
import { Account } from '@app/account/account.model';
import {
  AccountOrderByInput,
  BlockOrderByInput,
  CertFragment,
  CertOrderByInput,
  CertsConnectionByIssuerQuery,
  CertsConnectionByReceiverQuery,
  IndexerGraphqlService,
  TransferFragment,
  TransferOrderByInput,
} from './indexer-types.generated';
import { firstValueFrom, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transfer, TransferConverter, TransferSearchFilter } from '@app/transfer/transfer.model';
import { WotSearchFilter } from '@app/wot/wot.model';
import { Block, BlockConverter, BlockSearchFilter } from '@app/block/block.model';
import { LoadResult } from '@app/shared/services/service.model';
import { Currency } from '@app/currency/currency.model';
import { RxStateProperty, RxStateSelect } from '@app/shared/decorator/state.decorator';
import { firstNotNilPromise } from '@app/shared/observables';
import { FetchPolicy } from '@apollo/client';
import {
  Certification,
  CertificationConverter,
  CertificationSearchFilter,
  CertificationSearchFilterUtils,
} from '@app/certification/history/cert-history.model';
import { AccountConverter } from '@app/account/account.converter';

export interface IndexerState extends GraphqlServiceState {
  currency: Currency;
}

@Injectable({ providedIn: 'root' })
export class IndexerService extends GraphqlService<IndexerState> {
  @RxStateSelect() currency$: Observable<Currency>;
  @RxStateProperty() currency: Currency;

  constructor(
    storage: StorageService,
    private settings: SettingsService,
    private indexerGraphqlService: IndexerGraphqlService,
    @Optional() @Inject(APP_GRAPHQL_TYPE_POLICIES) typePolicies: TypePolicies,
    @Optional() @Inject(APP_GRAPHQL_FRAGMENTS) fragments: DocumentNode[]
  ) {
    super(storage, typePolicies, fragments, {
      name: 'indexer-service',
      startByReadyFunction: false, // Need an explicit call to start()
    });
  }

  wotSearch(filter: WotSearchFilter, options: { offset?: number; limit?: number; fetchPolicy?: FetchPolicy }): Observable<LoadResult<Account>> {
    console.info(`${this._logPrefix}Searching wot by filter...`, filter);

    options = {
      offset: 0,
      limit: 10,
      ...options,
    };

    let data$: Observable<Account[]>;
    if (isNotNilOrBlank(filter.address)) {
      data$ = this.indexerGraphqlService
        .wotSearchByAddress(
          {
            address: filter.address,
            offset: options.offset,
            limit: options.limit + 1, // Add 1 item, to check if can fetch more
            orderBy: [AccountOrderByInput.IdAsc],
          },
          {
            fetchPolicy: options.fetchPolicy,
          }
        )
        .pipe(map(({ data }) => AccountConverter.toAccounts(data?.accounts)));
    } else if (isNotNilOrBlank(filter.searchText)) {
      data$ = this.indexerGraphqlService
        .wotSearchByText({
          searchText: filter.searchText,
          offset: options.offset,
          limit: options.limit + 1, // Add 1 item, to check if can fetch more
          orderBy: [AccountOrderByInput.IdentityNameAsc],
        })
        .pipe(map(({ data }) => AccountConverter.toAccounts(data?.accounts)));
    } else {
      data$ = this.indexerGraphqlService
        .wotSearchLastWatch({
          offset: options.offset,
          limit: options.limit + 1, // Add 1 item, to check if can fetch more
          orderBy: [AccountOrderByInput.IdentityIndexDesc],
          pending: toBoolean(filter.pending, false),
        })
        .valueChanges.pipe(map(({ data }) => AccountConverter.toAccounts(data?.accounts)));
    }

    return data$.pipe(
      map((items) => {
        const result: LoadResult<Account> = { data: items };
        if (items.length > options.limit) {
          items = items.slice(0, options.limit);
          const nextOffset = options.offset + options.limit;
          result.data = items;
          result.fetchMore = (limit) => {
            console.debug(`${this._logPrefix}Fetching more accounts - offset: ${nextOffset}`);
            return firstValueFrom(this.wotSearch(filter, { ...options, offset: nextOffset, limit: toNumber(limit, options.limit) }));
          };
        }
        return result;
      })
    );
  }

  transferSearch(
    filter: TransferSearchFilter,
    options: { limit?: number; after?: string; fetchPolicy?: FetchPolicy }
  ): Observable<LoadResult<Transfer>> {
    console.info(`${this._logPrefix}Searching transfers...`, filter && JSON.stringify(filter));
    options = {
      limit: 10,
      after: null,
      ...options,
    };

    if (filter?.address) {
      return this.indexerGraphqlService
        .transfersConnectionByAddress(
          {
            address: filter.address,
            limit: options.limit,
            after: options.after,
            orderBy: [TransferOrderByInput.TimestampDescNullsLast],
          },
          {
            fetchPolicy: options?.fetchPolicy,
          }
        )
        .pipe(
          map(({ data: { transfersConnection } }) => {
            const inputs = transfersConnection.edges?.map((edge: { node: TransferFragment }) => edge.node);
            const data = TransferConverter.toTransfers(filter.address, inputs, true);
            const result: LoadResult<Transfer> = { data };
            if (transfersConnection.pageInfo.hasNextPage) {
              const after = transfersConnection.pageInfo.endCursor;
              result.fetchMore = (limit) => firstValueFrom(this.transferSearch(filter, { ...options, after, limit: toNumber(limit, options.limit) }));
            }
            return result;
          })
        );
    }
  }

  certsSearch(
    filter: CertificationSearchFilter,
    options?: { limit?: number; after?: string; fetchPolicy?: FetchPolicy }
  ): Observable<LoadResult<Certification>> {
    console.info(`${this._logPrefix}Searching certifications...`, filter && JSON.stringify(filter));
    options = {
      limit: 10,
      after: null,
      ...options,
    };
    if (CertificationSearchFilterUtils.isEmpty(filter)) throw new Error('Filter is empty!');

    const variables = {
      address: filter.issuer || filter.receiver,
      limit: options.limit,
      after: options.after,
      orderBy: [CertOrderByInput.CreatedOnDesc, CertOrderByInput.ExpireOnDesc],
    };
    const fetchOptions = { fetchPolicy: options?.fetchPolicy };
    const toEntities = (certsConnection: CertsConnectionByIssuerQuery['certsConnection'] | CertsConnectionByReceiverQuery['certsConnection']) => {
      const inputs = certsConnection.edges?.map((edge) => edge.node as CertFragment);
      const data = CertificationConverter.toCertifications(inputs, true);
      const result: LoadResult<Certification> = { data, total: certsConnection.totalCount };
      if (certsConnection.pageInfo.hasNextPage) {
        const after = certsConnection.pageInfo.endCursor;
        result.fetchMore = (limit) => firstValueFrom(this.certsSearch(filter, { ...options, after, limit: toNumber(limit, options.limit) }));
      }
      return result;
    };
    if (isNotNilOrBlank(filter.issuer)) {
      return this.indexerGraphqlService.certsConnectionByIssuer(variables, fetchOptions).pipe(map(({ data }) => toEntities(data.certsConnection)));
    } else {
      return this.indexerGraphqlService.certsConnectionByReceiver(variables, fetchOptions).pipe(map(({ data }) => toEntities(data.certsConnection)));
    }
  }

  blockSearch(filter: BlockSearchFilter, options?: { limit: number; offset: number; orderBy?: BlockOrderByInput[] }): Observable<Block[]> {
    console.info(`${this._logPrefix}Searching block...`, filter);

    options = {
      limit: 10,
      offset: 0,
      orderBy: [BlockOrderByInput.HeightDesc],
      ...options,
    };

    if (isNotNilOrBlank(filter.id)) {
      return this.blockById(filter.id).pipe(map((block) => [block]));
    }

    if (isNotNilOrBlank(filter.height)) {
      return this.indexerGraphqlService
        .blocks({
          ...options,
          where: { height_eq: filter.height },
        })
        .pipe(map(({ data: { blocks } }) => BlockConverter.toBlocks(blocks, true)));
    }

    return of(<Block[]>[]); // TODO
  }

  blockById(id: string): Observable<Block> {
    console.info(`${this._logPrefix}Loading block #${id}`);
    return this.indexerGraphqlService.blockById({ id }).pipe(map(({ data: { blockById } }) => BlockConverter.toBlock(blockById)));
  }

  blockByHeight(height: number): Observable<Block> {
    return this.blockSearch({ height }, { limit: 1, offset: 0 }).pipe(map(firstArrayValue));
  }

  protected async ngOnStart(): Promise<IndexerState> {
    // Wait settings and storage
    const [settings, currency] = await Promise.all([this.settings.ready(), firstNotNilPromise(this.currency$)]);

    let peer = Peers.fromUri(settings.indexer);
    if (!peer) {
      const peers = await this.filterAlivePeers(settings.preferredIndexers);
      if (!peers.length) {
        throw { message: 'ERROR.CHECK_NETWORK_CONNECTION' };
      }
      peer = arrayRandomPick(peers);
    }

    const client = await super.createClient(peer, 'indexer');

    return {
      peer,
      client,
      currency,
      offline: false,
    };
  }

  protected async ngOnStop(): Promise<void> {
    super.ngOnStop();
  }

  protected async filterAlivePeers(
    peers: string[],
    opts?: {
      timeout?: number;
    }
  ): Promise<Peer[]> {
    const result: Peer[] = [];
    await Promise.all(
      peers
        .map((peer) => Peers.fromUri(peer))
        .map((peer) =>
          this.isPeerAlive(peer, opts).then((alive) => {
            if (!alive) return;
            result.push(peer);
          })
        )
    );
    return result;
  }

  protected async isPeerAlive(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    peer: Peer,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    opts?: {
      timeout?: number;
    }
  ): Promise<boolean> {
    // TODO
    return Promise.resolve(true);
  }
}
