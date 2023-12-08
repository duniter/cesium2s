import { Subscription } from 'rxjs';
import { environment } from '@environments/environment';
import { OnDestroy } from '@angular/core';

export interface BaseServiceOptions {
  name?: string;
}

export abstract class BaseService<O extends BaseServiceOptions = BaseServiceOptions> implements OnDestroy {
  private _subscription: Subscription = null;

  protected readonly _debug: boolean;
  protected readonly _logPrefix: string = null;

  protected constructor(protected options?: O) {
    this._debug = !environment.production;
    this._logPrefix = `[${options?.name || 'base-service'}] `;
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
