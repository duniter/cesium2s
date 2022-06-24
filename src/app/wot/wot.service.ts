import {Injectable} from "@angular/core";
import {NetworkService} from "../network/network.service";
import {ApiPromise} from "@polkadot/api";
import {Account, AccountData, UiAccount, AccountWithMeta} from "../wallet/account.model";
import {StartableService} from "@app/shared/services/startable-service.class";
import {WotSearchFilter} from "@app/wot/wot.model";
import {AccountService} from "@app/wallet/account.service";
import {sleep} from "@app/shared/functions";
import {accounts} from "@polkadot/ui-keyring/observable/accounts";
import {map} from "rxjs";

@Injectable({providedIn: 'root'})
export class WotService extends StartableService<void> {

  get api(): ApiPromise {
    return this.network.api;
  }

  constructor(
    protected network: NetworkService,
    protected accountService: AccountService
  ) {
    super(network, {
      name: 'wot-service'
    });
  }

  protected async ngOnStart(): Promise<void> {
    // Noting to do
  }

  async search(filter?: WotSearchFilter): Promise<UiAccount[]> {
    if (!this.started) await this.ready();

    console.info(this._logPrefix + 'Searching...', filter);

    // TODO
    await sleep(500);
    const avatars = ['a', 'b', 'c', 'd'].map(letter => 'https://i.pravatar.cc/300?u=' + letter)

    return (await this.accountService.getAll())
      .map((account, i) => {
        return <UiAccount>{
          address: account.address,
          meta: {
            name: account.meta?.name,
            avatar: avatars[i]
          }
        }
      });
  }

}
