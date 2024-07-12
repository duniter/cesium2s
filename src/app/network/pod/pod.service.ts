import { Inject, Injectable, Optional } from '@angular/core';
import { Peers } from '@app/shared/services/network/peer.model';
import { Promise } from '@rx-angular/cdk/zone-less/browser';
import { SettingsService } from '@app/settings/settings.service';
import { arrayRandomPick, isNil, isNotEmptyArray, isNotNil, isNotNilOrBlank, toNumber } from '@app/shared/functions';
import { TypePolicies } from '@apollo/client/core';
import {
  APP_GRAPHQL_FRAGMENTS,
  APP_GRAPHQL_TYPE_POLICIES,
  GraphqlService,
  GraphqlServiceState,
} from '@app/shared/services/network/graphql/graphql.service';
import { DocumentNode } from 'graphql/index';
import { StorageService } from '@app/shared/services/storage/storage.service';
import { firstValueFrom, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Currency } from '@app/currency/currency.model';
import { RxStateProperty, RxStateSelect } from '@app/shared/decorator/state.decorator';
import { firstNotNilPromise } from '@app/shared/observables';
import { Order_By, PodGraphqlService, ProfileFragment } from './pod-types.generated';
import { WotSearchFilter } from '@app/wot/wot.model';
import { LoadResult } from '@app/shared/services/service.model';
import { Account } from '@app/account/account.model';
import { FetchPolicy } from '@apollo/client';
import { AccountConverter } from '@app/account/account.converter';
import { IpfsService } from '@app/network/ipfs/ipfs.service';

export interface PodState extends GraphqlServiceState {
  currency: Currency;
}

@Injectable({ providedIn: 'root' })
export class PodService extends GraphqlService<PodState> {
  @RxStateSelect() currency$: Observable<Currency>;
  @RxStateProperty() currency: Currency;

  @RxStateSelect() minBlockHeight$: Observable<number>;
  @RxStateProperty() minBlockHeight: number;

  constructor(
    storage: StorageService,
    private settings: SettingsService,
    private graphqlService: PodGraphqlService,
    private ipfsService: IpfsService,
    @Optional() @Inject(APP_GRAPHQL_TYPE_POLICIES) typePolicies: TypePolicies,
    @Optional() @Inject(APP_GRAPHQL_FRAGMENTS) fragments: DocumentNode[]
  ) {
    super(storage, typePolicies, fragments, {
      name: 'pod-service',
      startByReadyFunction: false, // Need an explicit call to start()
    });
  }

  profileSearch(
    filter: WotSearchFilter,
    options: { after?: string; first?: number; fetchPolicy?: FetchPolicy; total?: number; withTotal?: boolean }
  ): Observable<LoadResult<Account>> {
    console.info(`${this._logPrefix}Searching profile by filter...`, filter);

    const offset = toNumber(+options?.after, 0);
    const limit = toNumber(+options?.first, this.fetchSize);
    const withTotal = offset === 0 && options?.withTotal !== false;
    let data$: Observable<LoadResult<ProfileFragment>>;

    // Load by unique address
    if (isNotNilOrBlank(filter.address)) {
      data$ = this.graphqlService
        .profileByAddress(
          {
            address: filter.address,
          },
          options
        )
        .pipe(
          map(({ data }) => {
            return {
              data: [data.profiles_by_pk as ProfileFragment],
              total: isNil(data.profiles_by_pk) ? 0 : 1,
            };
          })
        );
    }

    // Load by adresses
    else if (isNotEmptyArray(filter.addresses)) {
      data$ = this.graphqlService
        .profileSearchByAddresses(
          {
            addresses: filter.addresses,
          },
          options
        )
        .pipe(
          map(({ data }) => {
            return {
              data: data.profiles as ProfileFragment[],
            };
          })
        );
    } else if (isNotNilOrBlank(filter.searchText)) {
      data$ = this.graphqlService
        .profileSearchByText({
          offset,
          limit,
          searchText: `%${filter.searchText}%`,
          orderBy: [{ time: Order_By.Asc }, { title: Order_By.Asc }],
          withTotal,
        })
        .pipe(
          map(({ data }) => {
            return {
              data: data.profiles as ProfileFragment[],
              total: data.profiles_aggregate?.aggregate.count,
            };
          })
        );
    } else {
      return of(<LoadResult<Account>>{});
    }

    return data$.pipe(
      map((res) => {
        const data = AccountConverter.profileToAccounts(res.data, { ipfsGateway: this.ipfsService.gatewayBaseUrl });
        const total = toNumber(res?.total, options?.total);
        const result: LoadResult<Account> = { data, total };
        const nextOffset = offset + limit;
        if (isNotNil(total) && nextOffset < total) {
          result.fetchMore = (first) => {
            console.debug(`${this._logPrefix}Fetching more profiles - offset: ${nextOffset}`);
            return firstValueFrom(
              this.profileSearch(filter, { ...options, after: nextOffset.toString(), first: toNumber(first, options.first), total })
            );
          };
        }
        return result;
      })
    );
  }

  protected async ngOnStart(): Promise<PodState> {
    if (!this.ipfsService.started) this.ipfsService.start();

    // Wait settings and ipfs service
    const [settings, currency] = await Promise.all([this.settings.ready(), firstNotNilPromise(this.currency$)]);

    let peer = Peers.fromUri(settings.pod);
    if (!peer) {
      const peers = await this.filterAlivePeers(settings.preferredPods);
      if (!peers.length) {
        throw { message: 'ERROR.CHECK_NETWORK_CONNECTION' };
      }
      peer = arrayRandomPick(peers);
    }

    const client = await super.createClient(peer, 'pod');

    return {
      peer,
      client,
      currency,
      offline: false,
      fetchSize: this.defaultFetchSize,
    };
  }
}
