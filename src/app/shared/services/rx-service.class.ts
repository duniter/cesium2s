import { Subscription } from 'rxjs';
import { environment } from '@environments/environment';
import { OnDestroy } from '@angular/core';
import { RxState } from '@rx-angular/state';

export interface RxBaseServiceOptions<T extends object> {
  name?: string;
  initialState?: T;
}

export abstract class RxBaseService<
    T extends object = Object,
    O extends RxBaseServiceOptions<T> = RxBaseServiceOptions<T>
  >
  extends RxState<T>
  implements OnDestroy
{
  private _subscription: Subscription = null;

  protected readonly _debug: boolean;
  protected readonly _logPrefix: string = null;

  get data(): T {
    return this.get();
  }

  protected constructor(protected options?: O) {
    super();

    if (options?.initialState) {
      this.set(options.initialState);
    }

    this._debug = !environment.production;
    this._logPrefix = `[${options?.name || 'base-service'}] `;
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
