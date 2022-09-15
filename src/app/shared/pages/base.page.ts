import {ChangeDetectorRef, Directive, inject, Injector, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SettingsService} from "@app/settings/settings.service";
import {changeCaseToUnderscore, isNotNilOrBlank} from "@app/shared/functions";
import {environment} from "@environments/environment";
import {waitIdle} from "@app/shared/forms";
import {WaitForOptions} from "@app/shared/observables";
import {IonRouterOutlet, ToastController, ToastOptions} from "@ionic/angular";
import {TranslateService} from "@ngx-translate/core";
import {Subscription} from "rxjs";

export interface BasePageOptions {
  name: string;
  loadDueTime: number;
}

@Directive()
export abstract class BasePage<
  S,
  O extends BasePageOptions = BasePageOptions
  >
  implements OnInit, OnDestroy {

  private _cd: ChangeDetectorRef;
  private _subscription: Subscription;

  protected translate: TranslateService;
  protected settings: SettingsService;
  protected readonly routerOutlet: IonRouterOutlet | null;
  protected readonly activatedRoute: ActivatedRoute;
  protected toastController: ToastController;
  protected readonly _debug = !environment.production;
  protected readonly _logPrefix: string;
  protected readonly _options: O;
  protected _presentingElement: Element = null;

  mobile: boolean = null;
  error: string = null;
  loading = true;
  data: S = null;

  get loaded(): boolean {
    return !this.loading;
  }

  protected constructor(
    injector: Injector,
    options?: Partial<O>
  ) {
    this._cd = injector.get(ChangeDetectorRef);
    this.settings = injector.get(SettingsService);
    this.translate = injector.get(TranslateService);
    this.routerOutlet = injector.get(IonRouterOutlet, null);
    this.activatedRoute = injector.get(ActivatedRoute);
    this.toastController = injector.get(ToastController);
    this.mobile = this.settings.mobile;
    this._options = <O>{
      name: options?.name || changeCaseToUnderscore(this.constructor.name).replace(/_/g, '-'),
      loadDueTime: 0,
      ...options
    };
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

      this.data = await this.ngOnLoad();

      this.markForCheck();
      this.markAsLoaded();
    }
    catch (err) {
      this.setError(err);
      this.markAsLoaded();
    }
  }

  protected abstract ngOnLoad(): Promise<S>;

  protected setError(err, opts =  {emitEvent: true}) {
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

}
