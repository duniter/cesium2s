import { Inject, Injectable, Optional } from '@angular/core';
import { Peer, Peers } from '@app/shared/services/network/peer.model';
import { Promise } from '@rx-angular/cdk/zone-less/browser';
import { SettingsService } from '@app/settings/settings.service';
import { arrayRandomPick, firstArrayValue, isNotNilOrBlank, toBoolean } from '@app/shared/functions';
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
import { AccountOrderByInput, BlockOrderByInput, IndexerGraphqlService, TransferOrderByInput } from '@duniter/indexer';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IndexerFragmentConverter } from '@app/network/indexer/indexer.utils';
import { Transfer, TransferComparators, TransferSearchFilter } from '@app/transfer/transfer.model';
import { WotSearchFilter } from '@app/wot/wot.model';
import { Block, BlockSearchFilter } from '@app/block/block.model';

export interface IndexerState extends GraphqlServiceState {}

@Injectable({ providedIn: 'root' })
export class IndexerService extends GraphqlService<IndexerState> {
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

  wotSearch(filter: WotSearchFilter, options: { offset?: number; limit?: number }): Observable<Account[]> {
    console.info(`${this._logPrefix}Searching wot by filter...`, filter);

    options = {
      offset: 0,
      limit: 10,
      ...options,
    };

    if (isNotNilOrBlank(filter.address)) {
      return this.indexerGraphqlService
        .wotSearchByAddressWatch(
          {
            address: filter.address,
            offset: options.offset,
            limit: options.limit,
            orderBy: [AccountOrderByInput.IdAsc],
          },
          { fetchPolicy: this.defaultWatchFetchPolicy }
        )
        .valueChanges.pipe(map(({ data }) => IndexerFragmentConverter.toAccounts(data?.accounts)));
    } else if (isNotNilOrBlank(filter.searchText)) {
      return this.indexerGraphqlService
        .wotSearchByTextWatch(
          {
            searchText: filter.searchText,
            offset: options.offset,
            limit: options.limit,
            orderBy: [AccountOrderByInput.IdentityNameAsc],
          },
          { fetchPolicy: this.watchFetchPolicy }
        )
        .valueChanges.pipe(map(({ data }) => IndexerFragmentConverter.toAccounts(data?.accounts)));
    } else {
      return this.indexerGraphqlService
        .wotSearchLastWatch({
          limit: options.limit,
          offset: options.offset,
          orderBy: [AccountOrderByInput.IdentityIndexDesc],
          pending: toBoolean(filter.pending, false),
        })
        .valueChanges.pipe(map(({ data }) => IndexerFragmentConverter.toAccounts(data?.accounts)));
    }
  }

  transferSearch(
    filter: TransferSearchFilter,
    options: { offset?: number; limit?: number; orderBy?: TransferOrderByInput[] }
  ): Observable<Transfer[]> {
    console.info(`${this._logPrefix}Searching transfers...`, filter);

    options = {
      limit: 10,
      offset: 0,
      orderBy: [TransferOrderByInput.BlockNumberDesc],
      ...options,
    };

    return this.indexerGraphqlService
      .transferSearchByAddressWatch(
        {
          address: filter.address,
          //blockNumberLt: filter.blockNumberLt,
          limit: options.limit,
          offset: options.offset,
          orderBy: options.orderBy,
        },
        { fetchPolicy: this.defaultWatchFetchPolicy }
      )
      .valueChanges.pipe(
        map(({ data }) => data.accounts?.[0]),
        map((account) => {
          return (
            (account && [
              ...account.transfersIssued,
              //, ...account.transfersReceived
            ]) ||
            []
          );
        }),
        map((inputs) => IndexerFragmentConverter.toTransfers(filter.address, inputs, true)),
        map((items) => items.sort(TransferComparators.sortByBlockDesc)),
        map((items) => items.slice(0, options.limit))
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
    const settings = await this.settings.ready();

    let peer = Peers.fromUri(settings.indexer);
    if (!peer) {
      const peers = await this.filterAlivePeers(settings.preferredIndexers);
      if (!peers.length) {
        throw { message: 'ERROR.CHECK_NETWORK_CONNECTION' };
      }
      peer = arrayRandomPick(peers);
    }

    const client = await super.createClient(peer, 'indexer');
    this.apollo.client = client;

    return {
      peer,
      client,
      offline: false,
    };
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
