import {Inject, Injectable} from "@angular/core";
import {NetworkService} from "../network/network.service";
import {ApiPromise} from "@polkadot/api";
import {Account, AccountMeta, AccountUtils} from "./account.model";
import {StartableService} from "@app/shared/services/startable-service.class";
import {AuthData} from "@app/auth/auth.model";
import {keyring} from "@polkadot/ui-keyring";
import {environment} from "@environments/environment";
import {KeyringStorage} from "@app/shared/services/storage/keyring-storage";
import {RegisterData} from "@app/register/register.model";
import {cryptoWaitReady, mnemonicGenerate} from '@polkadot/util-crypto';
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
import {
  BehaviorSubject,
  debounceTime,
  firstValueFrom,
  from,
  map,
  Observable,
  Subscription,
  switchMap,
  timer
} from "rxjs";
import {ModalController} from "@ionic/angular";
import {UnlockModal, UnlockModalOptions} from "@app/unlock/unlock.modal";
import {Currency} from "@app/network/currency.model";
import {SettingsService} from "@app/settings/settings.service";
import {scryptEncode} from "@polkadot/util-crypto/scrypt/encode";
import {Params} from "@polkadot/util-crypto/scrypt/types";
import {u8aToHex} from "@polkadot/util";
import {addressKey, contractKey} from "@polkadot/ui-keyring/defaults";
import {formatAddress} from "@app/shared/currencies";

export interface LoadAccountDataOptions {
  reload?: boolean;
  withTx?: boolean;
  withBalance?: boolean;
  emitEvent?: boolean;
}

export const  SCRYPT_PARAMS = {
  SIMPLE: <Params>{
    N: 2048,
    r: 8,
    p: 1
  },
  DEFAULT: <Params>{
    N: 4096,
    r: 16,
    p: 1
  },
  SECURE: <Params>{
    N: 16384,
    r: 32,
    p: 2
  },
  HARDEST: <Params>{
    N: 65536,
    r: 32,
    p: 4
  },
  EXTREME: <Params>{
    N: 262144,
    r: 64,
    p: 8
  }
};

const ED25519_SEED_LENGTH = 32;

@Injectable({providedIn: 'root'})
export class AccountService extends StartableService {

  private _$accounts = new BehaviorSubject<Account[]>([]);
  private _store = new KeyringStorage(this.storage);
  private readonly _isDevelopment: boolean;
  private _password: string = null;
  private _passwordTimer: Subscription;

  get api(): ApiPromise {
    return this.network.api;
  }

  get accounts(): Account[] {
    return this._$accounts.value;
  }

  get isLogin(): boolean {
    return this.started && isNotEmptyArray(this.accounts);
  }

  constructor(
    protected network: NetworkService,
    protected settings: SettingsService,
    protected modalController: ModalController,
    @Inject(APP_STORAGE) protected storage: IStorage
  ) {
    super(network, {
      name: 'account-service'
    });

    // DEV mode
    this._isDevelopment = !environment.production;
  }

  protected async ngOnStart(): Promise<any> {

    // Wait crypto to be loaded by browser
    await cryptoWaitReady();

    const currency = this.network.currency;

    // Configure keyring
    keyring.setDevMode(this._isDevelopment);
    keyring.setSS58Format(currency.prefix || 42 /* = dev format */);

    // Restoring accounts
    await this.restoreAccounts(currency);

    // Add Dev account - DEV only
    await this.configureDevAccount();
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
      genesisHash: currency?.genesys,
      isDevelopment: this._isDevelopment
    });

    const keyringAddresses = await firstValueFrom(accounts$);
    if (isEmptyArray(keyringAddresses)) {
      console.info('[account-service] Loading all accounts [OK] No account found');
    }
    else {
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

      // DEBUG
      console.info(`Loading accounts [OK] ${accounts.length} accounts loaded in ${Date.now() - now}ms`);
      accounts.forEach(a => {
        console.info(` - ${a.address} (${a.meta?.name}) - free=${a.data?.free} - reserved=${a.data?.reserved}`);
      });

      this._$accounts.next(accounts);
    }
  }

  /**
  * Add test account --- DEV only
  */
  protected async configureDevAccount() {
    if (!this._isDevelopment) return;
    const auth =  environment.dev?.auth;

    // Set password to AAAAA (or those defined in environment)
    this._password = auth?.password || 'AAAAA';

    // Add a V1 Dev account, if define in environment
    if (auth?.v1) {
      const alreadyExists = auth.address && this._$accounts.value.some(a => a.address === auth.address);
      if (!alreadyExists) {
        await this.addV1Account({...auth.v1, meta: auth.meta});
      }
    }
  }

  async login(auth: AuthData): Promise<Account> {
    if (!auth) return;

    await this.ready();

    if (auth.v1) {
      return this.addV1Account({...auth.v1, meta: auth.meta});
    }
    else if (auth.v2) {
      return this.addV2Account({...auth.v2, meta: auth.meta});
    }

    // TODO
    //return this._accounts[0];
  }

  async auth(): Promise<boolean> {
    if (isNotNilOrBlank(this._password)) {
      console.debug(`${this._logPrefix}Already authenticated. Skip`);
      return true; // ok
    }

    console.debug(`${this._logPrefix}Not auth: opening unlock modal...`);

    const modal = await this.modalController.create({
      component: UnlockModal,
      componentProps: <UnlockModalOptions>{
      }
    });
    await modal.present();
    const {data, role} = await modal.onWillDismiss();

    // User cancelled
    if (isNilOrBlank(data)) {
      console.debug(`${this._logPrefix}Not auth: cancelled`);
      return false;
    }

    this._password = data as string;

    // Un auth after a delay
    this._passwordTimer?.unsubscribe();
    const resetDelay = Math.max(this.settings.data?.unAuthDelayMs || 0, 5000); // 5s min
    this._passwordTimer = timer(resetDelay)
      .subscribe(() => {

        if (isNotNil(this._password)) {
          this._password = null;

          // Lock all pairs
          (this._$accounts.value || [])
            .map(a => keyring.getPair(a.address))
            .filter(pair => pair.isLocked)
            .forEach(pair => pair.lock());
        }
        this._passwordTimer?.unsubscribe();
        this._passwordTimer = null;
      });
    return true;
  }

  async generateMnemonic() {
    if (!this.started) await this.ready();

    // generate a random mnemonic, 12 words in length
    const mnemonic = mnemonicGenerate(12);

    return mnemonic;
  }

  async createAddress(data: RegisterData, save?: boolean): Promise<Account> {
    // add the account, encrypt the stored JSON with an account-specific password
    const { pair, json } = keyring.addUri(data.mnemonic, data.password, {
      name: data.meta?.name || 'default',
      genesisHash: this.network.currency?.genesys
    }, 'sr25519');

    return {
      address: json.address,
      meta: {
        name: data.meta?.name
      }
    };
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

  async addV2Account(data: RegisterData): Promise<Account> {

    // add the account, encrypt the stored JSON with an account-specific password
    const { pair, json } = keyring.addUri(data.mnemonic, data.password, {
      name: data.meta?.name || 'default',
      genesisHash: this.network.currency?.genesys
    }, 'sr25519');

    //this.debug('check pair', pair, json);

    return this.addAccount({
      address: json.address,
      meta: {
        name: data.meta?.name
      }
    });
  }

  async addAccount(account: Account): Promise<Account> {
    let accounts = this._$accounts.value || [];
    const existingAccount = accounts.find(a => a.address === account.address);
    if (existingAccount) {
      console.warn(`${this._logPrefix}Account with address '${account.address}' already added. Skip`);
      account = existingAccount;
    }
    else {
      console.info(`${this._logPrefix}Add account with address '${account.address}'`);

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

  async getDefault(opts?: LoadAccountDataOptions): Promise<Account> {
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

  async getByName(name: string, opts?: LoadAccountDataOptions): Promise<Account> {
    if (!this.started) await this.ready();

    const accounts = this._$accounts.value || [];
    const account = accounts.find(a => a.meta?.name === name);
    if (!account) throw {message: 'ERROR.UNKNOWN_WALLET_ID'};

    // Load
    return await this.loadData(account, opts);
  }

  async getByAddress(address: string, opts?: LoadAccountDataOptions): Promise<Account> {
    if (!this.started) await this.ready();

    const accounts = this._$accounts.value || [];
    const account = accounts.find(a => a.address === address);
    if (!account) throw {message: 'ERROR.UNKNOWN_WALLET_ID'};

    // Load data
    return await this.loadData(account, opts);
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
      let loaded = false;

      // Load balance (free + reserved)
      if (opts.withBalance === true && (isNil(account.data?.free) || opts.reload === true)) {
        console.debug(`${this._logPrefix} Loading ${formatAddress(account.address)} data...`);
        const {data} = await this.api.query.system.account(account.address);
        account.data = {
          ...account.data,
          ...JSON.parse(data.toString())
        };
        loaded = true;
      }

      // Load TX
      if (opts.withTx === true && (isNil(account.data?.txs) || opts.reload === true)) {
        console.debug(`${this._logPrefix} Loading ${formatAddress(account.address)} TX history...`);
        console.warn('[account-service] TODO - Implement load TX history');
        // TODO
        //somethingLoaded = true;
      }

      if (loaded) {
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
    this._$accounts.next(this._$accounts.value.slice() /*create a copy*/);
  }

  async addV1Account(data: {salt: string, password: string; meta?: AccountMeta, scryptParams?: Params}): Promise<Account> {
    if (!data?.salt || !data?.password) return;

    console.info(this._logPrefix + ' Authenticating using salt+pwd...');
    const passwordU8a = Uint8Array.from(data.password.split('').map(x => x.charCodeAt(0)));
    const saltU8a = Uint8Array.from(data.salt.split('').map(x => x.charCodeAt(0)));
    const result = scryptEncode(passwordU8a, saltU8a, data.scryptParams || SCRYPT_PARAMS.DEFAULT);
    const seedHex = u8aToHex(result.password.slice(0,ED25519_SEED_LENGTH));

    //console.debug('Computed seed (hex) from salt+pwd:', rawSeedString);

    const meta = {
      name: data.meta?.name || 'V1',
      genesisHash: this.network.currency?.genesys
    }

    const isAuth = await this.auth();
    if (!isAuth) return; // Skip

    const {pair, json} = await keyring.addUri(seedHex, this._password, meta, 'ed25519');

    const account = await this.addAccount({
      address: json.address,
      publicKey: pair.publicKey.toString(),
      type: pair.type,
      meta
    });

    return account;
  }

  forgetAll() {
    if (!this._isDevelopment) {
      (this._$accounts.value || []).forEach(account => {
        keyring.forgetAccount(account.address);
      });
    }
    this._$accounts.next([]);
  }
}
