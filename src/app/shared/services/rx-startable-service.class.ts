import { Directive, Optional } from '@angular/core';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';
import { RxBaseService, RxBaseServiceOptions } from '@app/shared/services/rx-service.class';
import { IStartableService, IWithReadyService, ReadyAsyncFunction } from '@app/shared/services/service.model';

export interface RxStartableServiceOptions<T extends object = Object> extends RxBaseServiceOptions<T> {}

@Directive()
export abstract class RxStartableService<T extends object = Object, O extends RxStartableServiceOptions<T> = RxStartableServiceOptions<T>>
  extends RxBaseService<T, O>
  implements IStartableService<T>
{
  startSubject = new Subject<T>();
  stopSubject = new Subject<void>();

  protected _startByReadyFunction = true; // should start when calling ready() ?
  protected _debug: boolean = false;

  private _started = false;
  private _startPromise: Promise<T> = null;
  private _startPrerequisite: ReadyAsyncFunction;

  get started(): boolean {
    return this._started;
  }

  get starting(): boolean {
    return !!this._startPromise;
  }

  protected constructor(@Optional() prerequisiteService?: IWithReadyService, options?: O) {
    super(options);
    this._startPrerequisite = prerequisiteService ? () => prerequisiteService.ready() : () => Promise.resolve();
  }

  start(): Promise<T> {
    if (this._startPromise) return this._startPromise;
    if (this._started) return Promise.resolve(this.data);

    this._startPromise = this._startPrerequisite()
      .then(() => this.ngOnStart())
      .then((data) => {
        this._started = true;
        this._startPromise = undefined;

        this.set(data || (null as T));
        this.startSubject.next(data);

        return data;
      })
      .catch((err) => {
        console.error('Failed to start a service: ' + ((err && err.message) || err), err);
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
    } catch (err) {
      console.error('Failed to stop a service: ' + ((err && err.message) || err), err);
    } finally {
      this.stopSubject.next();
      this.set(null);
      this._started = false;
      this._startPromise = undefined;
    }
  }

  async restart(): Promise<T> {
    if (this._startPromise) await this._startPromise; // Wait end of previous loading
    if (this._started) await this.stop(); // Then stop if started
    return this.start(); // Then start again
  }

  ready(): Promise<T> {
    if (this._started) return Promise.resolve(this.get());
    if (this._startPromise) return this._startPromise;
    if (this._startByReadyFunction) return this.start();
    return firstValueFrom(this.startSubject.pipe(takeUntil(this.stopSubject)));
  }

  protected async ngOnStop(): Promise<void> {
    // Can be overwritten by subclasses
  }

  protected abstract ngOnStart(): Promise<T>;
}
