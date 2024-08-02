import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, UntypedFormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { equals, isNotNil } from '../functions';
import { FormErrorTranslator, FormErrorTranslatorOptions } from '@app/shared/form/form-error-translator.service';

@Pipe({
  name: 'formError',
  pure: false,
})
export class FormErrorPipe implements PipeTransform, OnDestroy {
  private _value = '';

  private _lastForm: UntypedFormGroup | null = null;
  private _lastOptions: FormErrorTranslatorOptions | null = null;
  private _onFormStatusChanges: Subscription | undefined;

  constructor(
    private service: FormErrorTranslator,
    private _ref: ChangeDetectorRef
  ) {}

  transform(form: UntypedFormGroup, opts?: FormErrorTranslatorOptions): string {
    if (!form) {
      this._dispose();
      return '';
    }

    // if we ask another time for the same form and opts, return the last value
    if (form === this._lastForm && equals(opts, this._lastOptions)) {
      return this._value;
    }

    // store the query, in case it changes
    this._lastForm = form;

    // store the params, in case they change
    this._lastOptions = opts;

    // set the value
    this._updateValue(form, opts);

    // if there is a subscription to onLangChange, clean it
    this._dispose();

    // subscribe to onTranslationChange event, in case the translations change
    if (!this._onFormStatusChanges) {
      this._onFormStatusChanges = form.statusChanges.subscribe((status) => {
        this._updateValue(form, opts, status);
      });
    }

    return this._value;
  }

  ngOnDestroy(): void {
    this._dispose();
  }

  private _updateValue(form: UntypedFormGroup, opts?: FormErrorTranslatorOptions, status?: any) {
    // Form is invalid: compute error
    if (status ? status === 'INVALID' : form.invalid) {
      const newValue = this.service.translateFormErrors(form, opts);
      if (newValue !== this._value) {
        this._value = newValue;
        this._ref.markForCheck();
      }
    }
    // For is valid (or pending): clean if need
    else if (this._value !== undefined) {
      this._value = undefined;
      this._ref.markForCheck();
    }
  }

  /**
   * Clean any existing subscription to change events
   */
  private _dispose(): void {
    this._onFormStatusChanges?.unsubscribe();
    this._onFormStatusChanges = undefined;
  }
}

@Pipe({
  name: 'formGet',
})
export class FormGetPipe implements PipeTransform {
  transform(form: AbstractControl, path: Array<string | number> | string): AbstractControl {
    return form.get(path);
  }
}

@Pipe({
  name: 'formGetControl',
})
export class FormGetControlPipe implements PipeTransform {
  transform(form: AbstractControl, path?: Array<string | number> | string): FormControl {
    return ((form && path && form.get(path)) || form) as FormControl;
  }
}

@Pipe({
  name: 'formGetArray',
})
export class FormGetArrayPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform<TControl extends AbstractControl<any> = any>(form: AbstractControl, path?: Array<string | number> | string): FormArray<TControl> {
    return (form && isNotNil(path) ? form.get(path) : form) as FormArray<TControl>;
  }
}

@Pipe({
  name: 'formGetGroup',
})
export class FormGetGroupPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform<TControl extends { [K in keyof TControl]: AbstractControl<any> } = any>(
    form: AbstractControl,
    path?: Array<string | number> | string
  ): FormGroup<TControl> {
    return (form && isNotNil(path) ? form.get(path) : form) as FormGroup<TControl>;
  }
}

@Pipe({
  name: 'formGetValue',
  pure: false,
})
export class FormGetValuePipe implements PipeTransform, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _value: any = undefined;
  private _lastControl: AbstractControl | null = null;
  private _lastPath: Array<string | number> | string;
  private _onControlValueChanges: Subscription | undefined;
  private _onControlStatusChanges: Subscription | undefined;

  constructor(private _ref: ChangeDetectorRef) {}

  transform<T>(form: AbstractControl, path?: Array<string | number> | string, listenStatusChanges = false): T {
    if (!form) {
      this._dispose();
      return undefined;
    }

    // if we ask another time for the same form and opts, return the last value
    if (form === this._lastControl && equals(path, this._lastPath)) {
      return this._value;
    }

    // store the query, in case it changes
    this._lastControl = form;

    // store the params, in case they change
    this._lastPath = path;

    // set the value
    const control = path ? form.get(path) : form;
    this._value = control?.value;

    // if there is already a subscription, clean it
    this._dispose();

    if (control) {
      // subscribe to valueChanges event
      this._onControlValueChanges = control.valueChanges.subscribe((value) => {
        if (value !== this._value) {
          this._value = value;
          this._ref.markForCheck();
        }
      });

      // subscribe to statusChanges event
      if (listenStatusChanges) {
        this._onControlStatusChanges = control.statusChanges.subscribe(() => {
          const value = control.value;
          if (value !== this._value) {
            this._value = value;
            this._ref.markForCheck();
          }
        });
      }
    }

    return this._value;
  }

  ngOnDestroy(): void {
    this._dispose();
  }

  /**
   * Clean any existing subscription to change events
   */
  private _dispose(): void {
    this._onControlValueChanges?.unsubscribe();
    this._onControlValueChanges = undefined;
    this._onControlStatusChanges?.unsubscribe();
    this._onControlStatusChanges = undefined;
  }
}
