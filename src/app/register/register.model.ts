import {AccountExtendedMeta} from "@app/wallet/account.model";

export interface RegisterData {
  phrase?: string;
  address?: string;
  meta?: AccountExtendedMeta;
}
