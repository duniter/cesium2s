import { InjectionToken } from '@angular/core';
import { Account } from '@app/account/account.model';

export interface TransferFormOptions {
  account?: Account;
  recipient?: Partial<Account>;
  amount?: number;
  fee?: number;
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
