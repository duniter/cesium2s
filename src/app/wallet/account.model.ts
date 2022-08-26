import {KeypairType} from "@polkadot/util-crypto/types";

export interface Account {
  address: string;
  publicKey?: string;
  default?: boolean;
  type?: KeypairType;
  meta: AccountMeta;

  data?: AccountData;
}
export interface AccountMeta {
  name: string;
  genesisHash?: string;

  // Extends meta
  uid?: string;
  avatar?: string;
  email?: string;
}

export interface AccountData {
  randomId?: string;
  free?: number;
  reserved?: number;
  feeFrozen?: number;
}


export class AccountUtils {
  static getBalance(account: Partial<Account>): number {
    if (!account?.data) return undefined; // Data not loaded. This should be done by the account service
    return (account.data.free || 0) + (account.data.reserved || 0);
  }
}
