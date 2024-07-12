import { Injectable } from '@angular/core';
import { StartableService } from '@app/shared/services/startable-service.class';
import { IndexerService } from '@app/network/indexer/indexer.service';
import { PodService } from '@app/network/pod/pod.service';
import { WotSearchFilter } from '@app/wot/wot.model';
import { FetchPolicy } from '@apollo/client';
import { Promise } from '@rx-angular/cdk/zone-less/browser';
import { combineLatestAll, concat, firstValueFrom, mergeMap, Observable, toArray } from 'rxjs';
import { LoadResult } from '@app/shared/services/service.model';
import { Account, AccountUtils } from '@app/account/account.model';
import { map } from 'rxjs/operators';
import { isNotEmptyArray, isNotNil } from '@app/shared/functions';

@Injectable({ providedIn: 'root' })
export class WotService extends StartableService {
  constructor(
    private indexer: IndexerService,
    private pod: PodService
  ) {
    super();
  }

  protected async ngOnStart(): Promise<void> {
    await Promise.all([this.indexer.ready(), this.pod.ready()]);
  }

  wotSearch(filter: WotSearchFilter, options: { after?: string; first?: number; fetchPolicy?: FetchPolicy }): Observable<LoadResult<Account>> {
    const search1$ = this.indexer.wotSearch(filter, options).pipe(toArray());
    const search2$ = this.pod.profileSearch(filter, options).pipe(toArray());

    return concat(search1$, search2$).pipe(
      combineLatestAll(),
      map(AccountUtils.combineAccountLoadResults),
      mergeMap((res) => this.decorateWithProfiles(res))
    );
  }

  async decorateWithProfiles(result: LoadResult<Account>): Promise<LoadResult<Account>> {
    // Get addresses without profiles
    const noProfilesAddresses = (result?.data || [])
      .filter((account) => !account.meta?.name)
      .map((account) => account.address)
      .filter(isNotNil);

    // Load profiles from addresses
    if (isNotEmptyArray(noProfilesAddresses)) {
      console.debug(`${this._logPrefix}Loading profiles from ${noProfilesAddresses.length} account's addresses...`);
      const profiles = (await firstValueFrom(this.pod.profileSearch({ addresses: noProfilesAddresses }, { withTotal: false })))?.data;
      if (isNotEmptyArray(profiles)) {
        AccountUtils.mergeAll(result.data.concat(profiles));
      }
    }

    // Decorate fetchMore
    if (result.fetchMore) {
      const inheritedFetchMore = result.fetchMore;
      result.fetchMore = async (first) => {
        const moreResult = await inheritedFetchMore(first);
        return this.decorateWithProfiles(moreResult);
      };
    }

    return result;
  }
}
