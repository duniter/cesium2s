import { HexString } from '@polkadot/util/types';
import { ListItem } from '@app/shared/popover/list.popover';
import { formatAddress } from '@app/shared/currencies';

export interface AddressSquid {
  index: number;
  visibility: string;
  type: string;
  address: string;
}

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

  // Duniter properties
  id?: string;
  index?: number; // member index
  uid?: string;

  // Cesium properties
  self?: boolean;
  default?: boolean;
  publicKeyV1?: string;
  avatar?: string;
  email?: string;
  isMember?: boolean;

  [key: string]: unknown;
}

export interface AccountData {
  free?: number;
  reserved?: number;
  feeFrozen?: number;
  txs?: any[];
}

/**
 * Parse the base64 encoded json data from squid to an AddressSquid object
 */
export function parseAddressSquid(data: string): AddressSquid {
  const decodedArray: any[] = JSON.parse(atob(data));
  if (decodedArray.length !== 4) {
    throw new Error('Invalid account data');
  }
  return {
    index: decodedArray[0] as number,
    visibility: decodedArray[1] as string,
    type: decodedArray[2] as string,
    address: decodedArray[3] as string,
  };
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
  isMember?: boolean;
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
