import {ChangeDetectorRef, Directive, inject, Pipe, PipeTransform} from '@angular/core';
import {NumberFormatPipe} from "@app/shared/pipes/number-format.pipe";
import {NetworkService} from "@app/network/network.service";
import {Account, AccountData, AccountUtils} from "@app/wallet/account.model";
import {equals, getPropertyByPath, isNotNilOrBlank} from "@app/shared/functions";
import {AddressFormatPipe} from "@app/shared/pipes/address.pipes";
import {Subscription} from "rxjs";
import {formatAddress} from "@app/shared/currencies";
import {AccountsService} from "@app/wallet/accounts.service";

// @dynamic
/**
 * A common pipe, that will subscribe to all account changes, to refresh its value
 */
export abstract class AccountAbstractPipe<T = any, O = any> implements PipeTransform {

  private value: T = null;
  private _lastAccount: Partial<Account> | null = null;
  private _lastOptions: O = null;
  private _changesSubscription: Subscription = null;

  protected _accountsService = inject(AccountsService);

  protected constructor(
    private _cd: ChangeDetectorRef
  ) {
  }

  transform(account: Partial<Account>, opts: O): T {
    if (!account?.data) {
      this._dispose();
      return undefined;
    }

    // if we ask another time for the same account and opts, return the last value
    if (account === this._lastAccount && equals(opts, this._lastOptions)) {
      return this.value;
    }

    // store the query, in case it changes
    this._lastAccount = account;

    // store the params, in case they change
    this._lastOptions = opts;

    // set the value
    this._updateValue(account, opts);

    // if there is a subscription to onLangChange, clean it
    this._dispose();

    // subscribe to onTranslationChange event, in case the translations change
    if (!this._changesSubscription) {
      this._changesSubscription = this._accountsService.watchByAddress(account.address)
        .subscribe((updatedAccount) => {
          this.value = this._transform(updatedAccount, opts);
          this._cd.markForCheck();
        });
    }
    return this.value;
  }

  ngOnDestroy(): void {
    this._dispose();
  }

  private _updateValue(account: Partial<Account>, opts?: O) {
    this.value = this._transform(account, opts);
    this._cd.markForCheck();
  }

  protected abstract _transform(account: Partial<Account>, opts?: O): T;

  /**
   * Clean any existing subscription to change events
   */
  private _dispose(): void {
    this._changesSubscription?.unsubscribe();
    this._changesSubscription = undefined;
  }
}

export declare type AccountPropertyPipeOptions<T> = string | {key?: string; defaultValue?: T};

@Pipe({
  name: 'accountProperty',
  pure: false
})
export class AccountPropertyPipe<T = any, O extends AccountPropertyPipeOptions<T> = AccountPropertyPipeOptions<T>> extends AccountAbstractPipe<T, O> {

  constructor(_ref: ChangeDetectorRef) {
    super(_ref);
  }

  protected _transform(account: Partial<Account>, opts?: O): T {
    return getPropertyByPath(account,
      // Path
      opts && (typeof opts === 'string' ? opts : opts.key),
      // Default value
      opts && (opts as any).defaultValue);
  }
}

@Pipe({
  name: 'balance',
  pure: false
})
export class AccountBalancePipe extends AccountAbstractPipe<number, void> {

  constructor(_ref: ChangeDetectorRef) {
    super(_ref);
  }

  protected _transform(account: Partial<Account>): number {
    return AccountUtils.getBalance(account);
  }
}

@Pipe({
  name: 'accountName',
  pure: false
})
export class AccountNamePipe extends AccountAbstractPipe<string, void> {

  constructor(cd: ChangeDetectorRef) {
    super(cd);
  }

  protected _transform(account: Partial<Account>): string {
    return account?.meta?.name || formatAddress(account?.address);
  }
}
