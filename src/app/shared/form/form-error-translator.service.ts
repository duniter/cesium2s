import { changeCaseToUnderscore, isEmptyArray, isNil } from '../functions';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AbstractControl } from '@angular/forms';
import { FormErrors } from './form-errors';
import { SharedValidators } from './form-validators';
import { ObjectMap } from '../types';
import { FormErrorUtils } from '@app/shared/form/form-errors';

export const APP_FORM_ERROR_I18N_KEYS = new InjectionToken<ObjectMap<string>>('appFormErrorKeys');

export interface IFormPathTranslator {
  /**
   * Translate a path on a form, into an i18n string
   * @param path
   */
  translateFormPath: (path: string) => string;
}

export interface FormErrorTranslatorOptions {
  i18nPrefix?: string;
  pathTranslator?: IFormPathTranslator;
  separator?: string;
  recursive?: boolean;
}

@Injectable({ providedIn: 'root' })
export class FormErrorTranslator implements IFormPathTranslator {
  private readonly errorI18nKeys: ObjectMap<string>;

  constructor(
    private translate: TranslateService,
    @Optional() @Inject(APP_FORM_ERROR_I18N_KEYS) errorI18nKeys: ObjectMap<string>
  ) {
    this.errorI18nKeys = {
      ...SharedValidators.I18N_ERROR_KEYS,
      ...errorI18nKeys,
    };
  }

  translateFormErrors(control: AbstractControl, opts?: FormErrorTranslatorOptions): string {
    if (!control || !control.invalid) return '';

    const separator = (opts && opts.separator) || ', ';
    const recursive = !opts || opts.recursive !== false;
    const errors = FormErrorUtils.getFormErrors(control, { recursive });
    return (
      errors &&
      Object.keys(errors).reduce((res, path) => {
        const childControl = control.get(path);
        // Should be a control map of errors
        if (childControl) {
          // Try to convert the control path
          const i18nPath = this.translateFormPath(path, opts);

          // OK, we have a field name: use it
          const columnErrors = Object.keys(childControl.errors).map((errorKey) => this.translateError(errorKey, childControl.errors[errorKey]));
          if (isEmptyArray(columnErrors)) return res;
          // Add separator
          if (res.length) res += separator;
          return res + i18nPath + ': ' + columnErrors.join(separator);
        }

        // Or try as global form error
        const formError = this.translateError(path, errors[path]);
        if (isNil(formError)) return res;
        return res + (res.length ? separator : '') + formError;
      }, '')
    );
  }

  translateErrors(errors: FormErrors, opts?: FormErrorTranslatorOptions): string {
    const separator = (opts && opts.separator) || ', ';
    return (
      errors &&
      Object.keys(errors).reduce((res, path) => {
        const pathErrors = errors[path];
        // Should be a control map of errors

        if (pathErrors) {
          // Try to convert the control path
          const i18nPath = this.translateFormPath(path, opts);

          // OK, we have a field name: use it
          const columnErrors = Object.keys(pathErrors).map((errorKey) => this.translateError(errorKey, pathErrors[errorKey]));
          if (isEmptyArray(columnErrors)) return res;
          // Add separator
          if (res.length) res += separator;
          return res + i18nPath + ': ' + columnErrors.join(separator);
        }

        // Or try as global form error
        const formError = this.translateError(path, pathErrors);
        if (isNil(formError)) return res;
        return res + (res.length ? separator : '') + formError;
      }, '')
    );
  }

  translateFormPath(path: string, opts?: FormErrorTranslatorOptions): string {
    if (opts?.pathTranslator) {
      return opts?.pathTranslator.translateFormPath(path);
    }
    const i18nKey = ((opts && opts.i18nPrefix) || '') + changeCaseToUnderscore(path).toUpperCase();
    return this.translate.instant(i18nKey);
  }

  translateError(errorKey: string, errorContent?: any) {
    const i18nKey =
      this.errorI18nKeys[errorKey] ||
      // Try to generate a standard error key, like 'ERROR.FIELD_xxx_xxx'
      'ERROR.FIELD_' + changeCaseToUnderscore(errorKey).toUpperCase();

    let i18nMessage = this.translate.instant(i18nKey, errorContent);
    if (i18nKey !== i18nMessage) return i18nMessage;

    // Try to use the error content, as an i18n key
    if (typeof errorContent === 'string') {
      i18nMessage = this.translate.instant(errorContent);
      if (errorContent !== i18nMessage) return i18nMessage;
    }

    // Not translated: show error
    console.error(
      `[form-error-adapter] Cannot translate error key '${errorKey}'. Please add more formErrorsKey into APP_FORM_ERROR_I18N_KEYS injection token`
    );

    return errorKey;
  }
}
