import {ChangeDetectorRef, Directive, inject, InjectFlags, Injector, OnDestroy, OnInit, Optional} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SettingsService} from "@app/settings/settings.service";
import {changeCaseToUnderscore, isNotNilOrBlank} from "@app/shared/functions";
import {environment} from "@environments/environment";
import {waitIdle} from "@app/shared/forms";
import {WaitForOptions} from "@app/shared/observables";
import {IonRouterOutlet, ToastController, ToastOptions} from "@ionic/angular";
import {TranslateService} from "@ngx-translate/core";
import {map, Observable, Subscription} from "rxjs";
import {RxState} from "@rx-angular/state";
import {RxStateProperty, RxStateRegister, RxStateSelect} from "@app/shared/decorator/state.decorator";
import {FormGroup} from "@angular/forms";

export interface AppPageState {
  error: string;
  loading: boolean;
  form: FormGroup;
}

export interface AppPageOptions<S extends AppPageState = AppPageState> {
  name: string;
  loadDueTime: number;
  initialState?: Partial<S>
}

@Directive()
export abstract class AppPage<
  S extends AppPageState = AppPageState,
  O extends AppPageOptions<S> = AppPageOptions<S>
  >
  implements OnInit, OnDestroy {

  private _subscription = new Subscription();
  private _form: FormGroup;
  private _cd = inject(ChangeDetectorRef, {optional: true});

  protected translate = inject(TranslateService);
  protected settings = inject(SettingsService);
  protected readonly routerOutlet = inject(IonRouterOutlet, {optional: true});
  protected readonly activatedRoute = inject(ActivatedRoute);
  protected toastController = inject(ToastController);
  @RxStateRegister() protected readonly _state: RxState<S> = inject(RxState<S>, {optional: true});

  protected readonly _debug = !environment.production;
  protected readonly _logPrefix: string;
  protected readonly _options: O;
  protected _presentingElement: Element = null;

  readonly mobile: boolean;

  @RxStateProperty() error: string;
  @RxStateProperty() loading: boolean

  @RxStateSelect() error$: Observable<string>
  @RxStateSelect() loading$: Observable<boolean>

  get loaded(): boolean {
    return !this.loading;
  }
  get loaded$(): Observable<boolean> {
    return this.loading$.pipe(map(value => value === false));
  }

  get data(): S {
    return this._state.get();
  }
  set data(value: S) {
    this._state.set(value);
  }

  set form(value: FormGroup) {
    this.setForm(value);
  }
  get form(): FormGroup {
    return this._form;
  }

  protected constructor(
    options?: Partial<O>,
    form?: FormGroup
  ) {
    this.mobile = this.settings.mobile;
    this._options = <O>{
      name: options?.name || changeCaseToUnderscore(this.constructor.name).replace(/_/g, '-'),
      loadDueTime: 0,
      ...options,
      initialState: {
        ...options?.initialState,
        loading: true,
        error: null
      }
    };

    if (form) this.setForm(form);

    // Init state
    if (this._options?.initialState && this._state) {
      this._state.set(this._options.initialState);
    }

    // DEV
    this._logPrefix = `[${this._options.name}] `;
  }

  ngOnInit() {

    // Get modal presenting element (iOS only)
    this._presentingElement = this.mobile ? document.querySelector('.ion-page') : null;


    // Load data
    setTimeout(() => this.load(), this._options.loadDueTime || 0);
  }

  ngOnDestroy() {
    console.debug(`${this._logPrefix}Destroy`);
    this._subscription?.unsubscribe();
  }

  protected async load() {
    this.resetError();
    this.markAsLoading();

    try {

      const initialState = await this.ngOnLoad();
      if (initialState) {
        this._state.set(initialState);
      }

      this.markForCheck();
      this.markAsLoaded();
    }
    catch (err) {
      this.setError(err);
      this.markAsLoaded();
    }
  }

  protected abstract ngOnLoad(): Promise<Partial<S>>;

  protected async unload() {
    try {
      const initialState = await this.ngOnUnload();
      if (initialState) {
        this._state.set(initialState);
      }
    }
    catch(err) {
      console.error(this._logPrefix + "Unload page error", err);
      // Continue
    }
    finally {
      this.setError(undefined);
      this.markAsLoading();
    }
  }

  protected ngOnUnload(): Promise<Partial<S>> {
    const initialState: S = Object.keys(this._state.get())
      .reduce((res, key) => {
        res[key] = null;
        return res;
      }, {}) as S;
    return Promise.resolve(initialState);
  }

  protected setError(err: any, opts =  {emitEvent: true}) {
    let message = err?.message || err || 'ERROR.UNKNOWN_ERROR';
    if (!message) {
      console.error(err);
      message = 'ERROR.UNKNOWN_ERROR';
    }
    this.error = message;
    if (opts.emitEvent !== false) this.markForCheck();
  }

  protected resetError(opts ={emitEvent: true}) {
    if (this.error) {
      this.error = null;
      if (opts.emitEvent !== false) this.markForCheck();
    }
  }

  protected markAsLoading(opts =  {emitEvent: true}) {
    if (!this.loading) {
      this.loading = true;
      if (opts.emitEvent !== false) this.markForCheck();
    }
  }

  protected markAsLoaded(opts =  {emitEvent: true}) {
    if (this.loading) {
      this.loading = false;
      if (opts.emitEvent !== false) this.markForCheck();
    }
  }

  protected async waitIdle(opts?: WaitForOptions) {
    return waitIdle(this, opts);
  }

  protected markForCheck() {
    this._cd?.markForCheck();
  }

  protected debug(msg, ...params: any[]) {
    if (!this._debug) return;
    if (params) console.debug(this._logPrefix + msg, params);
    else console.debug(this._logPrefix + msg)
  }

  protected info(msg, ...params: any[]) {
    if (params) console.info(this._logPrefix + msg, params);
    else console.info(this._logPrefix + msg)
  }

  protected log(msg, ...params: any[]) {
    if (!this._debug) return;
    if (params) console.log(this._logPrefix + msg, params);
    else console.log(this._logPrefix + msg)
  }

  protected async showToast(opts: ToastOptions & {messageParams?: any[] }) {
    const message = isNotNilOrBlank(opts?.message) ? this.translate.instant(opts.message as string, opts.messageParams) : undefined;
    const toast = await this.toastController.create({
      duration: 2000,
      ...opts,
      message
    });
    return toast.present();
  }

  protected registerSubscription(sub: Subscription) {
    if (!this._subscription) this._subscription = new Subscription();
    this._subscription.add(sub);
  }

  protected unregisterSubscription(sub: Subscription) {
    this._subscription?.remove(sub);
  }

  setForm(form: FormGroup) {
    if (this._form !== form) {
      this._form = form;
      this._subscription.add(
        this._form.statusChanges.subscribe(status => this.markForCheck()));
    }
  }
}
