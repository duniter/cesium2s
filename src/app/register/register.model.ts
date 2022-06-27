import {AccountExtendedMeta} from "@app/wallet/account.model";

export interface RegisterData {
  mnemonic: string;
  password: string;

  meta?: AccountExtendedMeta;
}
