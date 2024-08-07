import {
  booleanAttribute,
  ChangeDetectorRef,
  Directive,
  EventEmitter,
  inject,
  Input,
  numberAttribute,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { FormUtils } from '@app/shared/forms';
import { WaitForOptions, waitForTrue } from '@app/shared/observables';
import { SettingsService } from '@app/settings/settings.service';
import { environment } from '@environments/environment';
import { logPrefix } from '@app/shared/logs';
import { FormErrorTranslator, FormErrorTranslatorOptions, IFormPathTranslator } from '@app/shared/form/form-error-translator.service';
import { changeCaseToUnderscore } from '@app/shared/functions';

export declare interface OnReady {
  ngOnReady();
}

export interface IAppForm {
  // From Angular form
  invalid: boolean;
  valid: boolean;
  dirty: boolean;
  pending: boolean;
  error: string;
  enabled: boolean;
  disabled: boolean;

  // Specific to IAppForm
  empty?: boolean;
  loading?: boolean;
  ready(): Promise<void>;
  waitIdle(opts?: WaitForOptions): Promise<any>;

  disable(opts?: { onlySelf?: boolean; emitEvent?: boolean });
  enable(opts?: { onlySelf?: boolean; emitEvent?: boolean });

  markAsPristine(opts?: { onlySelf?: boolean; emitEvent?: boolean });
  markAsUntouched(opts?: { onlySelf?: boolean; emitEvent?: boolean });
  markAsTouched(opts?: { onlySelf?: boolean; emitEvent?: boolean });
  markAllAsTouched(opts?: { emitEvent?: boolean });
  markAsDirty(opts?: { onlySelf?: boolean; emitEvent?: boolean });
  markAsLoading(opts?: { onlySelf?: boolean; emitEvent?: boolean });
  markAsLoaded(opts?: { onlySelf?: boolean; emitEvent?: boolean });
  markAsReady(opts?: { onlySelf?: boolean; emitEvent?: boolean });
}

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class AppForm<T> implements IAppForm, IFormPathTranslator, OnInit, OnDestroy {
  private _subscription = new Subscription();

  protected readonly _debug: boolean = !environment.production;
  protected readonly _logPrefix: string;

  protected _form: FormGroup;
  protected _i18nPrefix: string = 'COMMON.';
  protected _cd: ChangeDetectorRef = inject(ChangeDetectorRef);
  protected _enable = false;
  protected ready$ = new BehaviorSubject<boolean>(false);
  protected loading$ = new BehaviorSubject<boolean>(true);

  protected readonly translate: TranslateService = inject(TranslateService);
  protected readonly errorTranslator = inject(FormErrorTranslator);

  @Input({ transform: booleanAttribute }) debug = !environment.production;
  @Input({ transform: booleanAttribute }) mobile: boolean = inject(SettingsService).mobile;
  @Input() errorTranslatorOptions: FormErrorTranslatorOptions;
  @Input({ transform: numberAttribute }) tabindex: number;
  @Input() error: string = null;

  get loading(): boolean {
    return this.loading$.value;
  }

  get value(): T {
    return this.form.value;
  }

  set value(data: T) {
    this.setValue(data);
  }

  get dirty(): boolean {
    return this.form && this.form.dirty;
  }

  get invalid(): boolean {
    return !this.form || this.form.invalid;
  }

  get pending(): boolean {
    return !this.form || (this.form.dirty && this.form.pending);
  }

  get valid(): boolean {
    return this.form && this.form.valid;
  }

  get empty(): boolean {
    return !this.form || (!this.form.dirty && !this.form.touched);
  }

  get untouched(): boolean {
    return !this.form || this.form.untouched;
  }

  get enabled(): boolean {
    return this._enable;
  }

  get disabled(): boolean {
    return !this._enable;
  }

  disable(opts?: { onlySelf?: boolean; emitEvent?: boolean }): void {
    this.form?.disable(opts);
    if (this._enable) {
      this._enable = false;
      if (!opts || opts.emitEvent !== true) this.markForCheck();
    }
  }

  enable(opts?: { onlySelf?: boolean; emitEvent?: boolean }): void {
    this.form?.enable(opts);
    if (!this._enable) {
      this._enable = true;
      if (!opts || opts.emitEvent !== true) this.markForCheck();
    }
  }

  @Input()
  set form(value: FormGroup) {
    this.setForm(value);
  }

  get form(): FormGroup {
    return this._form;
  }

  get statusChanges() {
    return this._form.statusChanges;
  }

  @Output() cancel = new EventEmitter<void>();

  @Output() validate = new EventEmitter<T>();

  protected constructor(
    form?: FormGroup,
    options?: {
      name?: string;
    }
  ) {
    if (form) this.setForm(form);

    // Log
    this._logPrefix = logPrefix(this.constructor, options);
  }

  ngOnInit() {
    // Init defaults
    this.errorTranslatorOptions = this.errorTranslatorOptions || {
      pathTranslator: this, // By default, will use translateFormPath() below to translate a form's path
    };

    if (this._enable) this.enable();
    else this.disable();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
    this.cancel.complete();
    this.cancel.unsubscribe();
    this.validate.complete();
    this.validate.unsubscribe();
    this.ready$.complete();
    this.ready$.unsubscribe();
    this.loading$.complete();
    this.loading$.unsubscribe();
  }

  doCancel() {
    this.cancel.emit();
  }

  /**
   *
   * @param event
   * @param opts allow to skip validation check, using {checkValid: false}
   */
  async doSubmit(event: Event, opts?: { checkValid?: boolean }) {
    if (!this._form) {
      this.markAllAsTouched({ emitEvent: true });
      return;
    }

    // Check if valid (if not disabled)
    if ((!opts || opts.checkValid !== false) && !this._form.valid) {
      // Wait validation end
      await FormUtils.waitWhilePending(this._form);

      // Form is invalid: exit (+ log if debug)
      if (this._form.invalid) {
        this.markAllAsTouched({ emitEvent: true });
        if (this.debug) FormUtils.logErrors(this._form);
        return;
      }
    }

    // Emit event
    this.validate.emit(this._form.value);
  }

  setForm(form: FormGroup) {
    if (this._form !== form) {
      this._form = form;
      this._subscription.add(this._form.statusChanges.subscribe(() => this.markForCheck()));
    }
  }

  setValue(data: T, opts?: { emitEvent?: boolean; onlySelf?: boolean }): Promise<void> | void {
    if (!data) {
      console.warn('[form] Trying to set an empty value to form. Skipping');
      return;
    }

    // DEBUG
    //if (this.debug) console.debug('[form] Updating form (using entity)', data);
    this.form.patchValue(data, { emitEvent: false, ...opts });

    if (!opts || opts.emitEvent !== true) {
      this.markForCheck();
    }
  }

  reset(data?: T, opts?: { emitEvent?: boolean; onlySelf?: boolean }) {
    if (data) {
      if (this.debug) console.debug('[form] Resetting form, using:', data);

      this.form.reset(data, { emitEvent: false, onlySelf: true });
    } else {
      this.form.reset(null, { emitEvent: false, onlySelf: true });
    }

    if (!opts || opts.emitEvent !== true) this.markForCheck();
  }

  markAsPristine(opts?: { onlySelf?: boolean; emitEvent?: boolean }) {
    this.form.markAsPristine(opts);
    if (!opts || opts.emitEvent !== false) this.markForCheck();
  }

  markAsUntouched(opts?: { onlySelf?: boolean; emitEvent?: boolean }) {
    this.form.markAsUntouched(opts);
    if (!opts || opts.emitEvent !== false) this.markForCheck();
  }

  /**
   * @deprecated prefer to use markAllAsTouched()
   * @param opts
   */
  markAsTouched(opts?: { onlySelf?: boolean; emitEvent?: boolean }) {
    // this.form.markAllAsTouched() // This is not working well (e.g. in TripForm)
    console.warn('TODO: Replace this call by markAllAsTouched() - because of changes in ngx-components >= 0.16.0');
    FormUtils.markAsTouched(this.form, opts);
    if (!opts || opts.emitEvent !== false) this.markForCheck();
  }

  markAllAsTouched(opts?: { emitEvent?: boolean }) {
    // this.form.markAllAsTouched() // This is not working well (e.g. in TripForm)
    FormUtils.markAllAsTouched(this.form, opts);
    if (!opts || opts.emitEvent !== false) this.markForCheck();
  }

  markAsDirty(opts?: { onlySelf?: boolean; emitEvent?: boolean }) {
    this.form.markAsDirty(opts);
    if (!opts || opts.emitEvent !== false) this.markForCheck();
  }

  markAsLoading(opts?: { onlySelf?: boolean; emitEvent?: boolean }) {
    if (this.loading$.value !== true) {
      this.loading$.next(true);
      if (!opts || opts.emitEvent !== false) this.markForCheck();
    }
  }

  markAsLoaded(opts?: { onlySelf?: boolean; emitEvent?: boolean }) {
    if (this.loading$.value !== false) {
      this.loading$.next(false);
      if (!opts || opts.emitEvent !== false) this.markForCheck();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  markAsReady(opts?: { onlySelf?: boolean; emitEvent?: boolean }) {
    if (this.ready$.value !== true) {
      this.ready$.next(true);

      // If subclasses implements OnReady
      if (typeof this['ngOnReady'] === 'function') {
        (this as any as OnReady).ngOnReady();
      }
    }
  }

  /**
   * Wait form is ready
   * @param opts
   */
  ready(opts?: WaitForOptions): Promise<void> {
    return waitForTrue(this.ready$, opts);
  }

  /**
   * Wait form is idle (not loading)
   * @param opts
   */
  async waitIdle(opts?: WaitForOptions): Promise<void> {
    return FormUtils.waitIdle(this, opts);
  }

  updateValueAndValidity(opts?: { onlySelf?: boolean; emitEvent?: boolean }) {
    FormUtils.updateValueAndValidity(this.form, opts);
    if (!opts || opts.emitEvent !== false) this.markForCheck();
  }

  translateFormPath(path: string) {
    const i18nFieldName = this.getFormPathI18nKey(path);
    return this.translate?.instant(i18nFieldName) || i18nFieldName;
  }

  /* -- protected methods -- */

  protected getFormError(form: FormGroup, opts?: FormErrorTranslatorOptions): string {
    if (!form || !this.errorTranslator) return undefined;
    return this.errorTranslator.translateFormErrors(this.form, {
      pathTranslator: this,
      ...opts,
    });
  }

  /**
   * Translate path into a i18n key (e.g. 'pubkey' into 'COMMON.PUBKEY')
   * @param path
   * @protected
   */
  protected getFormPathI18nKey(path: string) {
    return (this._i18nPrefix || '') + changeCaseToUnderscore(path).toUpperCase();
  }

  protected registerSubscription(sub: Subscription) {
    this._subscription.add(sub);
  }

  protected unregisterSubscription(sub: Subscription): void {
    this._subscription.remove(sub);
  }

  protected markForCheck() {
    this._cd?.markForCheck();
  }
}
