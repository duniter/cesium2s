import { Inject, Injectable, Optional } from '@angular/core';
import { Peers } from '@app/shared/services/network/peer.model';
import { Promise } from '@rx-angular/cdk/zone-less/browser';
import { SettingsService } from '@app/settings/settings.service';
import { arrayRandomPick, firstArrayValue, isNil, isNotNil, isNotNilOrBlank, toBoolean, toNumber } from '@app/shared/functions';
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
  BlockEdge,
  BlockOrderBy,
  CertConnection,
  IndexerGraphqlService,
  LightAccountConnectionFragment,
  OrderBy,
  TransferFragment,
} from './indexer-types.generated';
import { firstValueFrom, mergeMap, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
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
  minBlockHeight: number;
}

@Injectable({ providedIn: 'root' })
export class IndexerService extends GraphqlService<IndexerState> {
  @RxStateSelect() currency$: Observable<Currency>;
  @RxStateProperty() currency: Currency;

  @RxStateSelect() minBlockHeight$: Observable<number>;
  @RxStateProperty() minBlockHeight: number;

  constructor(
    storage: StorageService,
    private settings: SettingsService,
    private graphqlService: IndexerGraphqlService,
    @Optional() @Inject(APP_GRAPHQL_TYPE_POLICIES) typePolicies: TypePolicies,
    @Optional() @Inject(APP_GRAPHQL_FRAGMENTS) fragments: DocumentNode[]
  ) {
    super(storage, typePolicies, fragments, {
      name: 'indexer-service',
      startByReadyFunction: false, // Need an explicit call to start()
    });

    this.connect(
      'minBlockHeight',
      this.currency$.pipe(
        filter(isNotNil),
        mergeMap(async (currency) => {
          let result = currency?.minBlockHeight;
          if (isNil(result)) {
            await this.ready();
            const firstIndexedBlock = (
              await firstValueFrom(this.blockSearch({ where: { height: { _lt: 0 } } }, { after: null, first: 1, orderBy: { height: OrderBy.Asc } }))
            )?.[0];
            result = firstIndexedBlock?.height;
          }
          return result;
        })
      )
    );
  }

  wotSearch(filter: WotSearchFilter, options: { after?: string; first?: number; fetchPolicy?: FetchPolicy }): Observable<LoadResult<Account>> {
    console.info(`${this._logPrefix}Searching wot by filter...`, filter);

    options = {
      after: null,
      first: this.fetchSize,
      ...options,
    };

    let data$: Observable<LightAccountConnectionFragment>;
    if (isNotNilOrBlank(filter.uid)) {
      data$ = this.graphqlService
        .wotSearchByUid(
          {
            name: filter.uid,
            after: options.after,
            first: options.first,
            orderBy: { identity: { index: OrderBy.Asc } },
          },
          {
            fetchPolicy: options.fetchPolicy || 'cache-first',
          }
        )
        .pipe(map(({ data }) => data.accountConnection as LightAccountConnectionFragment));
    } else if (isNotNilOrBlank(filter.address)) {
      data$ = this.graphqlService
        .wotSearchByAddress(
          {
            address: filter.address,
            after: options.after,
            first: options.first,
            orderBy: { identity: { index: OrderBy.Asc } },
          },
          {
            fetchPolicy: options.fetchPolicy || 'cache-first',
          }
        )
        .pipe(map(({ data }) => data.accountConnection as LightAccountConnectionFragment));
    } else if (isNotNilOrBlank(filter.searchText)) {
      data$ = this.graphqlService
        .wotSearchByText(
          {
            searchText: `%${filter.searchText}%`,
            after: options.after,
            first: options.first,
            orderBy: { identity: { index: OrderBy.Asc } },
          },
          {
            fetchPolicy: options.fetchPolicy || 'cache-first',
          }
        )
        .pipe(map(({ data }) => data.accountConnection as LightAccountConnectionFragment));
    } else {
      data$ = this.graphqlService
        .wotSearchLast(
          {
            after: options.after,
            first: options.first,
            orderBy: { identity: { index: OrderBy.Asc } },
            pending: toBoolean(filter.pending, false),
          },
          {
            fetchPolicy: options.fetchPolicy || 'cache-first',
          }
        )
        .pipe(map(({ data }) => data.accountConnection as LightAccountConnectionFragment));
    }

    return data$.pipe(
      map((connection: LightAccountConnectionFragment) => {
        const data = AccountConverter.squidConnectionToAccounts(connection);
        const result: LoadResult<Account> = { data };
        if (connection.pageInfo.hasNextPage) {
          const endCursor = connection.pageInfo.endCursor;
          result.fetchMore = (first) => {
            console.debug(`${this._logPrefix}Fetching more accounts - offset: ${endCursor}`);
            return firstValueFrom(this.wotSearch(filter, { ...options, after: endCursor, first: toNumber(first, options.first) }));
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
      after: null,
      first: this.defaultFetchSize,
      ...options,
    };

    if (filter?.address) {
      return this.graphqlService
        .transferConnectionByAddress(
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
      after: null,
      first: this.defaultFetchSize,
      ...options,
    };
    if (CertificationSearchFilterUtils.isEmpty(filter)) throw new Error('Filter is empty!');

    const variables = {
      address: filter.issuer || filter.receiver,
      first: options.first,
      after: options.after,
      orderBy: [{ expireOn: OrderBy.DescNullsFirst }, { updatedOn: OrderBy.DescNullsLast }],
    };
    const fetchOptions = { fetchPolicy: options?.fetchPolicy };
    const toEntities = (connection: CertConnection, total: number) => {
      if (!connection || !total) return { data: [], total };

      const data = CertificationConverter.connectionToCertifications(connection as CertConnection, isNotNilOrBlank(filter.receiver), true);
      const result: LoadResult<Certification> = { data, total };
      if (connection.pageInfo.hasNextPage) {
        const after = connection.pageInfo.endCursor;
        result.fetchMore = (first) => firstValueFrom(this.certsSearch(filter, { ...options, after, first: toNumber(first, options.first) }));
      }
      return result;
    };
    if (isNotNilOrBlank(filter.issuer)) {
      return this.graphqlService.certsConnectionByIssuer(variables, fetchOptions).pipe(
        map(({ data }) => {
          const res = data.identityConnection.edges[0]?.node;
          return toEntities(res?.connection as CertConnection, res?.aggregate.aggregate.count || 0);
        })
      );
    } else {
      return this.graphqlService.certsConnectionByReceiver(variables, fetchOptions).pipe(
        map(({ data }) => {
          const res = data.identityConnection.edges[0]?.node;
          return toEntities(res?.connection as CertConnection, res?.aggregate.aggregate.count || 0);
        })
      );
    }
  }

  blockSearch(filter: BlockSearchFilter, options?: { first: number; after?: string; orderBy?: BlockOrderBy }): Observable<Block[]> {
    console.info(`${this._logPrefix}Searching block...`, filter);

    options = {
      after: null,
      first: this.defaultFetchSize,
      orderBy: { height: OrderBy.Desc },
      ...options,
    };

    if (isNotNilOrBlank(filter?.id)) {
      return this.blockById(filter.id).pipe(map((block) => [block]));
    }

    if (isNotNilOrBlank(filter?.height)) {
      return this.graphqlService
        .blocks({
          ...options,
          after: null,
          first: 1,
          where: { height: { _eq: filter.height } },
        })
        .pipe(map(({ data: { blockConnection } }) => BlockConverter.toBlocks(blockConnection.edges as BlockEdge[], true)));
    }

    return this.graphqlService
      .blocks({
        ...options,
        where: filter?.where,
      })
      .pipe(map(({ data: { blockConnection } }) => BlockConverter.toBlocks(blockConnection.edges as BlockEdge[], true)));
  }

  blockById(id: string): Observable<Block> {
    console.info(`${this._logPrefix}Loading block #${id}`);
    return this.graphqlService
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
      fetchSize: this.defaultFetchSize,
      minBlockHeight: currency?.minBlockHeight,
    };
  }
}
