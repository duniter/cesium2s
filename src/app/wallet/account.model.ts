import {KeypairType} from "@polkadot/util-crypto/types";
import {Subject} from "rxjs";

export interface Account {
  address: string;
  publicKey?: string;
  default?: boolean;
  type?: KeypairType;
  meta: AccountMeta;

  data?: AccountData;
  dataSubject?: Subject<AccountData>;
}
export interface AccountMeta {
  name: string;
  genesisHash?: string;

  // Extends meta
  uid?: string;
  avatar?: string;
  email?: string;
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
