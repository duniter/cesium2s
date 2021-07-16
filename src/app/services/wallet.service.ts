import {Injectable} from "@angular/core";
import {Platform} from "@ionic/angular";
import {AppBaseService} from "./base.service";
import {web3Accounts, web3Enable, web3FromAddress, web3FromSource} from "@polkadot/extension-dapp";
import {environment} from "../../environments/environment";
import {NodeService} from "./node.service";
import {ApiPromise} from "@polkadot/api";
import {InjectedAccountWithMeta} from "@polkadot/extension-inject/types";

@Injectable({providedIn: 'root'})
export class WalletService extends AppBaseService {

  accounts: InjectedAccountWithMeta[];

  get api(): ApiPromise {
    return this.node.api;
  }

  constructor(
    platform: Platform,
    protected node: NodeService
  ) {
    super(platform, {
      name: 'wallet-service'
    })
  }

  protected async doStart(): Promise<any> {

    await this.node.ready();

    // returns an array of all the injected sources
    // (this needs to be called first, before other requests)
    const extensions = await web3Enable(environment.name);
    if (extensions.length === 0) {
      // no extension installed, or the user did not accept the authorization
      // in this case we should inform the use and give a link to the extension
      console.debug('No web3 extension found');
    }

    // returns an array of { address, meta: { name, source } }
    // meta.source contains the name of the extension that provides this account
    this.accounts = await web3Accounts();


    if (this.accounts?.length === 0) {
      this.accounts = [{
        address: '5ESoncgJ42j8WAyh9SBk2ztMZhUzejEZxF93LnZVBCXR77Kg',
        meta: {
          name: 'Alice',
          source: '0xc74be00087825d9f8ba924d38fde43a8e8953c40c8f6a269b8a4ca337fbef7b7'
        }
      }]
    }
  }

  async transfer() {

    // the address we use to use for signing, as injected
    const SENDER = this.accounts[0].address;

    // finds an injector for an address
    //const injector = await web3FromAddress(SENDER);
    const injector = await web3FromSource(this.accounts[0].meta.source);

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
    });
  }
}
