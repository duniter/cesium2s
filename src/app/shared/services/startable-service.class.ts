import {Optional} from '@angular/core';
import {firstValueFrom, Subject, takeUntil} from 'rxjs';
import {waitFor} from '../observables';
import {BaseService, IBaseServiceOptions} from "@app/shared/services/base-service.class";
import {environment} from "@environments/environment";

export interface IStartableService<T = any> {
  started: boolean;
  start(): Promise<T>;
  stop(): Promise<void>;
  ready(): Promise<T>;
}

export interface IStartableServiceOptions extends IBaseServiceOptions {
}

export abstract class StartableService<T = any, O extends IStartableServiceOptions = IStartableServiceOptions>
  extends BaseService<O>
  implements IStartableService<T> {

  startSubject = new Subject<T>();
  stopSubject = new Subject<void>();

  protected _startByReadyFunction = true; // should start when calling ready() ?
  protected _data: T = null;
  protected _debug: boolean = false;

  private _started = false;
  private _startPromise: Promise<T> = null;
  private _startPrerequisite: () => Promise<any> = null;

  protected constructor(
    @Optional() prerequisiteService?: { ready: () => Promise<any> },
    options?: O
  ) {
    super(options);
    this._startPrerequisite = prerequisiteService
      ? () => prerequisiteService.ready()
      : () => Promise.resolve();
    this._debug = !environment.production;
  }

  start(): Promise<T> {
    if (this._startPromise) return this._startPromise;
    if (this._started) return Promise.resolve(this._data);

    this._startPromise = this._startPrerequisite()
      .then(() => this.ngOnStart())
      .then(data => {
        this._data = data;

        this._started = true;
        this._startPromise = undefined;

        this.startSubject.next(this._data);

        return this._data;
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
      this._data = null;
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
    if (this._started) return Promise.resolve(this._data);
    if (this._startPromise) return this._startPromise;
    if (this._startByReadyFunction) return this.start();
    return firstValueFrom(this.startSubject
        .pipe(takeUntil(this.stopSubject))
      );
  }

  protected async ngOnStop(): Promise<void> {
    // Can be overwritten by subclasses
  }

  protected abstract ngOnStart(): Promise<T>;

  ngOnDestroy() {
    this.stop();
    super.ngOnDestroy();
  }
}
