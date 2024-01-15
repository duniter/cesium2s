import { Inject, Injectable, Optional } from '@angular/core';
import { Peer, Peers } from '@app/shared/services/network/peer.model';
import { Promise } from '@rx-angular/cdk/zone-less/browser';
import { SettingsService } from '@app/settings/settings.service';
import { arrayRandomPick, firstArrayValue, isNil, isNotNilOrBlank, toBoolean, toNumber } from '@app/shared/functions';
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
import { AccountOrderByInput, BlockOrderByInput, IndexerGraphqlService, TransferOrderByInput } from './indexer-types.generated';
import { firstValueFrom, mergeMap, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IndexerFragmentConverter } from './indexer.utils';
import { Transfer, TransferComparators, TransferSearchFilter } from '@app/transfer/transfer.model';
import { WotSearchFilter } from '@app/wot/wot.model';
import { Block, BlockSearchFilter } from '@app/block/block.model';
import { DateUtils, fromDateISOString, toDateISOString } from '@app/shared/dates';
import { LoadResult } from '@app/shared/services/service.model';
import { Currency } from '@app/currency/currency.model';
import { RxStateProperty, RxStateSelect } from '@app/shared/decorator/state.decorator';
import { firstNotNilPromise } from '@app/shared/observables';
import { unitOfTime } from 'moment';
import { FetchPolicy } from '@apollo/client';

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

  wotSearch(filter: WotSearchFilter, options: { offset?: number; limit?: number }): Observable<LoadResult<Account>> {
    console.info(`${this._logPrefix}Searching wot by filter...`, filter);

    options = {
      offset: 0,
      limit: 10,
      ...options,
    };

    let data$: Observable<Account[]>;
    if (isNotNilOrBlank(filter.address)) {
      data$ = this.indexerGraphqlService
        .wotSearchByAddress({
          address: filter.address,
          offset: options.offset,
          limit: options.limit + 1, // Add 1 item, to check if can fetch more
          orderBy: [AccountOrderByInput.IdAsc],
        })
        .pipe(map(({ data }) => IndexerFragmentConverter.toAccounts(data?.accounts)));
    } else if (isNotNilOrBlank(filter.searchText)) {
      data$ = this.indexerGraphqlService
        .wotSearchByText({
          searchText: filter.searchText,
          offset: options.offset,
          limit: options.limit + 1, // Add 1 item, to check if can fetch more
          orderBy: [AccountOrderByInput.IdentityNameAsc],
        })
        .pipe(map(({ data }) => IndexerFragmentConverter.toAccounts(data?.accounts)));
    } else {
      data$ = this.indexerGraphqlService
        .wotSearchLastWatch({
          offset: options.offset,
          limit: options.limit + 1, // Add 1 item, to check if can fetch more
          orderBy: [AccountOrderByInput.IdentityIndexDesc],
          pending: toBoolean(filter.pending, false),
        })
        .valueChanges.pipe(map(({ data }) => IndexerFragmentConverter.toAccounts(data?.accounts)));
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
    options: { limit?: number; sliceUnit?: unitOfTime.DurationConstructor }
  ): Observable<LoadResult<Transfer>> {
    console.info(`${this._logPrefix}Searching transfers...`, filter && JSON.stringify(filter));

    return this._transferSearch(filter, options).pipe(
      map((data: Transfer[]) => {
        const result: LoadResult<Transfer> = { data: data };
        // Can fetch more, on same timestamp
        if (data.length > options.limit) {
          data = data.slice(0, options.limit);
          const maxTimestamp = data[data.length - 1].timestamp;
          result.data = data;
          result.fetchMore = (limit) => {
            console.debug(`${this._logPrefix}Fetching more transfers before ${maxTimestamp}`);
            return firstValueFrom(
              this.transferSearch(
                { ...filter, maxTimestamp, minTimestamp: undefined },
                { ...options, limit: toNumber(limit, options.limit), sliceUnit: 'month' }
              )
            );
          };
        }
        return result;
      })
    );
  }

  private _transferSearch(
    filter: TransferSearchFilter,
    options: { limit?: number; sliceUnit?: unitOfTime.DurationConstructor; fetchPolicy?: FetchPolicy }
  ): Observable<Transfer[]> {
    options = {
      limit: 10,
      fetchPolicy: isNil(filter.maxTimestamp) ? 'no-cache' : undefined /*default*/,
      ...options,
    };
    filter = filter || {};
    const maxTimestamp = filter.maxTimestamp || DateUtils.moment();
    filter.minTimestamp = filter.minTimestamp || DateUtils.resetTime(maxTimestamp.clone().add(-1, options.sliceUnit || 'week'));

    const currencyStartTime = fromDateISOString(this.currency?.startTime);

    return this.indexerGraphqlService
      .transferSearchByAddress(
        {
          address: filter.address,
          limit: options.limit,
          where: {
            timestamp_gt: toDateISOString(filter.minTimestamp),
            timestamp_lte: toDateISOString(filter.maxTimestamp),
          },
          orderBy: [TransferOrderByInput.BlockNumberDesc],
        },
        {
          fetchPolicy: options.fetchPolicy,
        }
      )
      .pipe(
        map(({ data }) => firstArrayValue(data.accounts)),
        map((account) => {
          return (account && [...account.transfersIssued, ...account.transfersReceived]) || [];
        }),
        // Convert into Transfer objects
        map((inputs) => IndexerFragmentConverter.toTransfers(filter.address, inputs, true)),
        // Sort all items
        map((items) => items.sort(TransferComparators.sortByBlockDesc)),
        // Loop to fetch more
        mergeMap((items) => {
          if (items.length < options.limit) {
            const nextMaxTimestamp = filter.minTimestamp;
            const nextMinTimestamp = DateUtils.resetTime(nextMaxTimestamp.clone().add(-1, 'month'));

            // Loop, using an older slice
            if (currencyStartTime?.isSameOrBefore(nextMinTimestamp)) {
              console.debug(`${this._logPrefix}Fetching more transfers - timestamp > ${nextMinTimestamp.toISOString()}`);
              return this._transferSearch(
                {
                  ...filter,
                  minTimestamp: nextMinTimestamp,
                  maxTimestamp: nextMaxTimestamp,
                },
                { ...options, fetchPolicy: 'cache-first' }
              ).pipe(map((moreItems) => <Transfer[]>[...items, ...moreItems]));
            } else {
              console.debug(`${this._logPrefix}Read currency start: cannot fetch more`);
            }
          }
          return of(items);
        })
      );
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
        .pipe(map(({ data: { blocks } }) => IndexerFragmentConverter.toBlocks(blocks, true)));
    }

    return of(<Block[]>[]); // TODO
  }

  blockById(id: string): Observable<Block> {
    console.info(`${this._logPrefix}Loading block #${id}`);
    return this.indexerGraphqlService.blockById({ id }).pipe(map(({ data: { blockById } }) => IndexerFragmentConverter.toBlock(blockById)));
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
