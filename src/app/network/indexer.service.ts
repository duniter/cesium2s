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
  CertFragment,
  CertsConnectionByIssuerQuery,
  CertsConnectionByReceiverQuery,
  IndexerGraphqlService,
  OrderBy,
  TransferFragment,
  BlockOrderBy,
  BlockEdge,
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

  wotSearch(filter: WotSearchFilter, options: { after?: string; first?: number; fetchPolicy?: FetchPolicy }): Observable<LoadResult<Account>> {
    console.info(`${this._logPrefix}Searching wot by filter...`, filter);

    options = {
      after: null,
      first: 10,
      ...options,
    };

    let data$: Observable<Account[]>;
    if (isNotNilOrBlank(filter.address)) {
      data$ = this.indexerGraphqlService
        .wotSearchByAddress(
          {
            address: filter.address,
            after: options.after,
            first: options.first,
            orderBy: { identity: { index: OrderBy.Asc } },
          },
          {
            fetchPolicy: options.fetchPolicy,
          }
        )
        .pipe(map(({ data }) => AccountConverter.toAccounts(data?.accountConnection.edges.map((edge) => edge.node))));
    } else if (isNotNilOrBlank(filter.searchText)) {
      data$ = this.indexerGraphqlService
        .wotSearchByText({
          searchText: `%${filter.searchText}%`,
          after: options.after,
          first: options.first,
          orderBy: { identity: { index: OrderBy.Asc } },
        })
        .pipe(map(({ data }) => AccountConverter.toAccounts(data?.accountConnection.edges.map((edge) => edge.node))));
    } else {
      data$ = this.indexerGraphqlService
        .wotSearchLastWatch({
          after: options.after,
          first: options.first,
          orderBy: { identity: { index: OrderBy.Asc } },
          pending: toBoolean(filter.pending, false),
        })
        .valueChanges.pipe(map(({ data }) => AccountConverter.toAccounts(data?.accountConnection.edges.map((edge) => edge.node))));
    }

    return data$.pipe(
      map((items) => {
        const result: LoadResult<Account> = { data: items };
        if (items.length > options.first) {
          items = items.slice(0, options.first);
          const nextCursor = options.after + options.first;
          result.data = items;
          result.fetchMore = (first) => {
            console.debug(`${this._logPrefix}Fetching more accounts - offset: ${nextCursor}`);
            return firstValueFrom(this.wotSearch(filter, { ...options, after: nextCursor, first: toNumber(first, options.first) }));
          };
        }
        return result;
      })
    );
  }

  transferSearch(
    filter: TransferSearchFilter,
    options: { first?: number; after?: string; fetchPolicy?: FetchPolicy }
  ): Observable<LoadResult<Transfer>> {
    console.info(`${this._logPrefix}Searching transfers...`, filter && JSON.stringify(filter));
    options = {
      first: 10,
      after: null,
      ...options,
    };

    if (filter?.address) {
      return this.indexerGraphqlService
        .transfersConnectionByAddress(
          {
            address: filter.address,
            first: options.first,
            after: options.after,
            orderBy: { timestamp: OrderBy.DescNullsLast },
          },
          {
            fetchPolicy: options?.fetchPolicy,
          }
        )
        .pipe(
          map(({ data: { transferConnection } }) => {
            const inputs = transferConnection.edges?.map((edge: { node: TransferFragment }) => edge.node);
            const data = TransferConverter.toTransfers(filter.address, inputs, true);
            const result: LoadResult<Transfer> = { data };
            if (transferConnection.pageInfo.hasNextPage) {
              const after = transferConnection.pageInfo.endCursor;
              result.fetchMore = (first) => firstValueFrom(this.transferSearch(filter, { ...options, after, first: toNumber(first, options.first) }));
            }
            return result;
          })
        );
    }
  }

  certsSearch(
    filter: CertificationSearchFilter,
    options?: { first?: number; after?: string; fetchPolicy?: FetchPolicy }
  ): Observable<LoadResult<Certification>> {
    console.info(`${this._logPrefix}Searching certifications...`, filter && JSON.stringify(filter));
    options = {
      first: 10,
      after: null,
      ...options,
    };
    if (CertificationSearchFilterUtils.isEmpty(filter)) throw new Error('Filter is empty!');

    const variables = {
      address: filter.issuer || filter.receiver,
      first: options.first,
      after: options.after,
      orderBy: { createdOn: OrderBy.DescNullsLast },
    };
    const fetchOptions = { fetchPolicy: options?.fetchPolicy };
    const toEntities = (certsConnection: CertsConnectionByIssuerQuery['certConnection'] | CertsConnectionByReceiverQuery['certConnection']) => {
      const inputs = certsConnection.edges?.map((edge) => edge.node as CertFragment);
      const data = CertificationConverter.toCertifications(inputs, true);
      const result: LoadResult<Certification> = { data, total: certsConnection.edges.length }; //FIXME(poka): totalCount is not length of edges
      if (certsConnection.pageInfo.hasNextPage) {
        const after = certsConnection.pageInfo.endCursor;
        result.fetchMore = (first) => firstValueFrom(this.certsSearch(filter, { ...options, after, first: toNumber(first, options.first) }));
      }
      return result;
    };
    if (isNotNilOrBlank(filter.issuer)) {
      return this.indexerGraphqlService.certsConnectionByIssuer(variables, fetchOptions).pipe(map(({ data }) => toEntities(data.certConnection)));
    } else {
      return this.indexerGraphqlService.certsConnectionByReceiver(variables, fetchOptions).pipe(map(({ data }) => toEntities(data.certConnection)));
    }
  }

  blockSearch(filter: BlockSearchFilter, options?: { first: number; after?: string; orderBy?: BlockOrderBy }): Observable<Block[]> {
    console.info(`${this._logPrefix}Searching block...`, filter);

    options = {
      first: 10,
      after: null,
      orderBy: { height: OrderBy.Desc },
      ...options,
    };

    if (isNotNilOrBlank(filter.id)) {
      return this.blockById(filter.id).pipe(map((block) => [block]));
    }

    if (isNotNilOrBlank(filter.height)) {
      return this.indexerGraphqlService
        .blocks({
          ...options,
          where: { height: { _eq: filter.height } },
          first: 0,
          after: null,
        })
        .pipe(map(({ data: { blockConnection } }) => BlockConverter.toBlocks(blockConnection.edges as BlockEdge[], true)));
    }

    return of(<Block[]>[]); // TODO
  }

  blockById(id: string): Observable<Block> {
    console.info(`${this._logPrefix}Loading block #${id}`);
    return this.indexerGraphqlService
      .blockById({ id })
      .pipe(map(({ data: { blockConnection } }) => BlockConverter.toBlock(blockConnection.edges[0] as BlockEdge)));
  }

  blockByHeight(height: number): Observable<Block> {
    return this.blockSearch({ height }, { first: 1, after: null }).pipe(map(firstArrayValue));
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
