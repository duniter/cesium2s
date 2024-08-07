import { HexString } from '@polkadot/util/types';
import { ListItem } from '@app/shared/popover/list.popover';
import { formatAddress } from '@app/shared/currencies';
import { IdentityStatusEnum } from '@app/network/indexer/indexer-types.generated';
import { isEmptyArray } from '@app/shared/functions';
import { combineLoadResults, LoadResult } from '@app/shared/services/service.model';

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

//export declare type IdentityStatus = 'CREATION';

export interface AccountMeta {
  // Polkadot properties
  name: string;
  genesisHash?: HexString | null;
  isTesting?: boolean;

  // Duniter properties
  id?: string;
  index?: number; // member index
  uid?: string;
  createdOn?: number;

  // Cesium properties
  self?: boolean;
  default?: boolean;
  publicKeyV1?: string;
  avatar?: string;
  email?: string;
  isMember?: boolean;
  status?: IdentityStatusEnum;

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
  const decodedArray = JSON.parse(atob(data));
  if (!Array.isArray(decodedArray) || decodedArray.length !== 4) {
    throw new Error('Invalid account data');
  }
  return {
    index: +decodedArray[0],
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
    if (!account) return '';
    return account.meta?.name || account.meta?.uid || formatAddress(account.address) || '';
  }

  static isEquals(a1: Account, a2: Account) {
    return a1 === a2 || (a1 && a1.address && a1.address === a2?.address);
  }

  static mergeAll(accounts: Account[]): Account[] {
    if (isEmptyArray(accounts)) return accounts; // Nothing to merge

    const mapByAddress = {};
    return accounts.reduce((res, item) => {
      const existingItem = mapByAddress[item.address];
      if (existingItem) {
        AccountUtils.merge(existingItem, item);
        return res;
      }
      mapByAddress[item.address] = item;
      return res.concat(item);
    }, []);
  }

  static merge(target: Account, source: Account): Account {
    if (target.address !== source.address) throw new Error('Both account should have same address!');
    if (source.meta) {
      target.meta = { ...source.meta, ...target.meta };
    }
    if (source.data) {
      target.data = { ...source.data, ...target.data };
    }
    return target;
  }

  static combineAccountLoadResults(results: LoadResult<Account>[]): LoadResult<Account> {
    return combineLoadResults(results, { reduce: AccountUtils.mergeAll });
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

export declare type LoginMethodType = 'v1' | 'v2' | 'pubkey-v1' | 'address' | 'keyfile-v1';
export interface LoginMethodItem extends ListItem {
  auth?: boolean;
}

export const LoginMethods: LoginMethodItem[] = [
  { value: 'v1', label: 'LOGIN.METHOD.SCRYPT_DEFAULT', auth: true, icon: 'shuffle' },
  { value: 'v2', label: 'LOGIN.METHOD.MNEMONIC', auth: true, icon: 'infinite' },
  { value: 'pubkey-v1', label: 'LOGIN.METHOD.PUBKEY', auth: false, icon: 'key' },
  { value: 'address', label: 'LOGIN.METHOD.ADDRESS', auth: false, icon: 'key' },
  { value: 'keyfile-v1', label: 'LOGIN.METHOD.FILE', disabled: true, auth: true, icon: 'document-text' },
];

export interface LoginOptions {
  loginMethod?: LoginMethodType;
  auth?: boolean;
  redirectToWalletPage?: boolean;
}
