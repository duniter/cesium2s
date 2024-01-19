import { InjectionToken } from '@angular/core';
import { Account } from '@app/account/account.model';
import { Moment } from 'moment/moment';
import { equals, isNil, isNilOrBlank } from '@app/shared/functions';

export interface TransferFormOptions {
  account?: Account;
  recipient?: Partial<Account>;
  amount?: number;
  fee?: number;
  modal?: boolean;
}

export interface ITransferController {
  /**
   * Call the transfer page
   *
   * @param {TransferFormOptions} opts - The options for the transfer form.
   * @return {Promise<string>} A promise that resolves to a string representing the transaction hash
   */
  transfer(opts?: TransferFormOptions): Promise<string>;
}

export const APP_TRANSFER_CONTROLLER = new InjectionToken<ITransferController>('TransferController');

export interface Transfer {
  id: string;
  from: Account;
  to: Account;
  account: Account; // from or to
  timestamp: Moment;
  amount: number;
  blockNumber: number;
}

export interface TransferSearchFilter {
  address: string;
  amount?: string;
}

export class TransferSearchFilterUtils {
  static isEquals(f1: TransferSearchFilter, f2: TransferSearchFilter) {
    return f1 === f2 || equals(f1, f2);
  }

  static isEmpty(filter: TransferSearchFilter) {
    return !filter || (isNilOrBlank(filter.address) && isNil(filter.amount));
  }
}
