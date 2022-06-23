import {Injectable} from "@angular/core";
import {AppBaseService} from "./base.service";
import {PeerService} from "./peer.service";
import {ApiPromise} from "@polkadot/api";
import {AccountWithMeta} from "../model/account.model";
import {PlatformService} from "./platform.service";

@Injectable({providedIn: 'root'})
export class AccountService extends AppBaseService {

  accounts: AccountWithMeta[] = null;

  get api(): ApiPromise {
    return this.node.api;
  }

  constructor(
    protected platform: PlatformService,
    protected node: PeerService
  ) {
    super(platform, {
      name: 'wallet-service'
    })
  }

  protected async doStart(): Promise<any> {

    // Wait node service
    await this.node.ready();

    await this.loadAccounts();

  }

  async loadAccounts() {

    // Restore locally
    this.accounts = [
      {
        address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        meta: {
          name: 'Test',
          source: '' //TODO
        }
      },
      {
        address: '5ESoncgJ42j8WAyh9SBk2ztMZhUzejEZxF93LnZVBCXR77Kg',
        meta: {
          name: 'Alice',
          source: '0xc74be00087825d9f8ba924d38fde43a8e8953c40c8f6a269b8a4ca337fbef7b7'
        }
      }
    ]

    await Promise.all(this.accounts.map((account) => {
      return Promise.all([
        this.api.query.timestamp.now(),
        this.api.query.system.account(account.address)
      ])
        .then(([now, { nonce, data: balance }]) => {
          this.info(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);
        })
    }));
  }

  async transfer() {

    // the address we use to use for signing, as injected
    const SENDER = this.accounts[0].address;

    // finds an injector for an address
    //const injector = await web3FromAddress(SENDER);
    /*const injector = await web3FromSource(this.accounts[0].meta.source);

    // sign and send our transaction - notice here that the address of the account
    // (as retrieved injected) is passed through as the param to the `signAndSend`,
    // the API then calls the extension to present to the user and get it signed.
    // Once complete, the api sends the tx + signature via the normal process
    this.api.tx.balances
      .transfer('5C5555yEXUcmEJ5kkcCMvdZjUo7NGJiQJMS7vZXEeoMhj3VQ', 12)
      .signAndSend(SENDER, { signer: injector.signer }, (status) => {
        if (status.isInBlock) {
          console.log(`Completed at block hash #${status}`);
        } else {
          console.log(`Current status: ${status}`);
        }
      }).catch((error: any) => {
      console.log(':( transaction failed', error);
    });*/
  }
}
