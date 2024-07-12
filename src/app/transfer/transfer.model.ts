import { InjectionToken } from '@angular/core';
import { Account, parseAddressSquid } from '@app/account/account.model';
import { Moment } from 'moment/moment';
import { equals, isNil, isNilOrBlank } from '@app/shared/functions';
import { TransferFragment } from '@app/network/indexer/indexer-types.generated';
import { fromDateISOString } from '@app/shared/dates';
import { AccountConverter } from '@app/account/account.converter';

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

export class TransferConverter {
  static toTransfers(accountAddress: string, inputs: TransferFragment[], debug?: boolean): Transfer[] {
    const results = (inputs || []).map((item) => this.toTransfer(accountAddress, item));
    if (debug) console.debug('Results:', results);
    return results;
  }

  static toTransfer(accountAddress: string, item: TransferFragment): Transfer {
    let from: Account = null;
    let to: Account = null;
    let amount: number;

    // We need to convert base64 json from squid to ss58 address
    const fromAddress = parseAddressSquid(item.from?.id).address;
    const toAddress = parseAddressSquid(item.to?.id).address;
    // Account is the issuer
    if (fromAddress === accountAddress) {
      to = AccountConverter.squidToAccount(item.to);
      amount = -1 * item.amount;
    } else if (toAddress === accountAddress) {
      from = AccountConverter.squidToAccount(item.from);
      amount = item.amount;
    }
    return <Transfer>{
      id: item.id,
      from,
      to,
      account: from || to,
      amount,
      blockNumber: item.blockNumber,
      timestamp: fromDateISOString(item.timestamp),
    };
  }
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
