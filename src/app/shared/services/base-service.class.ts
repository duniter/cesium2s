import {Subscription} from 'rxjs';
import {environment} from "../../../environments/environment";

export interface IBaseServiceOptions {
  name?: string;
}

export abstract class BaseService<O extends IBaseServiceOptions = IBaseServiceOptions> {

  private _subscription: Subscription = null;

  protected readonly _debug: boolean;
  protected readonly _logPrefix: string = null;

  protected constructor(
    protected options?: O
  ) {
    this._debug = !environment.production;
    this._logPrefix = `[${options?.name || 'base-service'}] `;
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

  protected debug(msg, ...params: any[]) {
    if (!this._debug) return;
    if (params?.length) console.debug(this._logPrefix + msg, ...params);
    else console.debug(this._logPrefix + msg)
  }

  protected log(msg, ...params: any[]) {
    if (!this._debug) return;
    if (params?.length) console.log(this._logPrefix + msg, params);
    else console.log(this._logPrefix + msg)
  }
}
