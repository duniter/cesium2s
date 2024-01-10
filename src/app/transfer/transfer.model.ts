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

export class TransferComparators {
  static sortByBlockAsc(t1: Transfer, t2: Transfer): number {
    return t1.blockNumber === t2.blockNumber ? 0 : t1.blockNumber > t2.blockNumber ? 1 : -1;
  }

  static sortByBlockDesc(t1: Transfer, t2: Transfer): number {
    return -1 * TransferComparators.sortByBlockAsc(t1, t2);
  }
}

export interface TransferSearchFilter {
  address?: string;
  amount?: string;
}

export class TransferSearchFilterUtils {
  static isEquals(f1: TransferSearchFilter, f2: TransferSearchFilter) {
    return f1 === f2 || equals(f1, f2);
  }

  static isEmpty(filter: TransferSearchFilter) {
    return !filter || (isNil(filter.amount) && isNilOrBlank(filter.address));
  }
}
