import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { ElementRef, Predicate, QueryList } from '@angular/core';
import { waitFor, WaitForOptions } from '@app/shared/observables';
import { isNil, isNilOrBlank, isNotEmptyArray, isNotNil, toBoolean, toNumber } from './functions';
import { nullIfUndefined } from '@app/shared/functions';
import { isMoment } from 'moment';
import { toDateISOString } from '@app/shared/dates';

export interface FormArrayHelperOptions {
  allowEmptyArray: boolean;
  validators?: ValidatorFn[];
}

// TODO continue to use this kind of declaration ?
export class FormUtils {
  static logErrors = logFormErrors;
  static getControlFromPath = getControlFromPath;
  static filterNumberInput = filterNumberInput;
  static disableControls = disableControls;
  static selectInputContent = selectInputContent;
  /**
   * @deprecated use markAllAsTouched() instead (naming was wrong)
   */
  static markAsTouched = markAllAsTouched;

  /**
   * Marks the control and all its descendant controls as touched.
   * See also:
   * - `markAsTouched()`
   */
  static markAllAsTouched = markAllAsTouched;
  static markAsUntouched = markAsUntouched;
  static waitWhilePending = waitWhilePending;
  static waitIdle = waitIdle;
  static updateValueAndValidity = updateValueAndValidity;

  // ArrayForm
  static addValueInArray = addValueInArray;
  static removeValueInArray = removeValueInArray;
  static resizeArray = resizeArray;
  static clearValueInArray = clearValueInArray;
}

/**
 * Fill a form using a source entity
 *
 * @param target
 * @param entity
 * @param opts
 */
export function copyEntity2Form(entity: any, target: FormGroup, opts?: { emitEvent?: boolean; onlySelf?: boolean }) {
  const json = getFormValueFromEntity(entity, target);
  target.patchValue(json, opts);
}

export function getFormValueFromEntity(entity: any | undefined, form: FormGroup): { [key: string]: any } {
  return adaptValueToControl(entity, form) as { [key: string]: any };
}

/**
 * Transform an entity into a simple object, compatible with the given form
 *
 * @param source an entity (or subentity)
 * @param control
 * @param path
 */
export function adaptValueToControl(source: any | undefined, control: AbstractControl, path?: string): any {
  const pathPrefix = path ? path + '.' : '';

  // Form group
  if (control instanceof FormGroup) {
    const result = {};
    // eslint-disable-next-line guard-for-in
    for (const key in control.controls) {
      result[key] = adaptValueToControl(source && source[key], control.controls[key], pathPrefix + key);
    }
    return result;
  }

  // Array
  if (control instanceof FormArray) {
    // Split, if many values in a string
    if (typeof source === 'string') {
      source = source.split('|');
    }

    // Skip if value is not an array
    if (!Array.isArray(source) || control.length === 0) {
      if (isNotEmptyArray(source)) console.warn(`WARN: please resize the FormArray '${path}' to the same length of the input array`);
      return [];
    }

    // Use the first form group, as model
    const firstItemControl = control.at(0);
    let result = source.map((item, index) => adaptValueToControl(item, firstItemControl, pathPrefix + '#' + index)) as any[];

    // Truncate if too many values
    if (result.length > control.length) {
      if (firstItemControl instanceof FormControl) {
        for (let i = control.length; i < result.length; i++) {
          control.push(new FormControl(null, firstItemControl.validator));
        }
      } else {
        console.warn(`WARN: please resize the FormArray '${path || ''}' to the same length of the input array`);
        result = result.slice(0, control.length);
      }
    }

    // Add values if not enought
    else if (result.length < control.length) {
      //console.warn(`WARN: Adding null value to array values`);
      for (let i = result.length; i < control.length; i++) {
        result.push(null);
      }
    }
    return result;
  }

  // Form control
  if (control instanceof FormControl) {
    // Date
    if (isMoment(source)) {
      return toDateISOString(source);
    }
    // Any other control: replace undefined by null value
    // because Undefined is not authorized as control value
    else {
      return nullIfUndefined(source);
    }
  }
}

export function logFormErrors(control: AbstractControl, logPrefix?: string, path?: string) {
  if (!control || control.valid) return;
  logPrefix = logPrefix || '';
  // Form group
  if (control instanceof FormGroup) {
    if (!path) console.warn(`${logPrefix} Form errors:`);
    if (control.errors) {
      Object.keys(control.errors).forEach((error) => console.warn(`${logPrefix} -> ${path || ''} (${error})`));
    }
    if (control.controls) {
      Object.keys(control.controls).forEach(
        (child) => logFormErrors(control.controls[child], logPrefix, path ? `${path}.${child}` : child) // Recursive call
      );
    }
  }
  // Form array
  else if (control instanceof FormArray) {
    if (control.errors) {
      Object.keys(control.errors).forEach((error) => console.warn(`${logPrefix} -> ${path || ''} (${error})`));
    }
    control.controls.forEach((child, index) => {
      logFormErrors(child, logPrefix, path ? `${path}.${index}` : `${index}`); // Recursive call
    });
  }
  // Other control's errors
  else if (control.errors) {
    Object.keys(control.errors).forEach((error) => console.warn(`${logPrefix} -> ${path || ''} (${error})`));
  }
}

export function getControlFromPath(form: FormGroup, path: string): AbstractControl {
  const i = path.indexOf('.');
  if (i === -1) {
    return form.controls[path];
  }
  const key = path.substring(0, i);
  if (form.controls[key] instanceof FormGroup) {
    return getControlFromPath(form.controls[key] as FormGroup, path.substring(i + 1));
  }
  throw new Error(`Invalid form path: '${key}' should be a form group.`);
}

export function disableControls(form: FormGroup, paths: string[], opts?: { onlySelf?: boolean; emitEvent?: boolean }) {
  (paths || []).forEach((path) => {
    const control = getControlFromPath(form, path);
    if (control) control.disable(opts);
  });
}

export function addValueInArray(
  arrayControl: FormArray,
  createControl: (value?: any) => AbstractControl,
  equals: (v1: any, v2: any) => boolean,
  isEmpty: (value: any) => boolean,
  value: any,
  options?: { emitEvent: boolean }
): boolean {
  options = options || { emitEvent: true };

  let hasChanged = false;
  let index = -1;

  // Search if value already exists
  if (!isEmpty(value)) {
    index = (arrayControl.value || []).findIndex((v) => equals(value, v));
  }

  // If value not exists, but last value is empty: use it
  if (index === -1 && arrayControl.length && isEmpty(arrayControl.at(arrayControl.length - 1).value)) {
    index = arrayControl.length - 1;
  }

  // Replace the existing value
  if (index !== -1) {
    if (!isEmpty(value)) {
      arrayControl.at(index).patchValue(value, options);
      hasChanged = true;
    }
  } else {
    const control = createControl(value);
    arrayControl.push(control);
    hasChanged = true;
  }

  if (hasChanged) {
    if (isNil(options.emitEvent) || options.emitEvent) {
      // Mark array control dirty
      if (!isEmpty(value)) {
        arrayControl.markAsDirty();
      }
    }
  }

  return hasChanged;
}

export function resizeArray(arrayControl: FormArray, createControl: () => AbstractControl, length: number): boolean {
  const hasChanged = arrayControl.length !== length;

  // Increase size
  if (arrayControl.length < length) {
    while (arrayControl.length < length) {
      arrayControl.push(createControl());
    }
  }

  // Or reduce
  else if (arrayControl.length > length) {
    while (arrayControl.length > length) {
      arrayControl.removeAt(arrayControl.length - 1);
    }
  }

  return hasChanged;
}

export function removeValueInArray(arrayControl: FormArray, isEmpty: (value: any) => boolean, index: number): boolean {
  arrayControl.removeAt(index);
  arrayControl.markAsDirty();
  return true;
}

export function clearValueInArray(arrayControl: FormArray, isEmpty: (value: any) => boolean, index: number): boolean {
  const control = arrayControl.at(index);
  if (isEmpty(control.value)) return false; // skip (not need to clear)

  if (control instanceof FormGroup) {
    copyEntity2Form({}, control);
  } else if (control instanceof FormArray) {
    control.setValue([]);
  } else {
    control.setValue(null);
  }
  arrayControl.markAsDirty();
  return true;
}

export function markAllAsTouched(control: AbstractControl, opts?: { onlySelf?: boolean; emitEvent?: boolean }) {
  if (!control) return;
  if (control instanceof FormGroup) {
    markFormGroupAsTouched(control, { ...opts, onlySelf: true }); // recursive call
  } else if (control instanceof FormArray) {
    control.markAsTouched({ onlySelf: true });
    (control.controls || []).forEach((c) => markControlAsTouched(c, { ...opts, onlySelf: true })); // recursive call
  } else {
    control.markAsTouched({ onlySelf: true });
    control.updateValueAndValidity({ ...opts, onlySelf: true });
  }
}

export function markFormGroupAsTouched(form: FormGroup, opts?: { onlySelf?: boolean; emitEvent?: boolean }) {
  if (!form) return;
  form.markAsTouched(opts);
  Object.keys(form.controls)
    .map((key) => form.controls[key])
    .filter((control) => control.enabled)
    .forEach((control) => markControlAsTouched(control, opts));
  form.updateValueAndValidity({ ...opts, onlySelf: true });
}

export function markControlAsTouched(control: AbstractControl, opts?: { onlySelf?: boolean; emitEvent?: boolean }) {
  if (!control) return;
  if (control instanceof FormGroup) {
    markAllAsTouched(control, { ...opts, onlySelf: true }); // recursive call
  } else if (control instanceof FormArray) {
    (control.controls || []).forEach((c) => markControlAsTouched(c, { ...opts, onlySelf: true })); // recursive call
  } else {
    control.markAsTouched({ onlySelf: true });
    control.updateValueAndValidity({ ...opts, onlySelf: true });
  }
}

export function updateValueAndValidity(form: FormGroup, opts?: { onlySelf?: boolean; emitEvent?: boolean }) {
  if (!form) return;
  form.updateValueAndValidity(opts);
  Object.keys(form.controls)
    .map((key) => form.controls[key])
    .filter((control) => control.enabled)
    .forEach((control) => {
      if (control instanceof FormGroup) {
        updateValueAndValidity(control, { ...opts, onlySelf: true }); // recursive call
      } else {
        control.updateValueAndValidity({ ...opts, onlySelf: true });
      }
    });
}

export function markAsUntouched(form: FormGroup, opts?: { onlySelf?: boolean }) {
  if (!form) return;
  form.markAsUntouched(opts);
  Object.getOwnPropertyNames(form.controls).forEach((key) => {
    const control = form.get(key);
    if (control instanceof FormGroup) {
      markAsUntouched(control, { onlySelf: true }); // recursive call
    } else {
      control.markAsUntouched({ onlySelf: true });
      control.setErrors(null);
    }
  });
}

/**
 * Wait end of async validation (not pending). This need to implement {pending: boolean}
 * return false
 */
export function waitWhilePending<T extends { pending: boolean }>(form: T, opts?: WaitForOptions): Promise<void> {
  const predicate: Predicate<void> = () => form.pending !== true;
  return waitFor(predicate, opts);
}

/**
 * Wait form is idle (not loading). This need to implement {loading: boolean}
 * @param form
 * @param opts
 */
export function waitIdle<T extends { loading: boolean }>(form: T, opts?: WaitForOptions): Promise<void> {
  const predicate: Predicate<void> = () => form.loading !== true;
  return waitFor(predicate, opts);
}

export function selectInputContent(event: UIEvent) {
  if (event.defaultPrevented) return false;
  const input = event.target as any;
  if (!input) return true;

  // Nothing to select
  if (isNilOrBlank(input.value)) return false;

  if (typeof input.selectRange === 'function') {
    try {
      input.selectRange(input.value.length, 0);
      return true;
    } catch (err) {
      console.error('Could not select input content, using selectRange()', err);
      return false;
    }
  }

  if (input && typeof input.select === 'function') {
    try {
      input.select();
      return true;
    } catch (err) {
      console.error('Could not select input content, using select()', err);
      return false;
    }
  }
  return true;
}

export function selectInputRange(input: any, startIndex: number, endIndex?: number) {
  if (input && typeof input.setSelectionRange === 'function') {
    // No content
    if (isNilOrBlank(input.value)) return false;

    try {
      input.setSelectionRange(startIndex, isNotNil(endIndex) ? endIndex : startIndex);
    } catch (err) {
      console.error('Could not select input range', err);
      return false;
    }
  }
  return true;
}

export function getCaretPosition(input: any): number {
  if (input && input.selectionStart) {
    return input.selectionDirection ? (input.selectionDirection === 'backward' ? input.selectionStart : input.selectionEnd) : input.selectionStart;
  }
  return -1;
}

export function filterNumberInput(event: KeyboardEvent, allowDecimals: boolean, decimalSeparator?: string) {
  //input number entered or one of the 4 direction up, down, left and right
  if ((event.which >= 48 && event.which <= 57) || (event.which >= 37 && event.which <= 40)) {
    //console.debug('input number entered :' + event.which + ' ' + event.keyCode + ' ' + event.charCode);
    // OK
  }
  // Decimal separator
  else if (
    allowDecimals &&
    ((!decimalSeparator && (event.key === '.' || event.key === ',')) || (decimalSeparator && event.key === decimalSeparator))
  ) {
    //console.debug('input decimal separator entered :' + event.code);
    // OK
  } else {
    //input command entered of delete, backspace or one of the 4 direction up, down, left and right, or negative sign
    if ((event.keyCode >= 37 && event.keyCode <= 40) || event.keyCode == 46 || event.which == 8 || event.keyCode == 9 || event.keyCode == 45) {
      //console.debug('input command entered :' + event.which + ' ' + event.keyCode + ' ' + event.charCode);
      // OK
    }
    // Cancel other keyboard events
    else {
      //console.debug('input not number entered :' + event.which + ' ' + event.keyCode + ' ' + event.charCode + ' ' + event.code );
      event.preventDefault();
    }
  }
}

export function focusInput(element: ElementRef) {
  const inputElement = asInputElement(element);
  // eslint-disable-next-line @rx-angular/prefer-no-layout-sensitive-apis
  if (inputElement) inputElement.focus();
  else {
    console.warn('Trying to focus on this element:', element);
  }
}

export function setTabIndex(element: ElementRef, tabIndex: number) {
  if (isInputElement(element)) {
    element.tabindex = tabIndex;
  } else if (element && isInputElement(element.nativeElement)) {
    element.nativeElement.tabIndex = tabIndex;
  } else {
    console.warn('Trying to change tabindex on this element:', element);
  }
}

export interface FocusableElement {
  focus();
}

export function isFocusableElement(object: any): object is FocusableElement {
  if (!object) return false;
  return 'focus' in object;
}

export interface InputElement extends FocusableElement {
  tabindex?: number;
  tabIndex?: number;
  hidden?: boolean;
  disabled?: boolean;
  value: any;
}
export function isInputElement(object: any): object is InputElement {
  return (
    isFocusableElement(object) &&
    ('value' in object ||
      // has value is not always set (neither tabindex) check on 2 properties with a logical OR
      'tabindex' in object ||
      'tabIndex' in object)
  );
}

export function asInputElement(object: ElementRef): InputElement | undefined {
  if (object) {
    if (isInputElement(object)) return object;
    if (object.nativeElement && isInputElement(object.nativeElement)) return object.nativeElement;
  }
  return undefined;
}

export function tabindexComparator(a: InputElement, b: InputElement) {
  const valueA = a.tabindex || a.tabIndex;
  const valueB = b.tabindex || b.tabIndex;
  return valueA === valueB ? 0 : valueA > valueB ? 1 : -1;
}

export interface CanGainFocusOptions {
  minTabindex?: number;
  maxTabindex?: number;
  excludeEmptyInput?: boolean;
}

export interface GetFocusableInputOptions extends CanGainFocusOptions {
  sortByTabIndex?: boolean;
  debug?: boolean;
}

export function canHaveFocus(input: InputElement, opts?: CanGainFocusOptions): boolean {
  if (!input) return false;
  // Exclude disabled element
  return (
    !toBoolean(input.disabled, false) &&
    // Exclude hidden element
    !toBoolean(input.hidden, false) &&
    // Exclude minTabIndex < element.tabIndex
    (isNil(opts.minTabindex) || toNumber(input.tabIndex, input.tabindex) > opts.minTabindex) &&
    // Exclude maxTabIndex > element.tabIndex
    (isNil(opts.maxTabindex) || toNumber(input.tabIndex, input.tabindex) < opts.maxTabindex) &&
    // Exclude nil input value
    (!opts.excludeEmptyInput || isNilOrBlank(input.value))
  );
}

export function getFocusableInputElements(elements: QueryList<ElementRef>, opts?: GetFocusableInputOptions): InputElement[] {
  opts = { sortByTabIndex: false, excludeEmptyInput: false, ...opts };

  // Focus to first input
  const filteredElements: InputElement[] = elements

    // Transform to input
    .map(asInputElement)

    .filter((input) => {
      const included = canHaveFocus(input, opts);
      // DEBUG
      if (input && opts.debug)
        console.debug(`[inputs] Focusable input {canFocus: ${included}, tabIndex: ${input.tabIndex || input.tabindex}}`, input);
      return included;
    });

  // Sort by tabIndex
  if (opts.sortByTabIndex) {
    return filteredElements.sort(tabindexComparator);
  }

  return filteredElements;
}

export function focusNextInput(event: UIEvent | undefined, elements: QueryList<ElementRef>, opts?: GetFocusableInputOptions): boolean {
  // Cancelling event (e.g. when emitted by (keydown.tab) )
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  // Get current index
  const minTabindex = event && isInputElement(event.target) ? event.target.tabIndex || event.target.tabindex : undefined;

  // Get focusable input elements
  const focusableInputs: InputElement[] = getFocusableInputElements(elements, { minTabindex, ...opts });

  if (isNotEmptyArray(focusableInputs)) {
    // Focus on first inputs
    // eslint-disable-next-line @rx-angular/prefer-no-layout-sensitive-apis
    focusableInputs[0].focus();
    return true;
  }

  return false;
}

export function focusPreviousInput(event: UIEvent | undefined, elements: QueryList<ElementRef>, opts?: GetFocusableInputOptions): boolean {
  // Cancelling event (e.g. when emitted by (keydown.tab) )
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  // Get current index
  const maxTabindex = event && isInputElement(event.target) ? event.target.tabIndex || event.target.tabindex : undefined;

  // Get focusable input elements
  const focusableInputs: InputElement[] = getFocusableInputElements(elements, { maxTabindex, ...opts });

  if (isNotEmptyArray(focusableInputs)) {
    // Focus on last inputs
    // eslint-disable-next-line @rx-angular/prefer-no-layout-sensitive-apis
    focusableInputs[focusableInputs.length - 1].focus();
    return true;
  }

  return false;
}
