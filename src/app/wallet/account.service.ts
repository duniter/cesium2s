import {Injectable} from "@angular/core";
import {NetworkService} from "../network/network.service";
import {ApiPromise} from "@polkadot/api";
import {Account, AccountWithMeta, UiAccount} from "./account.model";
import {StartableService} from "@app/shared/services/startable-service.class";
import {AuthData} from "@app/auth/auth.model";
import {keyring} from "@polkadot/ui-keyring";
import {environment} from "@environments/environment";
import {StorageService} from "@app/services/storage.service";
import {KeyringStorage} from "@app/shared/services/keyring-storage";
import {RegisterData} from "@app/register/register.model";

@Injectable({providedIn: 'root'})
export class AccountService extends StartableService {

  private _accounts: AccountWithMeta[] = null;
  private _store = new KeyringStorage(this.storage);

  get api(): ApiPromise {
    return this.network.api;
  }


  constructor(
    protected network: NetworkService,
    protected storage: StorageService
  ) {
    super(network, {
      name: 'wallet-service'
    });
  }

  protected async ngOnStart(): Promise<any> {
    await this.loadAccounts();

    // Not need, because network already wait crypto
    //await cryptoWaitReady();

    // load all available addresses and accounts
    keyring.loadAll({
      store: this._store,
      ss58Format: environment.keyring?.ss58Format || 42 /* dev format */,
      type: 'sr25519',
      isDevelopment: !environment.production
    });

    // (Advanced, development-only) add with an implied dev seed and hard derivation
    // const alice = keyring.addFromUri('//Alice', { name: 'Alice default' });
    // this.log('TODO', alice);
  }

  async login(auth: AuthData): Promise<Account> {

    // TODO
    return this._accounts[0];
  }

  async register(auth: RegisterData): Promise<boolean> {
    return true;
  }

  async loadAccounts() {

    // Restore locally
    this._accounts = [
      {
        address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        meta: {
          name: 'Alice',
          source: '' //TODO
        }
      },
      {
        address: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
        meta : {
          name: 'Bob',
          source: ''
        }
      },
      {
        address: '5DBeNAHnbgsiFSJuaa45PEcocKuGiyJ7ZhbFF8mtEAiU8Xvg',
        meta: {
          name: 'Ben',
          source: '0xb816f7d2264fd113aca484c90b97acdf848b705db5c756afe7d1d99bc4c434da'
        }
      }
    ]

    const now = await this.api.query.timestamp.now();
    await Promise.all(this._accounts
      .map(account => this.loadData(account))
    );


  }

  async getAll(): Promise<AccountWithMeta[]> {
    if (!this.started) await this.ready();

    return this._accounts.map(account => ({...account, meta: {
        name: account.meta.name,
        source: null // Protected
      }}));
  }

  async getDefault(opts?: { withTx?: boolean }): Promise<UiAccount> {
    if (!this.started) await this.ready();

    const account = this._accounts[0];
    if (!account) throw {message: 'ERROR.UNKNOWN_WALLET_ID'};

    // Load
    return await this.loadData(account);
  }

  async getById(name: string, opts?: { withTx?: boolean }): Promise<UiAccount> {
    if (!this.started) await this.ready();

    const account = this._accounts.find(a => a.meta?.name === name);
    if (!account) throw {message: 'ERROR.UNKNOWN_WALLET_ID'};

    // Load
    return await this.loadData(account);
  }

  async transfer(from?: Account, to?: Account) {

    // the address we use to use for signing, as injected
    const SENDER = this._accounts[0].address;

    // Sign and send a transfer from Alice to Bob
    // const txHash = await this.api.tx.balances
    //   .transfer(BOB, 12345)
    //   .signAndSend(alice);

    // Show the hash
    //console.info(`Submitted with hash ${txHash}`);

    // finds an injector for an address
    //const injector = await web3FromSource(this.accounts[0].meta.source);
    //const injector = await web3FromAddress(SENDER);
    /*

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

  private async loadData(account: AccountWithMeta): Promise<UiAccount> {
    const data = await this.api.query.system.account(account.address);

    this.debug("Account response:", data);

    //console.info(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);

    return {
      address: account.address,
      free: 0,
      meta: {
        ...account.meta
      }
    };
  }


}
