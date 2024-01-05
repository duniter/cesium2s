import { ChangeDetectorRef, inject, Pipe, PipeTransform } from '@angular/core';
import { Account, AccountUtils } from '@app/account/account.model';
import { equals, getPropertyByPath } from '@app/shared/functions';
import { Subscription } from 'rxjs';
import { formatAddress } from '@app/shared/currencies';
import { AccountsService } from '@app/account/accounts.service';

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

  protected constructor(private _cd: ChangeDetectorRef) {}

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
      this._changesSubscription = this._accountsService.watchByAddress(account.address).subscribe((updatedAccount) => {
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

export declare type AccountPropertyPipeOptions<T> = string | { key?: string; defaultValue?: T };

@Pipe({
  name: 'accountProperty',
  pure: false,
})
export class AccountPropertyPipe<T = never, O extends AccountPropertyPipeOptions<T> = AccountPropertyPipeOptions<T>>
  extends AccountAbstractPipe<T, O>
  implements PipeTransform
{
  constructor(_ref: ChangeDetectorRef) {
    super(_ref);
  }

  protected _transform(account: Partial<Account>, opts?: O): T {
    return getPropertyByPath(
      account,
      // Path
      opts && (typeof opts === 'string' ? opts : opts.key),
      // Default value
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      opts && (opts as any).defaultValue
    );
  }
}

@Pipe({
  name: 'balance',
  pure: false,
})
export class AccountBalancePipe extends AccountAbstractPipe<number, void> implements PipeTransform {
  constructor(_ref: ChangeDetectorRef) {
    super(_ref);
  }

  protected _transform(account: Partial<Account>): number {
    return AccountUtils.getBalance(account);
  }
}

@Pipe({
  name: 'accountName',
  pure: false,
})
export class AccountNamePipe extends AccountAbstractPipe<string, void> implements PipeTransform {
  constructor(cd: ChangeDetectorRef) {
    super(cd);
  }

  protected _transform(account: Partial<Account>): string {
    return account?.meta?.name || formatAddress(account?.address);
  }
}
