import { HexString } from '@polkadot/util/types';
import { ListItem } from '@app/shared/popover/list.popover';
import { formatAddress } from '@app/shared/currencies';

export interface Account {
  address: string;
  publicKey?: Uint8Array;
  meta?: AccountMeta;
  data?: AccountData;
}

export interface AccountMeta {
  // Polkadot properties
  name: string;
  genesisHash?: HexString | null;
  isTesting?: boolean;

  // Cesium properties
  self?: boolean;
  default?: boolean;
  publicKeyV1?: string;
  uid?: string;
  avatar?: string;
  email?: string;
  isMember?: boolean;

  [key: string]: unknown;
}

export interface AccountData {
  // FIXME
  //randomId?: string;

  free?: number;
  reserved?: number;
  feeFrozen?: number;

  txs?: any[];
}

export class AccountUtils {
  static getBalance(account: Partial<Account>): number {
    if (!account?.data) return undefined; // Data not loaded. This should be done by the account service
    return (account.data.free || 0) + (account.data.reserved || 0);
  }

  static getDisplayName(account: Partial<Account>) {
    return account?.meta?.name || account?.meta?.uid || formatAddress(account?.address) || '';
  }

  static isEquals(a1: Account, a2: Account) {
    return a1 === a2 || (a1 && a1.address && a1.address === a2?.address);
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

export declare type LoginMethodType = 'v1' | 'v2' | 'keyfile-v1';
export const LoginMethods: ListItem[] = [
  { value: 'v1', label: 'LOGIN.METHOD.SCRYPT_DEFAULT' },
  { value: 'v2', label: 'LOGIN.METHOD.MNEMONIC' },
  { value: 'pubkey-v1', label: 'LOGIN.METHOD.PUBKEY' },
  { value: 'address', label: 'LOGIN.METHOD.ADDRESS' },
  { value: 'keyfile-v1', label: 'LOGIN.METHOD.FILE', disabled: true },
];

export interface LoginOptions {
  loginMethod?: LoginMethodType;
  auth?: boolean;
  redirectToWalletPage?: boolean;
}
