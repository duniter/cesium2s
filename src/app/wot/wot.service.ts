import { Injectable } from '@angular/core';
import { NetworkService } from '../network/network.service';
import { ApiPromise } from '@polkadot/api';
import { WotSearchFilter } from '@app/wot/wot.model';
import { AccountsService } from '@app/account/accounts.service';
import { Account } from '@app/account/account.model';
import { RxStartableService } from '@app/shared/services/rx-startable-service.class';
import { Observable } from 'rxjs';

export interface WotState {}

@Injectable({ providedIn: 'root' })
export class WotService extends RxStartableService<WotState> {
  get api(): ApiPromise {
    return this.network.api;
  }

  constructor(
    protected network: NetworkService,
    protected accountService: AccountsService
  ) {
    super(network, {
      name: 'wot-service',
    });
  }

  protected async ngOnStart(): Promise<WotState> {
    return {};
  }

  search(filter?: WotSearchFilter, options?: { limit?: number; offset?: number }): Observable<Account[]> {
    console.info(this._logPrefix + 'Searching...', filter);

    return this.network.indexer.wotSearch(
      {
        ...filter,
      },
      { limit: 10, offset: 0, ...options }
    );
    //
    // const avatars = ['a', 'b', 'c', 'd'].map((letter) => 'https://i.pravatar.cc/300?u=' + letter);
    //
    // return this.accountService.watchAll().pipe(
    //   map((accounts, i) =>
    //     accounts.map(
    //       (account) =>
    //         <Account>{
    //           address: account.address,
    //           meta: {
    //             name: account.meta?.name,
    //             avatar: avatars[i],
    //           },
    //         }
    //     )
    //   )
    // );
  }
}
