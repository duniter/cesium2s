import { Subscription } from 'rxjs';
import { environment } from '@environments/environment';
import { Directive, OnDestroy } from '@angular/core';
import { logPrefix } from '@app/shared/logs';

export interface BaseServiceOptions {
  name?: string;
}

@Directive()
export abstract class BaseService<O extends BaseServiceOptions = BaseServiceOptions> implements OnDestroy {
  private _subscription: Subscription = null;

  protected readonly _debug = !environment.production;
  protected readonly _logPrefix: string;

  protected constructor(protected options?: O) {
    // Log
    this._logPrefix = logPrefix(this.constructor, options);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  protected registerSubscription(sub: Subscription) {
    this._subscription = this._subscription || new Subscription();
    this._subscription.add(sub);
  }

  protected unregisterSubscription(sub: Subscription) {
    this._subscription.remove(sub);
  }

  protected unsubscribe() {
    this._subscription?.unsubscribe();
    this._subscription = null;
  }
}
