import {Optional} from '@angular/core';
import {firstValueFrom, Observable, Subject, takeUntil} from 'rxjs';
import {BaseService, IBaseServiceOptions} from "@app/shared/services/base-service.class";
import {environment} from "@environments/environment";
import {RxStateRegister} from "@app/shared/decorator/state.decorator";
import {RxState} from "@rx-angular/state";
import {ProjectValueFn} from "@rx-angular/state/lib/rx-state.service";

export interface IStartableService<T = any> {
  started: boolean;
  start(): Promise<T>;
  stop(): Promise<void>;
  ready(): Promise<T>;
}

export interface IStartableServiceState {

}
export interface IStartableServiceOptions<T extends IStartableServiceState = IStartableServiceState>
  extends IBaseServiceOptions {

  initialState?: Partial<T>;
}

export abstract class RxStartableService<T extends  IStartableServiceState = IStartableServiceState,
  O extends IStartableServiceOptions<T> = IStartableServiceOptions<T>>
  extends BaseService<O>
  implements IStartableService<T> {

  startSubject = new Subject<T>();
  stopSubject = new Subject<void>();

  @RxStateRegister() protected _state: RxState<T>;
  protected _startByReadyFunction = true; // should start when calling ready() ?
  protected _debug: boolean = false;

  private _started = false;
  private _startPromise: Promise<T> = null;
  private _startPrerequisite: () => Promise<any> = null;

  data$: Observable<T>;
  get data(): T {
    return this._state.get();
  }

  set data(value: T) {
    this._state.set(value);
  }

  protected constructor(
    @Optional() prerequisiteService?: { ready: () => Promise<any> },
    options?: O
  ) {
    super(options);
    this._startPrerequisite = prerequisiteService
      ? () => prerequisiteService.ready()
      : () => Promise.resolve();

    if (options?.initialState) {
      this._state.set(options?.initialState);
    }

    this.data$ = this._state.$;
    this._debug = !environment.production;
  }

  start(): Promise<T> {
    if (this._startPromise) return this._startPromise;
    if (this._started) return Promise.resolve(this.data);

    this._startPromise = this._startPrerequisite()
      .then(() => this.ngOnStart())
      .then(data => {

        this._started = true;
        this._startPromise = undefined;

        this._state.set(data);
        this.startSubject.next(data);

        return data;
      })
      .catch(err => {
        console.error('Failed to start a service: ' + (err && err.message || err), err);
        this._started = false;
        this._startPromise = null;
        return null;
      });
    return this._startPromise;
  }

  async stop() {
    try {
      this.unsubscribe();
      await this.ngOnStop();
    }
    catch (err) {
      console.error('Failed to stop a service: ' + (err && err.message || err), err);
    }
    finally {
      this.stopSubject.next();
      this._state.set(null);
      this._started = false;
      this._startPromise = undefined;
    }
  }

  async restart(): Promise<T> {
    if (this._startPromise) await this._startPromise; // Wait end of previous loading
    if (this._started) await this.stop(); // Then stop if started
    return this.start(); // Then start again
  }

  get started(): boolean {
    return this._started;
  }

  get starting(): boolean {
    return !!this._startPromise;
  }

  ready(): Promise<T> {
    if (this._started) return Promise.resolve(this._state.get());
    if (this._startPromise) return this._startPromise;
    if (this._startByReadyFunction) return this.start();
    return firstValueFrom(this.startSubject
        .pipe(takeUntil(this.stopSubject))
      );
  }

  protected get<K extends keyof T>(key: K): T[K] {
    return this._state.get(key);
  }

  protected set<K extends keyof T, O>(key: K, projectSlice: ProjectValueFn<T, K>): void {
    this._state.set(key, projectSlice);
  }

  protected async ngOnStop(): Promise<void> {
    // Can be overwritten by subclasses
  }

  protected abstract ngOnStart(): Promise<T>;

}
