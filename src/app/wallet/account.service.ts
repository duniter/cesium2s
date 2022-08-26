import {Injectable} from "@angular/core";
import {NetworkService} from "../network/network.service";
import {ApiPromise, Keyring} from "@polkadot/api";
import {Account, AccountMeta, AccountUtils} from "./account.model";
import {StartableService} from "@app/shared/services/startable-service.class";
import {AuthData} from "@app/auth/auth.model";
import {keyring} from "@polkadot/ui-keyring";
import {environment} from "@environments/environment";
import {StorageService} from "@app/shared/services/storage/storage.service";
import {KeyringStorage} from "@app/shared/services/keyring-storage";
import {RegisterData} from "@app/register/register.model";
import {cryptoWaitReady, mnemonicGenerate} from '@polkadot/util-crypto';
import {isNilOrNaN, isNotEmptyArray} from "@app/shared/functions";
import {Inject} from "@angular/core";
import {IStorage, APP_STORAGE} from "@app/shared/services/storage/storage.interface";
import {BehaviorSubject, from, map, Observable, switchMap} from "rxjs";

const scrypt = require('scrypt-async');

@Injectable({providedIn: 'root'})
export class AccountService extends StartableService {

  private _$accounts = new BehaviorSubject<Account[]>([]);
  private _store = new KeyringStorage(this.storage);

  get api(): ApiPromise {
    return this.network.api;
  }

  constructor(
    protected network: NetworkService,
    @Inject(APP_STORAGE) protected storage: IStorage
  ) {
    super(network, {
      name: 'wallet-service'
    });
  }

  protected async ngOnStart(): Promise<any> {

    // Wait crypto to be loaded by browser
    await cryptoWaitReady();

    keyring.setDevMode(!environment.production);

    // Set the default SS58 format
    const ss58Format = this.network.currency?.ss58Format || 42; // 42 = dev format
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

    const keyringAddresses = keyring.getAccounts();
    if (isNotEmptyArray(keyringAddresses)) {
      const accounts = keyringAddresses.map(ka => {
        return <Account>{
          address: ka.address,
          type: 'sr25519',
          meta: {
            name: ka.meta.name,
            genesisHash: ka.meta.genesisHash
          }
        }
      });

      // Load account's data
      await Promise.all(accounts.map(a => this.loadData(a)));

      // Log
      console.info(`Loading accounts [OK] ${accounts.length} accounts loaded in ${Date.now() - now}ms`);
      accounts.forEach(a => {
        console.info(` - ${a.address} (${a.meta?.name}) - free=${a.data.free} - reserved=${a.data.reserved}`);
      });

      this._$accounts.next(accounts);
    }

    // Auto login
    if (!environment.production && environment.dev?.auth) {
      setTimeout(() => this.login(environment.dev.auth));
    }
  }

  async login(auth: AuthData): Promise<Account> {
    if (!auth) return;

    await this.ready();

    if (auth.v1) {
      return this.loginV1({...auth.v1});
    }

    // TODO
    //return this._accounts[0];
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

    keyring.saveAccount(pair, data.password);

    //this.debug('check pair', pair, json);

    await this.addAccount({
      address: json.address,
      meta: {
        name: data.meta?.name
      }
    })

    return true;
  }

  async addAccount(account: Account): Promise<Account> {
    let accounts = this._$accounts.value || [];
    const existingAccount = accounts.find(a => a.address === account.address);
    if (existingAccount) {
      console.warn(`Account with address '${account.address}' already added. Skip`);
      account = existingAccount;
    }
    else {
      console.info(`Add account with address '${account.address}'`);

      // Define as default
      if (account.default || accounts.length === 1) await this.setDefaultAccount(account, accounts);

      accounts = [...accounts, account];
    }

    await this.loadData(account);

    this._$accounts.next(accounts)

    return account;
  }

  setDefaultAccount(account: Account, accounts?: Account[]) : AccountService {
    account.default = true;
    // Set other as NOT default
    accounts = accounts || this._$accounts.value || [];
    accounts.filter(a => a.address !== account.address && a.default)
      .forEach(a => {
        a.default = false;
      });
    return this;
  }

  watchAll(opts?: {positiveBalanceFirst?: boolean}): Observable<Account[]> {

    let accounts$: Observable<Account[]>;
    if (!this.started) {
      accounts$ = from(this.ready())
        .pipe(
          switchMap(() => this._$accounts)
        );
    }
    else {
      accounts$ = this._$accounts;
    }

    return accounts$.pipe(
      map(accounts => {

        // Sort with a balance first
        if (opts?.positiveBalanceFirst) {
          accounts.sort((a1, a2) => {
            const b1 = AccountUtils.getBalance(a1);
            const b2 = AccountUtils.getBalance(a2);
            return b1 === b2 ? 0 : (b1 < b2 ? 0 : -1);
          })
        }
        return accounts;
      }));
  }

  async getAll(): Promise<Account[]> {
    if (!this.started) await this.ready();

    return this._$accounts.value || [];
  }

  async isAvailable(address: string): Promise<boolean> {
    if (!this.started) await this.ready();
    return this._$accounts.value.some(a => a.address === address);

    // FIXME: why is is always return false ??
    // && keyring.isAvailable(address);
  }

  async getDefault(opts?: { withTx?: boolean; reload?: boolean }): Promise<Account> {
    if (!this.started) await this.ready();

    const accounts = this._$accounts.value || [];
    let account = accounts.find(a => a.default);
    if (!account) {
      if (accounts.length) {
        account = accounts[0];
        this.setDefaultAccount(account);
      }
      else {
        throw {message: 'ERROR.UNKNOWN_WALLET_ID'};
      }
    }

    // Load data
    return await this.loadData(account, opts);
  }

  async getByName(name: string, opts?: { withTx?: boolean; reload?: boolean }): Promise<Account> {
    if (!this.started) await this.ready();

    const accounts = this._$accounts.value || [];
    const account = accounts.find(a => a.meta?.name === name);
    if (!account) throw {message: 'ERROR.UNKNOWN_WALLET_ID'};

    // Load
    return await this.loadData(account, opts);
  }

  async getByAddress(address: string, opts?: { withTx?: boolean; reload?: boolean }): Promise<Account> {
    if (!this.started) await this.ready();

    const accounts = this._$accounts.value || [];
    const account = accounts.find(a => a.address === address);
    if (!account) throw {message: 'ERROR.UNKNOWN_WALLET_ID'};

    // Load data
    return await this.loadData(account, opts);
  }

  async transfer(from: Partial<Account>, to: Partial<Account>, amount: number) : Promise<string> {
    if (!from || !to) throw new Error('Missing argument \'from\' or \'to\' !');
    if (isNilOrNaN(amount)) {
      throw new Error('ERROR.AMOUNT_REQUIRED');
    }
    if (amount < 0) {
      throw new Error('ERROR.AMOUNT_NEGATIVE');
    }
    // Same issuer/recipient
    if (from.address === to.address) {
      throw new Error('ERROR.SAME_TX_RECIPIENT');
    }
    // the address we use to use for signing, as injected
    //const issuer = from.address ? await this.getByAddress(from.address) : await this.getByAddress(from.meta?.name);

    console.info(`[account-service] Sending ${amount} :\nfrom: ${from.address}\nto ${to.address}`)

    const issuerAccount = await this.getByAddress(from.address);
    const issuerPair = keyring.getPair(issuerAccount.address);
    const toOwner = await this.isAvailable(to.address);

    const convertedAmount = Math.floor(amount * 100);

    // TODO display unlock modal if need
    issuerPair.unlock('test');

    try {
      // Sign and send a transfer from Alice to Bob
       const txHash = await this.api.tx.balances
         .transfer(to.address, convertedAmount)
         .signAndSend(issuerPair, async ({status}) => {
            if (status.isInBlock) {
              console.info('Completed at block hash #' + status.hash.toHuman());

              if (toOwner) {
                const toAccount = await this.getByAddress(to.address);
                await this.loadData(toAccount);
              }

              await this.loadData(issuerAccount);
              this.notifyChanged();

            } else {
              console.info(`Current status`, status.toHuman());
            }
          });

      // Show the hash
      console.info(`Submitted with hash ${txHash}`);

      return txHash.toString();

    }
    catch (err) {
      console.error(err);
      throw new Error('ERROR.SEND_TX_FAILED');
    }
  }

  private async loadData(account: Account, opts?: {reload?: boolean}): Promise<Account> {
    if (!!account.data && opts?.reload !== true) return account; // Already loaded: skip

    const {data} = await this.api.query.system.account(account.address);

    account.data = JSON.parse(data.toString());
    this.debug(`Loaded ${account.address} data:`, account.data);


    return account;
  }

  private notifyChanged() {
    this._$accounts.next(this._$accounts.value);
  }

  async loginV1(data: {salt: string, password: string; meta?: AccountMeta}): Promise<Account> {
    if (!data?.salt || !data?.password) return;

    this.log('Authenticating using salt+pwd...');

    const rawSeedString = await new Promise((resolve) => {
      scrypt(data.password, data.salt, {
        N: 4096,
        r: 16,
        p: 1,
        dkLen: 32,
        encoding: 'hex'
      }, (result) => resolve(result));
    });

    console.info(rawSeedString);

    const meta = {
      name: data.meta?.name,
      genesisHash: this.network.currency?.genesys
    }

    const {pair, json} = await keyring.addUri(`0x${rawSeedString}`, data.password, meta, 'ed25519');

    pair.unlock(data.password);

    keyring.saveAccount(pair, data.password);
    keyring.addPair(pair, data.password);

    const account = this.addAccount({
      address: json.address,
      publicKey: pair.publicKey.toString(),
      type: pair.type,
      meta
    });

    return account;
  }

}
