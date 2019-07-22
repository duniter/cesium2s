import * as moment from "moment";
import {Moment} from "moment";
import {asInputElement, isInputElement} from "./material/focusable";
import {ElementRef} from "@angular/core";

export const DATE_ISO_PATTERN = 'YYYY-MM-DDTHH:mm:ss.SSSZ';

export function isNil<T>(obj: T | null | undefined): boolean {
  return obj === undefined || obj === null;
}
export function isNilOrBlank<T>(obj: T | null | undefined): boolean {
  return obj === undefined || obj === null || (typeof obj === 'string' && obj.trim() === "");
}
export function isNotNil<T>(obj: T | null | undefined): boolean {
  return obj !== undefined && obj !== null;
}
export function isNotNilOrBlank<T>(obj: T | null | undefined): boolean {
  return obj !== undefined && obj !== null && (typeof obj !== 'string' || obj.trim() !== "");
}
export function isNotEmptyArray<T>(obj: T[] | null | undefined): boolean {
  return obj !== undefined && obj !== null && obj.length > 0;
}
export function isEmptyArray<T>(obj: T[] | null | undefined): boolean {
  return obj === undefined || obj === null || !obj.length;
}
export function nullIfUndefined<T>(obj: T | null | undefined): T | null {
  return obj === undefined ? null : obj;
}
export function trimEmptyToNull<T>(str: string | null | undefined): string | null {
  const value = str && str.trim() || undefined;
  return value && value.length && value || null;
}
export function toBoolean(obj: boolean | null | undefined | string, defaultValue: boolean): boolean {
  return (obj !== undefined && obj !== null) ? (obj !== "false" ? !!obj : false) : defaultValue;
}
export function toFloat(obj: string | null | undefined): number | null {
  return (obj !== undefined && obj !== null) ? parseFloat(obj) : null;
}
export function toInt(obj: string | null | undefined): number | null {
  return (obj !== undefined && obj !== null) ? parseInt(obj, 0) : null;
}
export const toDateISOString = function (value): string | undefined {
  if (!value) return undefined;
  if (typeof value == "string") {
    if (value.indexOf('+')) {
      value = fromDateISOString(value);
    }
    else {
      return value;
    }
  }
  if (typeof value == "object" && value.toISOString) {
    return value.toISOString();
  }
  return moment(value).format(DATE_ISO_PATTERN) || undefined;
}

export function fromDateISOString(value): Moment | undefined {
  return value && moment(value, DATE_ISO_PATTERN) || undefined;

}

export function startsWithUpperCase(input: string, search: string): boolean {
  return input && input.toUpperCase().startsWith(search);
}

export function matchUpperCase(input: string, regexp: string): boolean {
  return input && !!input.toUpperCase().match(regexp);
}


export function suggestFromArray(items: any[], value: any, options?: {
  searchAttribute?: string
  searchAttributes?: string[]
}): any[] {
  if (isNotNil(value) && typeof value === "object") return [value];
  value = (typeof value === "string" && value !== '*') && value.toUpperCase() || undefined;
  if (isNilOrBlank(value)) return items;
  const keys = options && (options.searchAttribute && [options.searchAttribute] || options.searchAttributes) || ['label'];

  // If wildcard, search using regexp
  if ((value as string).indexOf('*') !== -1) {
    value = (value as string).replace('*', '.*');
    return items.filter(v => keys.findIndex(key => matchUpperCase(v[key], value)) !== -1);
  }

  // If wildcard, search using startsWith
  return items.filter(v => keys.findIndex(key => startsWithUpperCase(v[key], value)) !== -1);
}

export function joinProperties(obj: any, properties: String[], separator?: string): string | undefined {
  if (!obj) throw "Could not display an undefined entity.";
  separator = separator || " - ";
  return properties.reduce((result: string, key: string, index: number) => {
    return index ? (result + separator + obj[key]) : obj[key];
  }, "");
}

export function attributeComparator<T>(attribute: string): (a: T, b: T) => number {
  return (a: T, b: T) => {
    const valueA = a[attribute];
    const valueB = b[attribute];
    return valueA === valueB ? 0 : (valueA > valueB ? 1 : -1);
  };
}

export function sort<T>(array: T[], attribute: string): T[] {
  return array
    .slice(0) // copy
    .sort((a, b) => {
      const valueA = a[attribute];
      const valueB = b[attribute];
      return valueA === valueB ? 0 : (valueA > valueB ? 1 : -1);
    });
}


export function selectInputContent(event: UIEvent) {
  if (event.defaultPrevented) return false;
  const input = (event.target as any);
  if (input && typeof input.select === "function") {
    try {
      input.select();
      //event.preventDefault();
      //event.stopPropagation();
    } catch (err) {
      console.error("Could not select input content", err);
      return false;
    }
  }
  return true;
}

export function getPropertyByPath(obj: any, path: string): any {
  if (isNil(obj)) return undefined;
  const i = path.indexOf('.');
  if (i === -1) {
    return obj[path];
  }
  const key = path.substring(0, i);
  if (isNil(obj[key])) return undefined;
  if (obj[key] && typeof obj[key] === "object") {
    return getPropertyByPath(obj[key], path.substring(i + 1));
  }
  throw new Error(`Invalid property path: '${key}' is not an valid object.`);
}

export function focusInput(element: ElementRef) {
  const inputElement = asInputElement(element);
  if (inputElement)
    inputElement.focus();
  else {
    console.warn("Trying to focus on this element:", element);
  }
}
export function setTabIndex(element: ElementRef, tabIndex: number) {
  if(isInputElement(element)) {
    element.tabindex = tabIndex;
  }
  else if (element && isInputElement(element.nativeElement)) {
    element.nativeElement.tabIndex = tabIndex;
  }
  else {
    console.warn("Trying to change tabindex on this element:", element);
  }
}
