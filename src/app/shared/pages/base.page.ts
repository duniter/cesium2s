import {ChangeDetectorRef, Directive, inject, Injector, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SettingsService} from "@app/settings/settings.service";
import {changeCaseToUnderscore, isNotNilOrBlank} from "@app/shared/functions";
import {environment} from "@environments/environment";
import {waitIdle} from "@app/shared/forms";
import {WaitForOptions} from "@app/shared/observables";
import {ToastController, ToastOptions} from "@ionic/angular";
import {TranslateService} from "@ngx-translate/core";

@Directive()
export abstract class BasePage<S> implements OnInit {

  private _cd: ChangeDetectorRef;

  protected translate: TranslateService;
  protected settings: SettingsService;
  protected activatedRoute: ActivatedRoute;
  protected toastController: ToastController;
  protected readonly _debug = !environment.production;
  protected readonly _logPrefix: string;

  mobile: boolean = null;
  error: string = null;
  loading = true;
  data: S = null;

  get loaded(): boolean {
    return !this.loading;
  }

  protected constructor(
    injector: Injector, options: {
      name?: string
    }
  ) {
    this._cd = injector.get(ChangeDetectorRef);
    this.settings = injector.get(SettingsService);
    this.translate = injector.get(TranslateService);
    this.activatedRoute = injector.get(ActivatedRoute);
    this.toastController = injector.get(ToastController);
    this.mobile = this.settings.mobile;
    this._logPrefix = options?.name ? `[${options.name}] ` : `[${changeCaseToUnderscore(this.constructor.name).replace(/_/g, '-')}]`;

  }

  ngOnInit() {
    this.load();
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

  protected setError(err) {
    let message = err?.message || err || 'ERROR.UNKNOWN_ERROR';
    if (!message) {
      console.error(err);
      message = 'ERROR.UNKNOWN_ERROR';
    }
    this.error = message;
    this.markForCheck();
  }

  protected resetError() {
    if (this.error) {
      this.error = null;
      this.markForCheck();
    }
  }

  protected markAsLoading() {
    if (!this.loading) {
      this.loading = true;
      this.markForCheck();
    }
  }

  protected markAsLoaded() {
    if (this.loading) {
      this.loading = false;
      this.markForCheck();
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
}
