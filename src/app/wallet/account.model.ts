import {KeypairType} from "@polkadot/util-crypto/types";
import {Option, u64} from "@polkadot/types-codec";
import {H256} from "@polkadot/types/interfaces/runtime";

export interface Account {
  address: string;
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
