import { Subscription } from 'rxjs';
import { environment } from '@environments/environment';
import { Directive, OnDestroy } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { logPrefix } from '@app/shared/logs';

export interface RxBaseServiceOptions<T extends object> {
  name?: string;
  initialState?: Partial<T>;
}

@Directive()
export abstract class RxBaseService<T extends object = Object, O extends RxBaseServiceOptions<T> = RxBaseServiceOptions<T>>
  extends RxState<T>
  implements OnDestroy
{
  private _subscription: Subscription = null;

  protected readonly _debug = !environment.production;
  protected readonly _logPrefix: string;

  get data(): T {
    return this.get();
  }

  protected constructor(protected options?: O) {
    super();

    // Init state
    if (options?.initialState) {
      this.set(options.initialState);
    }

    // Log
    this._logPrefix = logPrefix(this.constructor, options);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
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
