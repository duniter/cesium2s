import {AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import * as moment from 'moment/moment';
import { DATE_ISO_PATTERN, PUBKEY_REGEXP } from "../constants";
import {fromDateISOString, isNil, isNotNil, isNotNilOrBlank} from "../functions";

export class SharedValidators {

  static validDate(control: FormControl): ValidationErrors | null {
    const value = control.value;
    const date = !value || moment.isMoment(value) ? value : moment(control.value, DATE_ISO_PATTERN);
    if (date && (!date.isValid() || date.year() < 1970)) {
      return { validDate: true };
    }
    return null;
  }

  static latitude(control: FormControl): ValidationErrors | null {
    const value = control.value;
    if (isNotNil(value) && (value < -90 || value > 90)) {
      return {validLatitude: true};
    }
    return null;
  }

  static longitude(control: FormControl): ValidationErrors | null {
    const value = control.value;
    if (isNotNil(value) && (value < -180 || value > 180)) {
      return { validLongitude: true };
    }
    return null;
  }

  static object(control: FormControl): ValidationErrors | null {
    const value = control.value;
    if (value && typeof value !== 'object') {
      return { object: true };
    }
    return null;
  }

  static entity(control: FormControl): ValidationErrors | null {
    const value = control.value;
    if (value && (typeof value !== 'object' || value.id === undefined || value.id === null)) {
      return { entity: true };
    }
    return null;
  }

  static empty(control: FormControl): ValidationErrors | null {
    if (isNotNilOrBlank(control.value)) {
      return { empty: true };
    }
    return null;
  }

  static pubkey(control: FormControl): ValidationErrors | null {
    const value = control.value;
    if (value && (typeof value !== 'string' || !PUBKEY_REGEXP.test(value))) {
      return { pubkey: true };
    }
    return null;
  }

  static integer(control: FormControl): ValidationErrors | null {
    const value = control.value;
    if (isNotNil(value) && value !== "" && !Number.isInteger(value)) {
      return { integer: true };
    }
    return null;
  }

  static double(options?: {maxDecimals?: number}): ValidatorFn {
    options = options || {};
    let regexpStr;
    if (isNotNil(options.maxDecimals)) {
      if (options.maxDecimals < 0) throw new Error(`Invalid maxDecimals value: ${options.maxDecimals}`);
      regexpStr = options.maxDecimals > 1 ? `^[0-9]+([.,][0-9]{1,${options.maxDecimals}})?$` : "^[0-9]+([.,][0-9])?$";
    }
    else {
      regexpStr = "^[0-9]+([.,][0-9]*)?$";
    }

    const regexp = new RegExp(regexpStr);
    return (control: FormControl): ValidationErrors | null => {
      let value = control.value;
      if (Number.isNaN(value)) {
        //console.log("WARN: Getting a NaN value !");
        value = null;
      }
      if (isNotNil(value) && value !== "" && !regexp.test(value as string)) {
        return { maxDecimals: true };
      }
      return null;
    };
  }

  static dateIsAfter(startDateField: string, endDateField: string): ValidatorFn {
    return (group: FormGroup): ValidationErrors | null => {
      const endField = group.get(endDateField);
      const startDate = fromDateISOString(group.get(startDateField).value);
      const endDate = fromDateISOString(endField.value);
      if (isNotNil(startDate) && isNotNil(endDate)  && startDate >= endDate) {
        // Update end field
        const endFieldErrors: ValidationErrors = endField.errors || {};
        endFieldErrors['dateIsAfter'] = true;
        endField.setErrors(endFieldErrors);
        // Return the error (should be apply to the parent form)
        return { dateIsAfter: true};
      }
      // OK: remove the existing on the end field
      else {
        SharedValidators.clearError(endField, 'dateIsAfter');
      }
      return null;
    };
  }

  static dateMaxDuration(startDateField: string, endDateField: string, maxDuration: number, durationUnit?: moment.unitOfTime.Diff): ValidatorFn {
    return (group: FormGroup): ValidationErrors | null => {
      const endField = group.get(endDateField);
      const startDate = fromDateISOString(group.get(startDateField).value);
      const endDate = fromDateISOString(endField.value);
      if (isNotNil(startDate) && isNotNil(endDate) && Math.abs(startDate.diff(endDate, durationUnit)) > maxDuration) {
        // Update end field
        const endFieldErrors: ValidationErrors = endField.errors || {};
        endFieldErrors['dateMaxDuration'] = true;
        endField.setErrors(endFieldErrors);
        endField.markAsTouched({onlySelf: true});
        // Return the error (should be apply to the parent form)
        return { dateMaxDuration: true};
      }
      // OK: remove the existing on the end field
      else {
        SharedValidators.clearError(endField, 'dateMaxDuration');
      }
      return null;
    };
  }

  static dateMinDuration(startDateField: string, endDateField: string, minDuration: number, durationUnit?: moment.unitOfTime.Diff): ValidatorFn {
    return (group: FormGroup): ValidationErrors | null => {
      const endField = group.get(endDateField);
      const startDate = fromDateISOString(group.get(startDateField).value);
      const endDate = fromDateISOString(endField.value);
      if (isNotNil(startDate) && isNotNil(endDate) && Math.abs(startDate.diff(endDate, durationUnit)) < minDuration) {
        // Update end field
        const endFieldErrors: ValidationErrors = endField.errors || {};
        endFieldErrors['dateMinDuration'] = true;
        endField.setErrors(endFieldErrors);
        endField.markAsTouched({onlySelf: true});
        // Return the error (should be apply to the parent form)
        return { dateMinDuration: true};
      }
      // OK: remove the existing on the end field
      else {
        SharedValidators.clearError(endField, 'dateMinDuration');
      }
      return null;
    };
  }

  static requiredIf(fieldName: string, anotherFieldToCheck: string): ValidatorFn {
    return (group: FormGroup): ValidationErrors | null => {
      const control = group.get(fieldName);
      if (isNil(control.value) && isNotNil(group.get(anotherFieldToCheck).value)) {
        const error = { required: true};
        control.setErrors(error);
        return error;
      }
      return null;
    };
  }

  static requiredIfEmpty(fieldName: string, anotherFieldToCheck: string): ValidatorFn {
    return (group: FormGroup): ValidationErrors | null => {
      const control = group.get(fieldName);
      if (isNil(control.value) && isNil(group.get(anotherFieldToCheck).value)) {
        const error = { required: true};
        control.setErrors(error);
        return error;
      }
      return null;
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

  static requiredArrayMinLength(minLength?: number): ValidatorFn {
    minLength = minLength || 1;
    return (group: FormArray): ValidationErrors | null => {
      if (!group || group.length < minLength) {
        return {required: true};
      }
      return null;
    };
  }
}
