import { ChangeDetectorRef, Directive, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SettingsService } from '@app/settings/settings.service';
import { changeCaseToUnderscore, isNotNilOrBlank, sleep } from '@app/shared/functions';
import { environment } from '@environments/environment';
import { waitForFalse, WaitForOptions } from '@app/shared/observables';
import { IonRouterOutlet, NavController, ToastController, ToastOptions } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable, Subscription } from 'rxjs';
import { RxState } from '@rx-angular/state';
import { RxStateProperty, RxStateRegister, RxStateSelect } from '@app/shared/decorator/state.decorator';
import { FormGroup } from '@angular/forms';
import { ContextService } from '@app/shared/services/storage/context.service';
import { AppError } from '@app/shared/types';
import { logPrefix } from '@app/shared/logs';
import { setTimeout } from '@rx-angular/cdk/zone-less/browser';

export interface AppPageState {
  error: string;
  loading: boolean;
  form: FormGroup;
}

export interface AppPageOptions<S extends AppPageState = AppPageState> {
  name: string;
  loadDueTime: number;
  initialState?: Partial<S>;
}

@Directive()
export abstract class AppPage<S extends AppPageState = AppPageState, O extends AppPageOptions<S> = AppPageOptions<S>> implements OnInit, OnDestroy {
  private _subscription = new Subscription();
  private _form: FormGroup;
  private _cd = inject(ChangeDetectorRef, { optional: true });
  private _toastById = new Map<string, HTMLIonToastElement>();

  protected translate = inject(TranslateService);
  protected settings = inject(SettingsService);
  protected readonly routerOutlet = inject(IonRouterOutlet, { optional: true });
  protected readonly activatedRoute = inject(ActivatedRoute);
  protected readonly navController = inject(NavController);
  protected readonly context = inject(ContextService);
  protected toastController = inject(ToastController);
  @RxStateRegister() protected readonly _state: RxState<S> = inject(RxState<S>, { optional: true });

  protected readonly _debug = !environment.production;
  protected readonly _logPrefix: string;
  protected readonly _options: O;
  protected _presentingElement: HTMLElement = null;

  readonly mobile: boolean;

  @RxStateProperty() error: string;
  @RxStateProperty() loading: boolean;

  @RxStateSelect() error$: Observable<string>;
  @RxStateSelect() loading$: Observable<boolean>;

  loaded$ = this._state?.select('loading').pipe(map((value) => value === false));

  get loaded(): boolean {
    return !this.loading;
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

  get canGoBack(): boolean {
    return this.routerOutlet?.canGoBack() || false;
  }

  get showMenuButton(): boolean {
    return !this.canGoBack;
  }

  protected constructor(options?: Partial<O>, form?: FormGroup) {
    this.mobile = this.settings.mobile;
    this._options = <O>{
      name: options?.name || changeCaseToUnderscore(this.constructor.name).replace(/_/g, '-'),
      loadDueTime: 0,
      ...options,
      initialState: {
        ...options?.initialState,
        loading: true,
        error: null,
      },
    };

    if (form) this.setForm(form);

    // Init state
    if (this._state && this._options?.initialState) {
      this._state.set(this._options.initialState);
    }

    // Log
    this._logPrefix = logPrefix(this.constructor, this._options);
  }

  ngOnInit() {
    // Get modal presenting element (iOS only)
    this._presentingElement = this.mobile ? document.querySelector('.ion-page') : null;

    // Load data
    sleep(this._options.loadDueTime || 0).then(() => this.load());
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
    } catch (err) {
      this.setError(err);
      this.markAsLoaded();
    }
  }

  protected abstract ngOnLoad(): Promise<Partial<S>>;

  protected async unload() {
    try {
      const initialState = await this.ngOnUnload();
      if (initialState) {
        this._state?.set(initialState);
      }
      this.resetError();
    } catch (err) {
      console.error(this._logPrefix + 'Unload page error', err);
      // Continue
    } finally {
      this.resetError();
      this.markAsLoading();
    }
  }

  protected ngOnUnload(): Promise<Partial<S>> {
    const initialState: S = Object.keys(this._state.get()).reduce((res, key) => {
      res[key] = null;
      return res;
    }, {}) as S;
    return Promise.resolve(initialState);
  }

  protected setError(err: string | { message: string }, opts = { emitEvent: true, hideDelay: 4000 }) {
    const error = (typeof err === 'object' ? err.message : err) || 'ERROR.UNKNOWN_ERROR';
    this.error = error;
    if (opts.emitEvent !== false) this.markForCheck();

    setTimeout(() => {
      if (this.error === error) this.resetError();
    }, opts.hideDelay);
  }

  protected resetError(opts = { emitEvent: true }) {
    if (this.error) {
      this.error = null;
      if (opts.emitEvent !== false) this.markForCheck();
    }
  }

  protected markAsLoading(opts = { emitEvent: true }) {
    if (!this.loading) {
      this.loading = true;
      if (opts.emitEvent !== false) this.markForCheck();
    }
  }

  protected markAsLoaded(opts = { emitEvent: true }) {
    if (this.loading) {
      this.loading = false;
      if (opts.emitEvent !== false) this.markForCheck();
    }
  }

  protected async waitIdle(opts?: WaitForOptions) {
    return waitForFalse(this.loading$, opts);
  }

  protected markForCheck() {
    this._cd?.markForCheck();
  }

  protected async showToast(opts: ToastOptions & { messageParams?: Object; type?: 'error' | 'info' }) {
    const message = isNotNilOrBlank(opts?.message) ? this.translate.instant(opts.message as string, opts.messageParams) : undefined;
    const color = opts?.type === 'error' ? 'danger' : opts?.type === 'info' ? 'secondary' : undefined;
    if (opts?.id && this._toastById[opts.id]) {
      this._toastById[opts.id].dismiss();
    }
    const toast = await this.toastController.create({
      duration: 2000,
      color,
      ...opts,
      message,
    });
    if (opts?.id) this._toastById[opts.id] = toast;
    await toast.present();

    if (opts?.id) {
      toast.onDidDismiss().then(() => {
        // Forget the toast
        if (this._toastById[opts.id] === toast) {
          this._toastById[opts.id] = null;
        }
      });
    }
  }

  protected async showErrorToast(err: AppError, opts: ToastOptions) {
    await this.showToast({
      message: err?.message,
      type: 'error',
      icon: 'alert',
      swipeGesture: 'vertical',
      duration: 5000, // 5s (longer)
      ...opts,
    });
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
      this._subscription.add(this._form.statusChanges.subscribe(() => this.markForCheck()));
    }
  }
}
