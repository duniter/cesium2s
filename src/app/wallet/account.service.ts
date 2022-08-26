import {Injectable} from "@angular/core";
import {NetworkService} from "../network/network.service";
import {ApiPromise} from "@polkadot/api";
import {Account, AccountMeta} from "./account.model";
import {StartableService} from "@app/shared/services/startable-service.class";
import {AuthData} from "@app/auth/auth.model";
import {keyring} from "@polkadot/ui-keyring";
import {environment} from "@environments/environment";
import {StorageService} from "@app/shared/services/storage.service";
import {KeyringStorage} from "@app/shared/services/keyring-storage";
import {RegisterData} from "@app/register/register.model";
import { mnemonicGenerate } from '@polkadot/util-crypto';
import {ScryptOptions} from "crypto";
import {FrameSystemAccountInfo} from "@polkadot/types/lookup";
const scrypt = require('scrypt-async');

@Injectable({providedIn: 'root'})
export class AccountService extends StartableService {

  private _accounts: Account[] = null;
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

    // Not need, because network already wait crypto
    //await cryptoWaitReady();

    const ss58Format = environment.keyring.ss58Format || 42; // 42 = dev format

    // Set the default SS58 format
    keyring.setSS58Format(ss58Format);


    // load all available addresses and accounts
    const now = Date.now();
    console.info('Loading accounts...');
    keyring.loadAll({
      store: this._store,
      ss58Format,
      type: 'sr25519',
      isDevelopment: !environment.production
    });

    await this.addDevAccounts();

    const accounts = keyring.getAccounts();
    if (accounts?.length) {
      console.info(`Loading accounts [OK] ${accounts.length} accounts loaded in ${Date.now() - now}ms`);
      this._accounts = accounts.map(a => {
        return {
          address: a.address,
          type: 'sr25519',
          meta: {
            name: a.meta.name,
            genesisHash: a.meta.genesisHash
          }
        }
      });

      await Promise.all(this._accounts.map(a => this.loadData(a)));

      // Dump
      this._accounts.forEach(a => {
        console.debug(` - ${a.address} (${a.meta?.name}) - free=${a.data.free} - reserved=${a.data.reserved}`);
      });
    }
  }

  async login(auth: AuthData): Promise<Account> {
    if (!auth) return;

    await this.ready();

    if (auth.v1) {
      return this.migrationV1({...auth.v1, meta: auth.meta});
    }

    // TODO
    return this._accounts[0];
  }

  async generateNew() {
    if (!this.started) await this.ready();

    // generate a random mnemonic, 12 words in length
    const mnemonic = mnemonicGenerate(12);

    return mnemonic;
  }

  async register(data: RegisterData): Promise<boolean> {

    // add the account, encrypt the stored JSON with an account-specific password
    const { pair, json } = keyring.addUri(data.mnemonic, data.password, {
      name: data.meta?.name || 'default',
      genesisHash: this.network.currency?.genesys
    }, 'sr25519');

    //this.debug('check pair', pair, json);

    await this.addAccount({
      address: json.address,
      meta: {
        name: data.meta?.name
      }
    })

    return true;
  }

  async addDevAccounts() {

    if (environment.production) return;

    // (Advanced, development-only) add with an implied dev seed and hard derivation
    // Add fake account
    keyring.addUri('//Alice', null, { name: 'Alice default' });
    keyring.addUri('//Bob', null, { name: 'Bob default' });

  }

  async addAccount(account: Account): Promise<Account> {
    const existingAccount = this._accounts.find(a => a.address === account.address);
    if (existingAccount) {
      console.warn(`Account with address '${account.address}' already added. Skip`);
      return existingAccount;
    }

    console.info(`Add account with address '${account.address}'`);
    this._accounts.push(account);

    await this.loadData(account);

    return account;
  }

  async getAll(): Promise<Account[]> {
    if (!this.started) await this.ready();

    return this._accounts;
  }

  async getDefault(opts?: { withTx?: boolean }): Promise<Account> {
    if (!this.started) await this.ready();

    const account = this._accounts[0];
    if (!account) throw {message: 'ERROR.UNKNOWN_WALLET_ID'};

    // Load
    return await this.loadData(account);
  }

  async getById(name: string, opts?: { withTx?: boolean }): Promise<Account> {
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

  private async loadData(account: Account, opts?: {reload?: boolean}): Promise<Account> {
    if (!!account.data && opts?.reload !== true) return account; // Already loaded: skip

    const {data} = await this.api.query.system.account(account.address);

    account.data = JSON.parse(data.toString());
    this.debug(`Loaded ${account.address} data:`, account.data);


    return account;
  }

  async migrationV1(data: {salt: string, password: string; meta?: AccountMeta}): Promise<Account> {
    if (!data?.salt || !data?.password) return;

    this.log('Authenticating using salt+pwd...');

    const rawSeedString = await this.scrypt(data.password, data.salt, 32, {
      N: 4096,
      r: 16,
      p: 1,
      encoding: 'hex'
    });

    console.info(rawSeedString);

    const meta = {
      name: data.meta?.name || 'NEW',
      genesisHash: this.network.currency?.genesys
    }

    const {pair, json} = await keyring.addUri(`0x${rawSeedString}`, data.password, meta, 'ed25519');

    const account = this.addAccount({
      address: json.address,
      type: pair.type,
      meta
    });

    return account;
  }

  protected scrypt(password: string, salt: string, keylen: number, opts: ScryptOptions & {dkLen?: number; encoding?: 'hex'|'base64'|'binary'}): Promise<any> {
    return new Promise((resolve, reject) => {

      scrypt(password, salt, opts, (result) => resolve(result));
    })
  }
}
