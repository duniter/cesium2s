import { Inject, Injectable, Optional } from '@angular/core';
import { Peer, Peers } from '@app/shared/services/network/peer.model';
import { Promise } from '@rx-angular/cdk/zone-less/browser';
import { SettingsService } from '@app/settings/settings.service';
import { arrayRandomPick, isNotNil, isNotNilOrBlank, toBoolean } from '@app/shared/functions';
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
import { AccountOrderByInput, IndexerGraphqlService, LightAccountFragment, TransferFragment, TransferOrderByInput } from '@duniter/indexer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  wotSearch(
    filter: { address?: string; searchText?: string; last?: boolean; isMember?: boolean },
    options: { offset?: number; limit?: number }
  ): Observable<Account[]> {
    console.info(`${this._logPrefix}Searching...`, filter);

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
        .valueChanges.pipe(map(({ data }) => this.toAccounts(data?.accounts)));
    } else if (isNotNilOrBlank(filter.searchText)) {
      return this.indexerGraphqlService
        .wotSearchByTextWatch(
          {
            searchText: filter.searchText,
            offset: options.offset,
            limit: options.limit,
            orderBy: [AccountOrderByInput.IdentityNameAsc],
          },
          { fetchPolicy: this.defaultWatchFetchPolicy }
        )
        .valueChanges.pipe(map(({ data }) => this.toAccounts(data?.accounts)));
    } else {
      return this.indexerGraphqlService
        .wotSearchLastWatch(
          {
            limit: options.limit,
            offset: options.offset,
            orderBy: [AccountOrderByInput.IdentityIndexDesc],
            pending: !toBoolean(filter.isMember, true),
          },
          { fetchPolicy: this.defaultWatchFetchPolicy }
        )
        .valueChanges.pipe(map(({ data }) => this.toAccounts(data?.accounts)));
    }
  }

  txHistory(address: string, options: { offset?: number; limit?: number; orderBy?: TransferOrderByInput[] }): Observable<TransferFragment[]> {
    console.info(`${this._logPrefix}Loading TX history of ${address}`);

    options = {
      limit: 10,
      offset: 0,
      orderBy: [TransferOrderByInput.BlockNumberDesc],
      ...options,
    };

    return this.indexerGraphqlService
      .txHistoryByAddressWatch(
        {
          address: address,
          limit: options.limit,
          offset: options.offset,
          orderBy: options.orderBy,
        },
        { fetchPolicy: this.defaultWatchFetchPolicy }
      )
      .valueChanges.pipe(
        map(({ data }) => data.accounts?.[0]),
        map((account) => {
          return [...account.transfersIssued, ...account.transfersReceived];
        })
      );
  }

  protected toAccounts(inputs: LightAccountFragment[]): Account[] {
    const results = (inputs || []).map(this.toAccount);
    //if (this._debug)
    console.debug(this._logPrefix + 'Results:', results);
    return results;
  }

  protected toAccount(input: LightAccountFragment): Account {
    return <Account>{
      address: input.id,
      meta: {
        uid: input.identity?.name,
        isMember: isNotNil(input.identity?.membership?.id),
      },
    };
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
