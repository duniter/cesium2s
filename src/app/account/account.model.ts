import {KeypairType} from "@polkadot/util-crypto/types";
import {HexString} from "@polkadot/util/types";
import {InjectionToken} from "@angular/core";
import {ListItem} from "@app/shared/popover/list.popover";

export interface Account {
  address: string;
  default?: boolean;
  type?: KeypairType;
  meta: AccountMeta;
  data?: AccountData;
}
export interface AccountMeta {
  name: string;
  genesisHash?: HexString | null;

  // Extends meta
  publicKeyV1?: string;
  uid?: string;
  avatar?: string;
  email?: string;

  [key: string]: unknown;
}

export interface Tx {
  // TODO
}

export interface AccountData {
  randomId?: string;
  free?: number;
  reserved?: number;
  feeFrozen?: number;

  txs: Tx[];
}


export class AccountUtils {
  static getBalance(account: Partial<Account>): number {
    if (!account?.data) return undefined; // Data not loaded. This should be done by the account service
    return (account.data.free || 0) + (account.data.reserved || 0);
  }
}

export interface UnlockOptions {
  title?: string;
  expectedCode?: string;
  minLength?: number;
  maxLength?: number;
}

export interface SelectAccountOptions {
  minBalance?: number;
  showBalance?: boolean;
  positiveBalanceFirst?: boolean;
}
export declare type LoginEvent = MouseEvent | TouchEvent | PointerEvent | CustomEvent;

export declare type LoginMethodType = 'v1' | 'v2' | 'keyfile-v1';
export const LoginMethods: ListItem[] = [
  {value: 'v1', label: 'LOGIN.METHOD.SCRYPT_DEFAULT'},
  {value: 'v2', label: 'LOGIN.METHOD.MNEMONIC'},
  {value: 'pubkey-v1', label: 'LOGIN.METHOD.PUBKEY'},
  {value: 'address', label: 'LOGIN.METHOD.ADDRESS'},
  {value: 'keyfile-v1', label: 'LOGIN.METHOD.FILE', disabled: true}
];

export interface LoginOptions {
  loginMethod?: LoginMethodType,
  auth?: boolean,
  redirectToWalletPage?: boolean
}

export interface IAuthController {
  login(event?: LoginEvent, opts?: LoginOptions): Promise<Account>;
  createNew(opts?: {redirectToWalletPage?: boolean}): Promise<Account>;
  unlock(opts?: UnlockOptions): Promise<string>;
  selectAccount(opts?: SelectAccountOptions): Promise<Account>;
}



export const APP_AUTH_CONTROLLER = new InjectionToken<IAuthController>('AuthController');


export interface AuthData {
  address?: string;
  password?: string;

  v1?: {
    salt: string;
    password: string;
  };

  v2?: {
    mnemonic: string;
  };

  meta?: AccountMeta;
}
