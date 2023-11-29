import {Inject, Injectable} from "@angular/core";
import {NetworkService} from "../network/network.service";
import {ApiPromise} from "@polkadot/api";
import {
  Account,
  AccountUtils,
  APP_AUTH_CONTROLLER,
  AuthData,
  IAuthController,
  LoginEvent,
  LoginOptions,
  SelectAccountOptions
} from "./account.model";
import {keyring} from "@polkadot/ui-keyring";
import {environment} from "@environments/environment";
import {KeyringStorage} from "@app/shared/services/storage/keyring-storage";
import {base58Encode, cryptoWaitReady, mnemonicGenerate} from '@polkadot/util-crypto';
import {
  isEmptyArray,
  isNil,
  isNilOrBlank,
  isNilOrNaN,
  isNotEmptyArray,
  isNotNil,
  isNotNilOrBlank,
  sleep
} from "@app/shared/functions";
import {APP_STORAGE, IStorage} from "@app/shared/services/storage/storage.utils";
import {debounceTime, firstValueFrom, from, map, Observable, Subscription, switchMap, timer} from "rxjs";
import {Currency} from "@app/network/currency.model";
import {SettingsService} from "@app/settings/settings.service";
import {scryptEncode} from "@polkadot/util-crypto/scrypt/encode";
import {u8aToHex} from "@polkadot/util";
import {formatAddress, formatPubkey} from "@app/shared/currencies";
import {RxStartableService} from "@app/shared/services/rx-startable-service.class";
import {RxStateProperty, RxStateSelect} from "@app/shared/decorator/state.decorator";
import {ED25519_SEED_LENGTH, SCRYPT_PARAMS} from "@app/account/crypto.utils";
import {KeyringPair} from "@polkadot/keyring/types";

export interface LoadAccountDataOptions {
  reload?: boolean;
  withTx?: boolean;
  withCert?: boolean;
  withBalance?: boolean;
  emitEvent?: boolean;
}

export interface AccountsState {
  accounts: Account[];
  password: string;
}

@Injectable({providedIn: 'root'})
export class AccountsService extends RxStartableService<AccountsState> {

  private _store = new KeyringStorage(this.storage);
  private _passwordTimer: Subscription;
  private _keyringInitialized = false;

  get api(): ApiPromise {
    return this.network.api;
  }

  @RxStateProperty() accounts: Account[];
  @RxStateSelect() accounts$: Observable<Account[]>;

  @RxStateProperty() private _password: string;

  get isLogin(): boolean {
    return this.started && isNotEmptyArray(this.accounts);
  }


  constructor(
    protected network: NetworkService,
    protected settings: SettingsService,
    @Inject(APP_STORAGE) protected storage: IStorage,
    @Inject(APP_AUTH_CONTROLLER) protected accountModalController: IAuthController
  ) {
    super(network, {
      name: 'account-service'
    });
    this.start();
  }

  protected async ngOnStart(): Promise<any> {

    // Wait crypto to be loaded by browser
    await cryptoWaitReady();

    const currency = this.network.currency;

    // Configure keyring
    keyring.setDevMode(!environment.production);
    keyring.setSS58Format(currency.prefix || 42 /* = dev format */);

    // Restoring accounts
    let accounts = await this.restoreAccounts(currency);

    return {
      accounts
    };
  }

  protected async ngOnStop(): Promise<void> {
    this._keyringInitialized = false;
    return super.ngOnStop();
  }

  selectAccount(opts?: SelectAccountOptions): Promise<Account> {
    return this.accountModalController.selectAccount(opts);
  }

  async createNew(opts?: {redirectToWalletPage?: boolean}): Promise<Account> {
    const data = await this.accountModalController.createNew(opts);

    if (!data?.address) return null; // User cancelled

    // Make account exists
    if (!(await this.isAvailable(data.address))) {
      throw {message: 'ERROR.UNKNOWN_WALLET_ID1'};
    }

    return data;
  }

  async login(event?: LoginEvent, opts?: LoginOptions): Promise<Account> {
    const data = await this.accountModalController.login(event, opts);

    if (!data?.address) return null; // User cancelled

    // Make account exists
    if (!(await this.isAvailable(data.address))) {
      throw {message: 'ERROR.UNKNOWN_WALLET_ID1'};
    }

    return data;
  }

  async restoreAccounts(currency?: Currency) {
    // load all available addresses and accounts
    const now = Date.now();
    console.info('[account-service] Loading all accounts...');

    // Prepare an observable, to known when keyring.loadAll() will be ready
    const accounts$ = keyring.accounts.subject
      .pipe(
        debounceTime(250),
        map(_ => keyring.getAccounts())
      )

    keyring.loadAll({
      store: this._store,
      ss58Format: currency?.prefix,
      genesisHash: currency?.genesis,
      isDevelopment: !environment.production
    });

    const keyringAddresses = await firstValueFrom(accounts$);
    this._keyringInitialized = true;
    if (isEmptyArray(keyringAddresses)) {
      console.info('[account-service] Loading all accounts [OK] No account found');
    }
    else {
      let accounts = keyringAddresses.map(ka => {
        return <Account>{
          address: ka.address,
          publicKey: ka.publicKey,
          meta: {
            ...ka.meta
          }
        }
      });

      // Add Dev account
      if (!environment.production) {
        const devAccount = await this.addDevAccount(accounts);
        if (devAccount) accounts.push(devAccount);
      }

      // Load account's data
      try {
        await Promise.all(accounts.map(a => this.loadData(a)));

        // DEBUG
        console.info(this._logPrefix + `Loading accounts [OK] ${accounts.length} accounts loaded in ${Date.now() - now}ms`);
        accounts.forEach(a => {
          console.info(` - ${a.meta?.name || formatAddress(a.address)} {free: ${a.data?.free / 100}, reserved: ${a.data?.reserved / 100}}`);
        });

        return accounts;
      }
      catch (err) {
        console.error('Error while loading accounts', err);
        return [];
      }
    }
  }

  /**
  * Add test account --- DEV only
  */
  protected async addDevAccount(accounts: Account[]): Promise<Account> {
    const data =  environment.dev?.auth;

    // Set password to AAAAA (or those defined in environment)
    this._password = data?.password || 'AAAAA';

    if (!data?.v1 && !data.v2) return; // Skip if no dev account defined
    data.meta = {
      isTesting: true,
      default: true,
      ...data.meta
    }

    const {pair, account} = await this.createAccount(data);

    const index = (accounts || []).findIndex(a => a.address === pair.address) || -1;
    if (index !== -1) {
      accounts[index] = {
        ...accounts[index],
        ...data
      }
      // Update meta
      keyring.saveAccountMeta(pair, pair.meta);
      return undefined;
    }

    // Add new account
    else {
      keyring.saveAccount(pair, this._password);
      return account;
    }

  }

  async addAccount(auth: AuthData): Promise<Account> {
    if (!auth) return;

    if (!this.started) await this.ready();

    const {pair, account} = await this.createAccount(auth);

    const isAuth = await this.auth();
    if (!isAuth) return; // Skip is cannot write to keyring

    // Save account into keyring
    keyring.saveAccount(pair, this._password);

    // Save account into service's list
    await this.saveAccount(account);

    return account;
  }

  async auth(): Promise<boolean> {
    if (isNotNilOrBlank(this._password)) {
      console.debug(`${this._logPrefix}Already authenticated. Skip`);
      return true; // ok
    }

    console.debug(`${this._logPrefix}Not auth: opening unlock modal...`);

    const data = await this.accountModalController.unlock();

    // User cancelled
    if (isNilOrBlank(data)) {
      console.debug(`${this._logPrefix}Not auth: cancelled`);
      return false;
    }

    this._password = data as string;

    // Un auth after a delay
    this._passwordTimer?.unsubscribe();
    const resetDelay = Math.max(this.settings.get('unAuthDelayMs') || 0, 5000); // 5s min
    this._passwordTimer = timer(resetDelay)
      .subscribe(() => {

        if (isNotNil(this._password)) {
          this._password = null;

          // Lock all pairs
          (this.accounts || [])
            .map(a => keyring.getPair(a.address))
            .filter(pair => pair.isLocked)
            .forEach(pair => pair.lock());
        }
        this._passwordTimer?.unsubscribe();
        this._passwordTimer = null;
      });
    return true;
  }

  async generateMnemonic(numWords: 12 | 15 | 18 | 21 | 24 = 12) {
    if (!this._keyringInitialized) await this.ready();

    // generate a random mnemonic
    return mnemonicGenerate(numWords);
  }

  async createPair(data: AuthData): Promise<KeyringPair> {
    if (!this._keyringInitialized) await this.ready();

    if (data.v1) {
      const passwordU8a = Uint8Array.from(data.v1.password.split('').map(x => x.charCodeAt(0)));
      const saltU8a = Uint8Array.from(data.v1.salt.split('').map(x => x.charCodeAt(0)));
      const result = scryptEncode(passwordU8a, saltU8a, data.v1.scryptParams || SCRYPT_PARAMS.DEFAULT);
      const seedHex = u8aToHex(result.password.slice(0,ED25519_SEED_LENGTH));
      return keyring.createFromUri(seedHex, data.meta || {}, 'ed25519');
    }
    else if (data.v2) {
      return keyring.createFromUri(data.v2.mnemonic, data.meta, 'sr25519');
    }
  }

  async createAccount(data: AuthData): Promise<{account: Account; pair: KeyringPair}> {
    const pair = await this.createPair(data);
    const publicKeyV1 = pair.type === 'ed25519' ? base58Encode(pair.publicKey) : undefined;

    const account: Account = {
      address: pair.address,
      publicKey: pair.publicKey,
      meta: {
        ...pair.meta,
        name: data.meta?.name || (publicKeyV1 ? formatPubkey(publicKeyV1) : formatAddress(pair.address)),
        publicKeyV1: publicKeyV1,
        genesisHash: this.network.currency?.genesis,
        ...data.meta
      }
    };

    pair.setMeta(account.meta);

    return {pair, account};
  }

  async saveAccount(account: Account): Promise<Account> {
    let accounts = this.accounts || [];

    // Define as default
    if (account.meta?.default || accounts.length === 1) this.setDefaultAccount(account, accounts);

    await this.loadData(account);

    // Append to accounts
    if (this.started) {
      const alreadyExists = await this.isAvailable(account.address);
      if (!alreadyExists) {
        this.accounts = [...(this.accounts || []), account];
      }
    }

    return account;
  }

  setDefaultAccount(account: Account, accounts?: Account[]) {
    account.meta = {
      ...account.meta,
      default: true
    };
    // Set other as NOT default
    accounts = accounts || this.accounts || [];
    accounts.filter(a => a.address !== account.address && a.meta?.default)
      .forEach(a => {
        a.meta = {
          ...a.meta,
          default: false
        };
      });
  }

  watchAll(opts?: {positiveBalanceFirst?: boolean}): Observable<Account[]> {

    if (!this.started) {
      return from(this.ready())
        .pipe(
          switchMap(() => this.watchAll(opts))
        );
    }

    return this.select('accounts')
      .pipe(
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

    return this.accounts || [];
  }

  async getDefault(opts?: LoadAccountDataOptions): Promise<Account> {
    if (!this.started) await this.ready();

    const accounts = this.accounts || [];
    let account = accounts.find(a => a.meta?.default);
    if (!account) {
      if (accounts.length) {
        account = accounts[0];
        this.setDefaultAccount(account);
      } else {
        throw {message: 'ERROR.UNKNOWN_WALLET_ID1'};
      }
    }

    // Load data
    return await this.loadData(account, opts);
  }

  async getByName(name: string, opts?: LoadAccountDataOptions): Promise<Account> {
    if (!this.started) await this.ready();

    const accounts = this.accounts || [];

    const account = accounts.find(a => a.meta?.name === name);
    if (!account) {
      throw {message: 'ERROR.UNKNOWN_WALLET_ID2'};
    }

    // Load
    return await this.loadData(account, opts);
  }

  async isAvailable(address: string, accounts?: Account[]): Promise<boolean> {
    if (!accounts && !this.started) await this.ready();
    return (accounts || this.accounts || []).some(a => a.address === address);
  }

  async getByAddress(address: string, opts?: LoadAccountDataOptions): Promise<Account> {
    if (!this.started) await this.ready();

    const accounts = this.accounts || [];
    const account = accounts.find(a => a.address === address);
    if (!account) {
      throw {message: 'ERROR.UNKNOWN_WALLET_ID3'};
    }

    // Load data
    return await this.loadData(account, opts);
  }


  watchByAddress(address: string, opts?: LoadAccountDataOptions): Observable<Account> {
    return this.accounts$.pipe(
      map((accounts) => accounts?.find(a => a.address === address))
    )
  }

  async transfer(from: Partial<Account>, to: Partial<Account>, amount: number, fee?: number) : Promise<string> {
    if (!from || !to) throw new Error('Missing argument \'from\' or \'to\' !');
    const currency = this.network.currency;

    // Check currency
    if (!currency) throw new Error('ERROR.CHECK_NETWORK_CONNECTION');

    // Check amount
    if (isNilOrNaN(amount)) {
      throw new Error('ERROR.AMOUNT_REQUIRED');
    }
    if (amount < 0) {
      throw new Error('ERROR.AMOUNT_NEGATIVE');
    }

    // Check fee
    fee = fee || currency.fees.tx || 0;
    if (fee < 0) {
      throw new Error('ERROR.FEE_NEGATIVE');
    }

    // Check issuer != recipient
    if (from.address === to.address) {
      throw new Error('ERROR.SAME_TX_RECIPIENT');
    }

    // Get issuer account
    const issuerAccount = await this.getByAddress(from.address);

    // Check enough credit
    if ((amount + fee) > issuerAccount.data.free) {
      throw new Error('ERROR.NOT_ENOUGH_CREDIT');
    }

    console.info(`[account-service] Sending ${amount} :\nfrom: ${from.address}\nto ${to.address}`)


    // Compute total amount (with fee) and remove decimals
    const powBase = Math.pow(10, currency.decimals || 0);
    const totalAmount = Math.floor((amount + fee) * powBase);

    // Get pair, and unlock it
    const issuerPair = keyring.getPair(issuerAccount.address);
    if (issuerPair.isLocked) {
      console.debug(`[account-service] Unlocking address ${from.address} ...`);
      const isAuth = await this.auth();
      if (!isAuth) throw new Error('ERROR.AUTH_REQUIRED');
      issuerPair.unlock(this._password);
    }

    try {
      // Sign and send a transfer from Alice to Bob
       const txHash = await this.api.tx.balances
         .transfer(to.address, totalAmount)
         .signAndSend(issuerPair, async ({status, events, findRecord}) => {
            if (status.isInBlock) {
              console.info(`${this._logPrefix}Completed at block hash #${status.hash.toHuman()}`);

              if (this._debug) console.debug(`${this._logPrefix}Block events:`, JSON.stringify(events));

              let outdatedAccounts = [issuerAccount];

              // Update receiver account
              if (await this.isAvailable(to.address)) {
                const toAccount = await this.getByAddress(to.address);
                outdatedAccounts.push(toAccount);
              }

              await sleep(200);
              await this.refreshData(outdatedAccounts, {reload: true});

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

  /**
   * Load account data (balance, tx history, etc.).
   * This load can be skipped, when data already loaded (See options)
   * @param account
   * @param opts
   * @private
   */
  private async loadData(account: Account, opts?: LoadAccountDataOptions): Promise<Account> {
    opts = {
      reload: false,
      withBalance: true,
      withTx: false, // disable by default
      ...opts
    };

    try {
      const now = Date.now();
      let changed = false;

      // Load balance (free + reserved)
      if (opts.withBalance === true && (isNil(account.data?.free) || opts.reload === true)) {
        console.debug(`${this._logPrefix} Loading ${account.meta?.name || formatAddress(account.address)} data...`);
        const {data} = await this.api.query.system.account(account.address);
        account.data = {
          ...account.data,
          ...JSON.parse(data.toString())
        };
        changed = true;


        //await this.api.query.udAccountsStorage.udAccounts(account.address);
      }

      // Load TX
      if (opts.withTx === true && (isNil(account.data?.txs) || opts.reload === true)) {
        console.debug(`${this._logPrefix} Loading ${formatAddress(account.address)} TX history...`);
        console.warn('[account-service] TODO - Implement load TX history');


        // TODO
        //somethingLoaded = true;

      }

      // Load Cert
      if (opts.withCert !== false) {
        // const certs = await this.api.query.cert.certsByReceiver(account.address);
        // console.debug(`${this._logPrefix} Loaded certs:`, certs);
      }

      // Emit change event
      if (changed && this.accounts) {
        console.debug(`${this._logPrefix} Loading ${formatAddress(account.address)} data [OK] in ${Date.now()-now}ms`, account.data);
      }
    }
    catch(err) {
      console.error(`${this._logPrefix}Failed to load ${formatAddress(account.address)} data:`, err);
      throw new Error('ERROR.LOAD_WALLET_DATA_ERROR');
    }

    return account;
  }

  private async refreshData(accounts: Account|Account[], opts?: LoadAccountDataOptions) {
    const array = Array.isArray(accounts) ? accounts : [accounts];
    try {
      const jobs = array.map(account => this.loadData(account, opts));
      await Promise.all(jobs);

      // Notify accounts changed
      if (!opts || opts.emitEvent !== false) this.notifyChanged();
    }
    catch(err) {
      console.error(`${this._logPrefix}Failed to refresh data of:`, array.map(a => formatAddress(a.address)));
      throw new Error('ERROR.UPDATE_WALLET_LIST_FAILED');
    }
  }

  private notifyChanged() {
    this.set('accounts', (s) => s.accounts.slice() /*create a copy*/);
  }

  forgetAll() {
    if (environment.production) {
      (this.accounts || []).forEach(account => {
        keyring.forgetAccount(account.address);
      });
    }
    this.accounts = [];
  }
}
