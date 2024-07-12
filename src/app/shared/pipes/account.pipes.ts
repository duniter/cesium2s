import { ChangeDetectorRef, inject, Injectable, Pipe, PipeTransform } from '@angular/core';
import { Account, AccountUtils } from '@app/account/account.model';
import { equals, getPropertyByPath } from '@app/shared/functions';
import { Subscription } from 'rxjs';
import { AccountsService, LoadAccountDataOptions } from '@app/account/accounts.service';

export interface AccountAbstractPipeOptions {
  listenChanges?: boolean;
}
// @dynamic
/**
 * A common pipe, that will subscribe to all account changes, to refresh its value
 */
@Injectable()
export abstract class AccountAbstractPipe<T, O extends Object = AccountAbstractPipeOptions> implements PipeTransform {
  private value: T = null;
  private _lastAccount: Partial<Account> | null = null;
  private _lastOptions: O = null;
  private _changesSubscription: Subscription = null;

  protected _accountsService = inject(AccountsService);

  protected constructor(
    private _cd: ChangeDetectorRef,
    private _watchOptions?: LoadAccountDataOptions
  ) {}

  transform(account: Partial<Account>, opts?: O): T {
    // Not a user account (e.g. any wot identity)
    if (!account?.address) {
      this._dispose();
      return this._transform(account, opts);
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

    // subscribe to account changes
    if (!this._changesSubscription && opts?.['listenChanges'] !== false) {
      this._changesSubscription = this._accountsService.watchByAddress(account.address, this._watchOptions).subscribe((updatedAccount) => {
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

export declare type AccountPropertyPipeOptions<T> = string | (AccountAbstractPipeOptions & { key?: string; defaultValue?: T });

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
export class AccountBalancePipe extends AccountAbstractPipe<number> implements PipeTransform {
  constructor(cd: ChangeDetectorRef) {
    super(cd, { withBalance: true });
  }

  protected _transform(account: Partial<Account>): number {
    return AccountUtils.getBalance(account);
  }
}

@Pipe({
  name: 'accountName',
  pure: false,
})
export class AccountNamePipe extends AccountAbstractPipe<string> implements PipeTransform {
  constructor(cd: ChangeDetectorRef) {
    super(cd, { withBalance: false });
  }

  protected _transform(account: Partial<Account>): string {
    return AccountUtils.getDisplayName(account);
  }
}

@Pipe({
  name: 'isMemberAccount',
  pure: false,
})
export class IsMemberAccountPipe extends AccountAbstractPipe<boolean> implements PipeTransform {
  constructor(cd: ChangeDetectorRef) {
    super(cd, { withBalance: false, withMembership: true });
  }

  protected _transform(account: Partial<Account>): boolean {
    return (account?.meta && account.meta.isMember === true) || false;
  }
}

@Pipe({
  name: 'isUserAccount',
})
export class IsUserAccountPipePipe implements PipeTransform {
  constructor(private accountsService: AccountsService) {}
  transform(account: Partial<Account>): boolean {
    return account && (account.meta?.self === true || this.accountsService.isAvailableSync(account.address));
  }
}
