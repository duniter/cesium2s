import {KeypairType} from "@polkadot/util-crypto/types";
import {HexString} from "@polkadot/util/types";

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
