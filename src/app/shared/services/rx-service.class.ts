import {OnDestroy, Optional} from '@angular/core';
import {Subject} from 'rxjs';
import {waitFor} from '../observables';
import {BaseService, IBaseServiceOptions} from "@app/shared/services/base-service.class";
import {environment} from "@environments/environment";
import {RxState} from "@rx-angular/state";
import {StartableService} from "@app/shared/services/startable-service.class";
import {Settings} from "@app/settings/settings.model";
import {ProjectValueFn} from "@rx-angular/state/lib/rx-state.service";

export interface IStatefulServiceOptions extends IBaseServiceOptions {
}

export abstract class RxService<T extends object, O extends IStatefulServiceOptions = IStatefulServiceOptions>
  extends StartableService<T, O>
  implements OnDestroy {

  protected readonly _state = new RxState<T>;

  protected get _data(): T {
    return this._state.get();
  }

  protected set _data(value: T) {
    this._state.set((_) => value);
  }

  protected constructor(
    @Optional() prerequisiteService?: { ready: () => Promise<any> },
    options?: O
  ) {
    super(prerequisiteService, options);
  }

  ngOnDestroy() {
    this._state.ngOnDestroy();
    this.unsubscribe();
  }

  protected get<K extends keyof T>(key: K): T[K] {
    return this._state.get(key);
  }

  protected set<K extends keyof T, O>(key: K, projectSlice: ProjectValueFn<T, K>): void {
    this._state.set(key, projectSlice);
  }
}
