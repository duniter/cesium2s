import { AbstractControl, FormControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isMoment, Moment, unitOfTime } from 'moment';
import { ADDRESS_REGEXP, PUBKEY_REGEXP, UID_REGEXP } from '../constants';
import { isEmptyArray, isNil, isNilOrBlank, isNotNil, isNotNilOrBlank, toBoolean } from '../functions';
import { fromDateISOString } from '../dates';

// @dynamic
export class SharedValidators {
  private static _DOUBLE_REGEXP_CACHE = {
    NO_LIMIT: /^-?\d+([.,]\d*)?$/,
    1: /^-?\d+([.,]\d)?$/, // 1 decimal max
    2: /^-?\d+([.,]\d{1,2})?$/, // 2 decimals max
    3: /^-?\d+([.,]\d{1,3})?$/, // 3 decimals max
  };

  private static getDoubleRegexp(maxDecimals: number): RegExp {
    if (isNil(maxDecimals)) return this._DOUBLE_REGEXP_CACHE.NO_LIMIT;

    if (maxDecimals < 0) throw new Error(`Invalid maxDecimals value: ${maxDecimals}`);
    const regexp = this._DOUBLE_REGEXP_CACHE[maxDecimals];
    if (regexp) return regexp;

    // New: add to cache
    this._DOUBLE_REGEXP_CACHE[maxDecimals] = new RegExp(`^-?\\d+([.,]\\d{1,${maxDecimals}})?$`);
    return this._DOUBLE_REGEXP_CACHE[maxDecimals];
  }

  static readonly I18N_ERROR_KEYS = {
    required: 'ERROR.FIELD_REQUIRED',
    min: 'ERROR.FIELD_MIN',
    max: 'ERROR.FIELD_MAX',
    minlength: 'ERROR.FIELD_TOO_SHORT_WITH_LENGTH',
    maxlength: 'ERROR.FIELD_TOO_LONG_WITH_LENGTH',
    accent: 'ERROR.FIELD_ACCENT',
    pubkey: 'ERROR.FIELD_NOT_VALID_PUBKEY',
    address: 'ERROR.FIELD_NOT_VALID_ADDRESS',
    uid: 'ERROR.INVALID_USER_ID',
    date: 'ERROR.FIELD_NOT_VALID_DATE',
    dateIsAfter: 'ERROR.FIELD_NOT_VALID_DATE_AFTER',
    dateIsBefore: 'ERROR.FIELD_NOT_VALID_DATE_BEFORE',
    dateRange: 'ERROR.FIELD_NOT_VALID_DATE_RANGE',
    dateMinDuration: 'ERROR.FIELD_NOT_VALID_DATE_MIN_DURATION',
    dateMaxDuration: 'ERROR.FIELD_NOT_VALID_DATE_MAX_DURATION',
    maxDecimals: 'ERROR.FIELD_MAXIMUM_DECIMALS',
    decimal: 'ERROR.FIELD_NOT_VALID_DECIMAL',
    integer: 'ERROR.FIELD_NOT_INT',
    email: 'ERROR.FIELD_NOT_VALID_EMAIL',
    pattern: 'ERROR.FIELD_NOT_VALID_PATTERN',
    unique: 'ERROR.FIELD_NOT_UNIQUE',
  };

  static empty(control: UntypedFormControl): ValidationErrors | null {
    if (isNotNilOrBlank(control.value)) {
      return { empty: true };
    }
    return null;
  }

  static pubkey(control: UntypedFormControl): ValidationErrors | null {
    const value = control.value;
    if (value && (typeof value !== 'string' || !PUBKEY_REGEXP.test(value))) {
      return { pubkey: true };
    }
    return null;
  }

  static address(control: UntypedFormControl): ValidationErrors | null {
    const value = control.value;
    if (value && (typeof value !== 'string' || !ADDRESS_REGEXP.test(value))) {
      return { address: true };
    }
    return null;
  }

  static uid(control: FormControl<string>): ValidationErrors {
    const value = control.value;
    if (value && (typeof value !== 'string' || !UID_REGEXP.test(value))) {
      return { uid: true };
    }
    return null;
  }

  static integer(control: UntypedFormControl): ValidationErrors | null {
    if (isNilOrBlank(control.value)) return null;
    const value = parseFloat(control.value);
    if (isNaN(value) || (value | 0) !== value) {
      return { integer: true };
    }
    return null;
  }

  static decimal(opts?: { maxDecimals?: number }): ValidatorFn {
    const regexp = this.getDoubleRegexp(opts?.maxDecimals);
    return (control: UntypedFormControl): ValidationErrors | null => {
      const value = control.value;
      if (Number.isNaN(value)) {
        // DEBUG
        //console.debug("WARN: Getting a NaN value (decimal was expected) !");
        return null;
      }
      if (isNotNil(value) && value !== '' && !regexp.test(value as string)) {
        return isNotNil(opts?.maxDecimals) ? { maxDecimals: { maxDecimals: opts.maxDecimals } } : { decimal: true };
      }
      return null;
    };
  }

  /**
   * Check precision. e.g. if precision=0.5 then value=0.6 is invalid, but 1.5 is valid
   *
   * @param precision
   */
  static precision(precision: number): ValidatorFn {
    if (isNil(precision)) throw new Error('Required a not nil precision');

    // WARN: we should define a multiplier, because modulo in javascript will only work on integer
    // (e.g. "7 % 0.1" in javascript will NOT return zero (but 0.09999999999999962)
    const precisionNbDecimals = (precision.toString().split('.')[1] || '').length;
    const multiplier = Math.pow(10, precisionNbDecimals);
    const multipliedPrecision = Math.round(multiplier * precision);

    // The validator function
    return (control: UntypedFormControl): ValidationErrors | null => {
      const value = control.value;
      if (isNilOrBlank(value) || Number.isNaN(value)) {
        return null;
      }
      // WARN: Convert value into integer, before applying modulo operator
      const mod = Math.round(+value * multiplier) % multipliedPrecision;
      if (mod !== 0) {
        // DEBUG
        //console.debug(`WARN Getting a ${value} with an invalid precision (expected precision is: ${precision})`);
        return { precision: { precision } };
      }
      return null;
    };
  }

  static date(control: UntypedFormControl): ValidationErrors | null {
    const value = control.value;
    const date = !value || isMoment(value) ? value : fromDateISOString(value);
    if (date && (!date.isValid() || date.year() < 1900)) {
      return { date: true };
    }
    return null;
  }

  static dateIsAfter(previousValue: Moment, errorParam: string, granularity?: unitOfTime.StartOf): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = fromDateISOString(control.value);
      if (isNotNil(value) && isNotNil(previousValue) && value.isSameOrBefore(previousValue, granularity)) {
        // Return the error
        return { dateIsAfter: { minDate: errorParam } };
      }
      return null;
    };
  }

  static dateIsBefore(maxValue: Moment, errorParam: string, granularity?: unitOfTime.StartOf): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = fromDateISOString(control.value);
      if (isNotNil(value) && isNotNil(maxValue) && value.isSameOrAfter(maxValue, granularity)) {
        // Return the error
        return { dateIsBefore: { maxDate: errorParam } };
      }
      return null;
    };
  }

  static dateRangeEnd(startDateFieldName: string, msg?: string): ValidatorFn {
    const errorCode = msg ? 'msg' : 'dateRange';
    const error = msg ? { msg } : { dateRange: true };
    return (control: AbstractControl): ValidationErrors | null => {
      // Form group not created yet: skip
      if (!control.parent) return null;

      const startControl = control.parent.get(startDateFieldName);
      if (!startControl) {
        console.warn(`Cannot find brother control '${startDateFieldName}' in the parent form`);
        return null;
      }
      const startDate = fromDateISOString(startControl.value);
      const endDate = fromDateISOString(control.value);
      // Error if value <= beforeDate
      if (isNotNil(endDate) && isNotNil(startDate) && endDate.isSameOrBefore(startDate)) {
        return error;
      }
      // OK: clear existing errors
      SharedValidators.clearError(control, errorCode);
      return null;
    };
  }

  static dateRangeStart(endDateFieldName: string, msg?: string): ValidatorFn {
    const errorCode = msg ? 'msg' : 'dateRange';
    const error = msg ? { msg } : { dateRange: true };
    return (control: AbstractControl): ValidationErrors | null => {
      // Form group not created yet: skip
      if (!control.parent) return null;

      const endDateControl = control.parent.get(endDateFieldName);
      if (!endDateControl) {
        console.warn(`Cannot find control '${endDateFieldName}' in the parent form`);
        return null;
      }
      const endDate = fromDateISOString(endDateControl.value);
      const startDate = fromDateISOString(control.value);
      // Error if value <= beforeDate
      if (isNotNil(startDate) && isNotNil(endDate) && startDate.isSameOrAfter(endDate)) {
        return error;
      }
      // OK: clear existing errors
      SharedValidators.clearError(control, errorCode);
      return null;
    };
  }

  static copyParentErrors(errorNames?: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // Skip if control already has some errors
      if (control.errors) return null;
      // Skip if parent form group not created yet
      if (!control.parent) return null;

      // Form group not created yet
      if (!control.parent) return null;

      const errors = control.parent.errors;

      // No errors, or copy all errors
      if (!errors || isEmptyArray(errorNames)) return errors;

      // Copy only expected errors
      return Object.keys(errors).reduce((res, key) => {
        if (errorNames.includes(key)) {
          res[key] = errors[key];
        }
        return res;
      }, {});
    };
  }

  static clearError(control: AbstractControl, errorCode: string) {
    if (control.hasError(errorCode)) {
      const errors = control.errors;
      if (errors && errors[errorCode]) {
        // Only one error: reset errors
        if (Object.getOwnPropertyNames(errors).length === 1) {
          control.setErrors(null);
        }
        // Other errors exists: just remove this error
        else {
          delete errors[errorCode];
          control.setErrors(errors);
        }
      }
    }
  }
}

// @dynamic
export class SharedFormGroupValidators {
  static dateRange(startDateField: string, endDateField: string, opts?: { msg?: string; fieldOnly?: boolean } | string): ValidatorFn {
    const msg = typeof opts === 'string' ? opts : opts?.msg;
    const fieldOnly = typeof opts === 'object' ? opts?.fieldOnly : undefined;
    const errorCode = isNotNilOrBlank(msg) ? 'msg' : 'dateRange';
    const rangeError = msg ? { msg } : { dateRange: true };
    return (group: UntypedFormGroup): ValidationErrors | null => {
      const startDate = fromDateISOString(group.get(startDateField).value);
      const endField = group.get(endDateField);
      const endDate = fromDateISOString(endField.value);
      if (isNotNil(startDate) && isNotNil(endDate) && startDate.isAfter(endDate)) {
        // Update end field
        endField.markAsPending();
        endField.setErrors({
          ...endField.errors,
          ...rangeError,
        });
        // Return the error (should be applied to the parent form, by default)
        return fieldOnly ? null : rangeError;
      }
      // OK: remove the existing on the end field
      SharedValidators.clearError(endField, errorCode);
      return null;
    };
  }

  static dateMaxDuration(startDateField: string, endDateField: string, maxDuration: number, durationUnit?: moment.unitOfTime.Diff): ValidatorFn {
    const maxDurationError = { dateMaxDuration: true };
    return (group: UntypedFormGroup): ValidationErrors | null => {
      const startDate = fromDateISOString(group.get(startDateField).value);
      const endField = group.get(endDateField);
      const endDate = fromDateISOString(endField.value);
      if (isNotNil(startDate) && isNotNil(endDate) && Math.abs(startDate.diff(endDate, durationUnit)) > maxDuration) {
        // Update end field
        endField.markAsTouched({ onlySelf: true });
        endField.markAsPending();
        endField.setErrors({
          ...endField.errors,
          ...maxDurationError,
        });
        // Return the error (should be apply to the parent form)
        return maxDurationError;
      }
      // OK: remove the existing on the end field
      SharedValidators.clearError(endField, 'dateMaxDuration');
      return null;
    };
  }

  static dateMinDuration(startDateField: string, endDateField: string, minDuration: number, durationUnit?: moment.unitOfTime.Diff): ValidatorFn {
    return (group: UntypedFormGroup): ValidationErrors | null => {
      const endField = group.get(endDateField);
      const startDate = fromDateISOString(group.get(startDateField).value);
      const endDate = fromDateISOString(endField.value);
      if (isNotNil(startDate) && isNotNil(endDate) && Math.abs(startDate.diff(endDate, durationUnit)) < minDuration) {
        // Update end field
        const endFieldErrors: ValidationErrors = endField.errors || {};
        endFieldErrors['dateMinDuration'] = true;
        endField.setErrors(endFieldErrors);
        endField.markAsTouched({ onlySelf: true });
        // Return the error (should be apply to the parent form)
        return { dateMinDuration: true };
      }
      // OK: remove the existing on the end field
      else {
        SharedValidators.clearError(endField, 'dateMinDuration');
      }
      return null;
    };
  }

  static requiredIf(
    fieldName: string,
    anotherFieldToCheck: string | AbstractControl,
    opts?: { fieldOnly?: boolean; predicate?: (control: AbstractControl) => boolean }
  ): ValidatorFn {
    const predicate = opts?.predicate || ((control) => isNotNilOrBlank(control.value));
    return (group: UntypedFormGroup): ValidationErrors | null => {
      const control = group.get(fieldName);
      const anotherControl = anotherFieldToCheck instanceof AbstractControl ? anotherFieldToCheck : group.get(anotherFieldToCheck);
      if (!anotherControl) throw new Error('Unable to find field to check!');
      if (isNilOrBlank(control.value) && predicate(anotherControl)) {
        const error = { required: true };
        control.setErrors(error);
        control.markAsTouched({ onlySelf: true });
        return opts?.fieldOnly ? null : error;
      }
      SharedValidators.clearError(control, 'required');
      return null;
    };
  }

  static requiredIfTrue(fieldName: string, anotherFieldToCheck: string | AbstractControl, opts?: { fieldOnly?: boolean }): ValidatorFn {
    return (group: UntypedFormGroup): ValidationErrors | null => {
      const control = group.get(fieldName);
      const anotherControl = anotherFieldToCheck instanceof AbstractControl ? anotherFieldToCheck : group.get(anotherFieldToCheck);
      if (!anotherControl) throw new Error('Unable to find field to check!');
      if (isNilOrBlank(control.value) && toBoolean(anotherControl.value, false)) {
        const error = { required: true };
        control.setErrors(error);
        control.markAsTouched({ onlySelf: true });
        return opts?.fieldOnly ? null : error;
      }
      SharedValidators.clearError(control, 'required');
      return null;
    };
  }

  static requiredIfEmpty(fieldName: string, anotherFieldToCheck: string, opts?: { fieldOnly?: boolean }): ValidatorFn {
    return (group: UntypedFormGroup): ValidationErrors | null => {
      const control = group.get(fieldName);
      if (isNilOrBlank(control.value) && isNilOrBlank(group.get(anotherFieldToCheck).value)) {
        const error = { required: true };
        control.setErrors(error);
        control.markAsTouched({ onlySelf: true });
        return opts?.fieldOnly ? null : error;
      }
      SharedValidators.clearError(control, 'required');
      return null;
    };
  }

  static propagateIfDirty(fieldName: string, fieldNameToPropagate: string, valueToPropagate: any): ValidatorFn {
    return (group: UntypedFormGroup): null => {
      const control = group.get(fieldName);
      const controlToPropagate = group.get(fieldNameToPropagate);
      if (control.dirty && controlToPropagate.value !== valueToPropagate) {
        controlToPropagate.setValue(valueToPropagate);
      }
      return null;
    };
  }

  /**
   * Same as compose, but keep only the first errors (instead of the union)
   *
   * @param validators
   */
  first(validators: (ValidatorFn | null | undefined)[]): ValidationErrors | null {
    return (control) =>
      validators
        .filter(isNotNil)
        .map((validator) => validator(control))
        .find(isNotNil) || null;
  }
}
