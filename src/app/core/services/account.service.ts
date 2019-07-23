import {Injectable} from "@angular/core";
import {base58, CryptoService, KeyPair} from "./crypto.service";
import {
  Account,
  getMainProfile,
  hasUpperOrEqualsProfile,
  StatusIds,
  UsageMode,
  UserProfileLabel,
  UserSettings
} from "./model";
import {Subject} from "rxjs";
import {Storage} from '@ionic/storage';
import {FetchPolicy} from "apollo-client";
import {ErrorCodes} from "./errors";
import {SuggestionDataService} from "../../shared/services/data-service.class";
import {LocalSettingsService} from "./local-settings.service";
import {DuniterService, FetchOptions, WatchFetchOptions} from "./duniter/duniter.service";
import {zip, zipAll} from "rxjs/operators";


export declare interface AccountHolder {
  loaded: boolean;
  keypair: KeyPair;
  authToken: string;
  pubkey: string;
  account: Account;
  mainProfile: String;
};
export interface AuthData {
  salt: string;
  password: string;
}
export interface RegisterData extends AuthData {
  uid: string;
  account: Account;
}

export interface AccountFieldDef<T = any> {
  name: string;
  label: string;
  required: boolean;
  dataService?: SuggestionDataService<T>;
  dataFilter?: any;
  updatable: {
    registration: boolean;
    account: boolean;
  };
}

const TOKEN_STORAGE_KEY = "token";
const PUBKEY_STORAGE_KEY = "pubkey";
const SECKEY_STORAGE_KEY = "seckey";
const ACCOUNT_STORAGE_KEY = "account";




@Injectable({providedIn: 'root'})
export class AccountService {

  private data: AccountHolder = {
    loaded: false,
    keypair: null,
    authToken: null,
    pubkey: null,
    mainProfile: null,
    account: null
  };
  private readonly _debug: boolean;
  private _startPromise: Promise<any>;
  private _started = false;
  private _additionalAccountFields: AccountFieldDef[] = [];

  public onLogin = new Subject<Account>();
  public onLogout = new Subject<any>();
  public onAuthTokenChange = new Subject<string | undefined>();

  public get account(): Account {
    return this.data.loaded ? this.data.account : undefined;
  }

  constructor(
    protected duniter: DuniterService,
    private settings: LocalSettingsService,
    private cryptoService: CryptoService,
    private storage: Storage
  ) {

    this.resetData();

    // Restoring local settings
    this._startPromise = this.restoreLocally()
      .then((account) => {
        this._started = true;
        if (account) this.onLogin.next(this.data.account);
      });

    this._debug = true;
  }

  private resetData() {
    this.data.loaded = false;
    this.data.keypair = null;
    this.data.authToken = null;
    this.data.pubkey = null;
    this.data.mainProfile = null;
    this.data.account = new Account();
  }

  async start() {
    if (this._startPromise) return this._startPromise;
    if (this._started) return;

    // Restoring local settings
    this._startPromise = this.settings.ready()
      .then(() => this.restoreLocally())
      .then(() => {
        this._started = true;
        this._startPromise = undefined;
      });
    return this._startPromise;
  }

  public isStarted(): boolean {
    return this._started;
  }

  public ready(): Promise<void> {
    if (this._started) return Promise.resolve();
    return this.start();
  }

  public isLogin(): boolean {
    return !!(this.data.pubkey && this.data.loaded);
  }

  public isAuth(): boolean {
    return !!(this.data.pubkey && this.data.keypair && this.data.keypair.secretKey);
  }

  public hasMinProfile(label: UserProfileLabel): boolean {
    // should be login, and status ENABLE or TEMPORARY
    if (!this.data.account || !this.data.account.pubkey ||
      (this.data.account.statusId != StatusIds.MEMBER && this.data.account.statusId != StatusIds.WALLET)) {
      return false;
    }
    return hasUpperOrEqualsProfile(this.data.account.profiles, label as UserProfileLabel);
  }

  public hasExactProfile(label: UserProfileLabel): boolean {
    // should be login, and status ENABLE or TEMPORARY
    if (!this.data.account || !this.data.account.pubkey ||
      (this.data.account.statusId != StatusIds.MEMBER && this.data.account.statusId != StatusIds.WALLET))
      return false;
    return !!this.data.account.profiles.find(profile => profile === label);
  }


  public hasProfileAndIsEnable(label: UserProfileLabel): boolean {
    // should be login, and status ENABLE
    if (!this.data.account || !this.data.account.pubkey || this.data.account.statusId != StatusIds.MEMBER) return false;
    return hasUpperOrEqualsProfile(this.data.account.profiles, label as UserProfileLabel);
  }

  public isAdmin(): boolean {
    return this.hasProfileAndIsEnable('ADMIN');
  }

  public isUser(): boolean {
    return this.hasProfileAndIsEnable('USER');
  }

  /**
   * @deprecated
   * @param mode
   */
  public isUsageMode(mode: UsageMode): boolean {
    return this.settings.isUsageMode(mode);
  }

  public isOnlyGuest(): boolean {
    // Should be login, and status ENABLE or TEMPORARY
    if (!this.data.account || !this.data.account.pubkey ||
      (this.data.account.statusId !== StatusIds.MEMBER && this.data.account.statusId !== StatusIds.WALLET))
      return false;
    // Profile less then user
    return !hasUpperOrEqualsProfile(this.data.account.profiles, 'USER');
  }

  public async register(data: RegisterData): Promise<Account> {
    if (this.isLogin()) {
      throw new Error("User already login. Please logout before register.");
    }
    if (!data.salt || !data.salt) throw new Error("Missing required username por password");

    if (this._debug) console.debug('[account] Register new user account...', data.account);
    this.data.loaded = false;
    let now = Date.now();

    try {
      const keypair = await this.cryptoService.scryptKeypair(data.salt, data.password);
      data.account.pubkey = base58.encode(keypair.publicKey);

      // Default values
      data.account.settings.locale = this.settings.locale;

      this.data.keypair = keypair;
      const account = await this.saveAccount(data.account, keypair);

      // Default values
      account.avatar = account.avatar || "../assets/img/person.png";
      this.data.mainProfile = getMainProfile(account.profiles);

      this.data.account = account;
      this.data.pubkey = account.pubkey;

      // Try to auth on node
      // TODO: need auth API in GVA
      //this.data.authToken = await this.authenticateAndGetToken();

      this.data.loaded = true;

      await this.saveLocally();

      console.debug("[account] Account successfully registered in " + (Date.now() - now) + "ms");
      this.onLogin.next(this.data.account);
      return this.data.account;
    }
    catch (error) {
      console.error(error && error.message || error);
      this.resetData();
      throw error;
    }
  }

  async login(data: AuthData): Promise<Account> {
    if (!data.salt || !data.password) throw "Missing salt or password";

    console.debug("[account] Trying to login...");

    let keypair;
    try {
      keypair = await this.cryptoService.scryptKeypair(data.salt, data.password);
    } catch (error) {
      console.error(error);
      this.resetData();
      throw { code: ErrorCodes.UNKNOWN_ERROR, message: "ERROR.SCRYPT_ERROR" };
    }

    // Store pubkey+keypair
    this.data.pubkey = base58.encode(keypair.publicKey);
    this.data.keypair = keypair;

    // Try to auth on remote server
    try {
      // TODO: need auth API in GVA
      //this.data.authToken = await this.authenticateAndGetToken();
    }
    catch (error) {
      console.error(error);
      this.resetData();
      throw error;
    }

    // Load account data
    try {
      await this.loadData();
    }
    catch (err) {
      // If account not found, check if email is valid
      if (err && err.code == ErrorCodes.LOAD_ACCOUNT_ERROR) {

        let isUidExists;
        try {
          isUidExists = await this.duniter.isUidExists(data.salt);
        } catch (otherError) {
          throw err; // resend the first error
        }

        // Email not exists (no account)
        if (!isUidExists) {
          throw { code: ErrorCodes.UNKNOWN_ACCOUNT_UID, message: "ERROR.UNKNOWN_ACCOUNT_EMAIL" };
        }
        // Email exists, so error = 'bad password'
        throw { code: ErrorCodes.BAD_PASSWORD, message: "ERROR.BAD_PASSWORD" };
      }

      throw err; // resend the first error
    }

    try {
      // Store to local storage
      await this.saveLocally();
    }
    catch (error) {
      console.error(error);
      this.resetData();
      throw error;
    }

    console.debug("[account] Successfully authenticated {" + this.data.pubkey.substr(0, 6) + "}");

    // Emit event to observers
    this.onLogin.next(this.data.account);

    return this.data.account;
  }

  public async refresh(): Promise<Account> {
    if (!this.data.pubkey) throw new Error("User not logged");

    await this.loadData({ fetchPolicy: 'network-only' });
    await this.saveLocally();

    console.debug("[account] Successfully reload account");

    // Emit login event to subscribers
    this.onLogin.next(this.data.account);

    return this.data.account;
  }

  async loadData(opts?: { fetchPolicy?: FetchPolicy }): Promise<Account> {
    if (!this.data.pubkey) throw new Error("User not logged");

    this.data.loaded = false;

    try {
      const account = (await this.loadAccount(this.data.pubkey, opts)) || new Account();

      // Fill default values
      account.avatar = account.avatar || "../assets/img/person.png";
      account.settings = account.settings || new UserSettings();
      account.settings.locale = account.settings.locale || this.settings.locale;

      // Read main profile
      this.data.mainProfile = getMainProfile(account.profiles);

      if (this.data.account) {
        account.copy(this.data.account);
      }
      else {
        this.data.account = account;
      }
      this.data.loaded = true;
      return this.data.account;
    }
    catch (error) {
      this.resetData();
      if (error.code && error.message) throw error;

      console.error(error);
      throw {
        code: ErrorCodes.LOAD_ACCOUNT_ERROR,
        message: 'ERROR.LOAD_ACCOUNT_ERROR'
      };
    }
  }

  public async restoreLocally(): Promise<Account | undefined> {

    // Restore from storage
    const values = await Promise.all([
      this.storage.get(PUBKEY_STORAGE_KEY),
      this.storage.get(TOKEN_STORAGE_KEY),
      this.storage.get(ACCOUNT_STORAGE_KEY),
      this.storage.get(SECKEY_STORAGE_KEY)
    ]);
    const pubkey = values[0];
    const token = values[1];
    const accountStr = values[2];
    const seckey = values[3];

    // Quit if no pubkey
    if (!pubkey) return;

    // Quit if could not auth on remote server
    const canRemoteAuth = !!token || !!seckey;
    if (!canRemoteAuth) return;

    if (this._debug) console.debug("[account] Restoring account {" + pubkey.substr(0, 6) + "}'...");

    this.data.pubkey = pubkey;
    this.data.keypair = seckey && {
      publicKey: base58.decode(pubkey),
      secretKey: base58.decode(seckey)
    };

    try {
      this.data.authToken = await this.authenticateAndGetToken(token);
      if (!this.data.authToken) throw "Authentication failed";
    }
    catch (error) {
      console.error(error);
      // TODO: do not logout, but allow navigation on local data ?
      this.logout();
      return;
    }

    // No account: stop here (= data not loaded)
    if (!accountStr) return;

    const accountObj: any = JSON.parse(accountStr);
    if (!accountObj) return;

    const account = Account.fromObject(accountObj);
    if (account.pubkey !== pubkey) return;

    this.data.account = account;
    this.data.mainProfile = getMainProfile(account.profiles);
    this.data.loaded = true;

    // Emit event
    this.onLogin.next(this.data.account);

    return account;
  }

  /**
  * Save account into the local storage
  */
  async saveLocally(): Promise<void> {
    if (!this.data.pubkey) throw "User not logged";

    if (this._debug) console.debug("[account] Saving account {" + this.data.pubkey.substring(0, 6) + "} in local storage...");

    let copy = this.data.account.asObject();
    const seckey = this.data.keypair && !!this.data.keypair.secretKey && base58.encode(this.data.keypair.secretKey) || null;

    await Promise.all([
      this.storage.set(PUBKEY_STORAGE_KEY, this.data.pubkey),
      this.storage.set(TOKEN_STORAGE_KEY, this.data.authToken),
      this.storage.set(ACCOUNT_STORAGE_KEY, JSON.stringify(copy)),
      this.storage.set(SECKEY_STORAGE_KEY, seckey)
    ]);

    if (this._debug) console.debug("[account] Account saved in local storage");
  }

  /**
   * Create or update an user account, to the remote storage
   * @param account
   * @param keyPair
   */
  public async saveRemotely(account: Account): Promise<Account> {
    if (!this.data.pubkey) return Promise.reject("User not logged");
    if (this.data.pubkey != account.pubkey) return Promise.reject("Not user account");

    console.debug("[account] Saving account {" + account.pubkey.substring(0, 6) + "} remotely...");
    let now = new Date

    const updateAccount = await this.saveAccount(account, this.data.keypair);
    console.debug("[account] Account remotely saved in " + (new Date().getTime() - now.getTime()) + "ms");

    // Set default values
    account.avatar = account.avatar || "../assets/img/person.png";
    this.data.mainProfile = getMainProfile(account.profiles);

    this.data.account = account;
    this.data.loaded = true;
    // Save locally (in storage)
    await this.saveLocally();

    // Send event
    this.onLogin.next(this.data.account);

    return this.data.account;
  }

  public async logout(): Promise<void> {

    const tokenRemoved = !!this.data.authToken;

    this.resetData();

    await Promise.all([
      this.storage.remove(PUBKEY_STORAGE_KEY),
      this.storage.remove(TOKEN_STORAGE_KEY),
      this.storage.remove(ACCOUNT_STORAGE_KEY),
      this.storage.remove(SECKEY_STORAGE_KEY)
    ]);

    // Notify observers
    this.onLogout.next();
    if (tokenRemoved) {
      this.onAuthTokenChange.next(undefined);
    }

  }

  /**
   * Load a account by pubkey
   * @param pubkey
   */
  public async loadAccount(pubkey: string, options?: WatchFetchOptions): Promise<Account | undefined> {

    if (this._debug) console.debug("[account-service] Loading account {" + pubkey.substring(0, 6) + "}...");
    const account = new Account();

    // Get sources
    const sources = await this.duniter.sourcesOfPubkey(pubkey, options).toPromise();
    console.log("Source account=", sources);

    return account;
  }

  /**
   * Create or update an user account
   * @param account
   * @param keyPair
   */
  public async saveAccount(account: Account, keyPair: KeyPair): Promise<Account> {
    account.pubkey = account.pubkey || base58.encode(keyPair.publicKey);

    const isNew = !account.id && account.id !== 0;

    // If this is an update: get existing account's updateDate, to avoid 'version error' when saving
    if (!isNew) {
      const existingAccount = await this.loadAccount(account.pubkey, { fetchPolicy: 'network-only' });
      if (!existingAccount) {
        throw { code: ErrorCodes.ACCOUNT_NOT_EXISTS, message: "ERROR.ACCOUNT_NOT_EXISTS" };
      }
    }

    const json = account.asObject();

    // User not allow to change his profiles
    delete json.profiles;
    delete json.mainProfile; // Not known on server

    // Execute mutation
  /*const res = await this.graphql.mutate<{ saveAccount: any }>({
      mutation: SaveAccountMutation,
      variables: {
        account: json
      },
      error: {
        code: -1, // TODO ErrorCodes.SAVE_ACCOUNT_ERROR,
        message: "ERROR.SAVE_ACCOUNT_ERROR"
      }
    });

    const savedAccount = res && res.saveAccount;

    // Copy update properties
    account.id = savedAccount && savedAccount.id || account.id;
    account.updateDate = savedAccount && savedAccount.updateDate || account.updateDate;
    account.settings.id = savedAccount && savedAccount.settings && savedAccount.settings.id || account.settings.id;
    account.settings.updateDate = savedAccount && savedAccount.settings && savedAccount.settings.updateDate || account.settings.updateDate;
    */

    return account;
  }

  authenticateAndGetToken(token?: string): Promise<string> {
    if (!this.data.pubkey) throw new Error("User not logged");
    if (this._debug) console.debug("[account] Authenticating on server...");
    return this.duniter.authenticateAndGetToken(token);
  }

  get additionalAccountFields(): AccountFieldDef[] {
    return this._additionalAccountFields;
  }

  getAdditionalAccountField(name: string): AccountFieldDef | undefined {
    return this._additionalAccountFields.find(f => f.name === name);
  }

  addAdditionalAccountField(field: AccountFieldDef) {
    if (!!this._additionalAccountFields.find(f => f.name === field.name)) {
      throw new Error("Additional account field {" + field.name + "} already define.");
    }
    if (this._debug) console.debug("[account] Adding additional account field {" + field.name + "}", field);
    this._additionalAccountFields.push(field);
  }



  /* -- Protected methods -- */

}
