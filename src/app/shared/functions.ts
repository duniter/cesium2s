import { KeysEnum, KeyValueType } from '@app/shared/types';
import { setTimeout } from '@rx-angular/cdk/zone-less/browser';
import { u32, u64 } from '@polkadot/types-codec';
import { Codec } from '@polkadot/types-codec/types';
import { INTEGER_REGEXP, NUMBER_RANGE_REGEXP, NUMBER_REGEXP, PUBKEY_REGEXP, UID_REGEXP } from '@app/shared/constants';

export function isNil<T>(obj: T | null | undefined): boolean {
  return obj === undefined || obj === null;
}
export function isNilOrBlank<T>(obj: T | null | undefined): boolean {
  return obj === undefined || obj === null || (typeof obj === 'string' && obj.trim() === '');
}
export function isNotNil<T>(obj: T | null | undefined): boolean {
  return obj !== undefined && obj !== null;
}
export function isNotNilOrBlank<T>(obj: T | null | undefined): boolean {
  return obj !== undefined && obj !== null && (typeof obj !== 'string' || obj.trim() !== '');
}
export function isNotNilOrNaN<T>(obj: T | null | undefined): boolean {
  return obj !== undefined && obj !== null && (typeof obj !== 'number' || !isNaN(obj));
}
export function isNilOrNaN<T>(obj: T | null | undefined): boolean {
  return obj === undefined || obj === null || (typeof obj === 'number' && isNaN(obj));
}
export function isNotEmptyArray<T>(obj: T[] | null | undefined): boolean {
  return obj !== undefined && obj !== null && obj.length > 0;
}
export function firstArrayValue<T>(obj: T[] | null | undefined): T | undefined {
  return isNotEmptyArray(obj) ? obj[0] : undefined;
}
export function isEmptyArray<T>(obj: T[] | null | undefined): boolean {
  return obj === undefined || obj === null || !obj.length;
}
export function isNotNilBoolean(obj: any | null | undefined): obj is boolean {
  return (obj !== undefined && obj !== null && typeof obj === 'boolean') || false;
}
export function isNotNilString(obj: any | null | undefined): obj is string {
  return (obj !== undefined && obj !== null && typeof obj === 'string') || false;
}
export function isBlankString(obj: any | null | undefined): obj is string {
  return typeof obj === 'string' && obj.trim().length === 0;
}
export function notNilOrDefault<T>(obj: T | null | undefined, defaultValue: T): T {
  return obj !== undefined && obj !== null ? obj : defaultValue;
}
export function arraySize<T>(obj: T[] | null | undefined): number {
  return (isNotEmptyArray(obj) && obj.length) || 0;
}
export function arrayGroupBy<T, K extends keyof T>(values: T[], key: K): Map<string, T[]> {
  if (isNil(values)) return null;
  return values.reduce((res, value) => {
    const group = value[key] as string;
    res[group] = (res[group] || []).concat(value) as T[];
    return res;
  }, new Map<string, T[]>());
}
export function arrayDistinct<T>(obj: T[], properties?: string[]): T[] {
  if (isEmptyArray(obj)) return obj;
  properties = properties || Object.keys(obj[0]);
  const existingIds = new Set<string>();
  return obj.reduce((res, item) => {
    const uniqueKey = joinPropertiesPath(item, properties, '|');
    if (existingIds.has(uniqueKey)) return res; // Skip
    existingIds.add(uniqueKey);
    return res.concat(item);
  }, []);
}
export function arrayRandomPick<T>(items: T[]): T {
  if (!items || !Array.isArray(items) || items.length === 0) throw new Error('Invalid input: non-empty array is required');
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}
export function nullIfUndefined<T>(obj: T | null | undefined): T | null {
  return obj === undefined ? null : obj;
}
export function trimEmptyToNull(str: string | null | undefined): string | null {
  const value = (str && str.trim()) || undefined;
  return (value && value.length && value) || null;
}
export function toBoolean(obj: boolean | null | undefined | string, defaultValue?: boolean): boolean {
  return obj !== undefined && obj !== null ? (obj !== 'false' ? !!obj : false) : defaultValue;
}
export function toNumber(obj: number | u32 | u64 | Codec | null | undefined, defaultValue?: number): number {
  if (obj instanceof u32) return obj.toNumber();
  if (obj instanceof u64) return obj.toNumber();
  return obj !== undefined && obj !== null ? +obj : defaultValue;
}
export function toFloat(obj: string | null | undefined, defaultValue?: number): number | null {
  return obj !== undefined && obj !== null ? parseFloat(obj) : defaultValue;
}
export function toInt(obj: string | null | undefined, defaultValue?: number): number | null {
  return obj !== undefined && obj !== null ? parseInt(obj, 0) : defaultValue;
}

export function toNotNil<T = any>(obj: T, defaultValue?: T): any | null {
  return obj !== undefined && obj !== null ? obj : defaultValue;
}
export function removeDuplicatesFromArray<T>(obj: T[] | null | undefined, property?: string): T[] | null | undefined {
  if (isEmptyArray(obj)) return obj;
  if (property) {
    return obj.filter((item, i, array) => array.findIndex((t) => t && item && t[property] === item[property]) === i);
  }
  return obj.filter((item, i, array) => array.findIndex((t) => t && item && t === item) === i);
}
export function startsWithUpperCase(input: string, search: string): boolean {
  return input && input.toUpperCase().startsWith(search);
}
export function matchUpperCase(input: string, regexp: string): boolean {
  return input && !!input.toUpperCase().match(regexp);
}

/**
 * Remove trailing slash if any. Examples :
 * - '/test/' -> '/test'
 * - '/' -> undefined
 */
export function noTrailingSlash(path: string): string {
  if (!path || path.trim() === '/') return undefined;
  if (path.trim().lastIndexOf('/') === path.length - 1) return path.substring(0, path.length - 1);
  return path;
}

export function replaceAll(value: string, searchString: any, replacement): string | undefined {
  while (value && value.indexOf(searchString) !== -1) {
    value = value.replace(searchString, replacement);
  }
  return value;
}

export function escapeRegExp(value: string) {
  return value.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

export function removeEnd(value: string, end: string): string {
  return value?.endsWith(end || '') ? value.substring(0, value.length - end.length) : value;
}

/**
 * Replace case change by an underscore (.e.g 'myString' becomes 'my_string')
 *
 * @param value
 */
export function changeCaseToUnderscore(value: string): string {
  if (isNilOrBlank(value)) return value;
  return value.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

export function removeDiacritics(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function joinPropertiesPath<T>(obj: T, properties: string[], separator?: string): string | undefined {
  if (!obj) throw new Error('Could not display an undefined entity.');
  if (!properties) throw new Error("Missing 'properties' argument");
  return properties
    .map((path) => getPropertyByPath(obj, path))
    .filter(isNotNilOrBlank)
    .join(separator || ' - ');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function joinProperties<T = any, K extends keyof T = any>(obj: T, keys: K[], separator?: string): string | undefined {
  if (!obj) throw new Error('Could not display an undefined entity.');
  return keys
    .map((key) => getProperty(obj, key))
    .filter(isNotNilOrBlank)
    .join(separator || ' - ');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function propertyPathComparator<T = any>(path: string): (a: T, b: T) => number {
  return (a: T, b: T) => {
    const valueA = getPropertyByPath(a, path);
    const valueB = getPropertyByPath(b, path);
    return valueA === valueB ? 0 : valueA > valueB ? 1 : -1;
  };
}

export function propertyComparator<T = any, K extends keyof T = any>(key: K, defaultValue?: any): (a: T, b: T) => number {
  return (a: T, b: T) => {
    const valueA = a[key] !== undefined ? a[key] : defaultValue;
    const valueB = b[key] ? b[key] : defaultValue;
    return valueA === valueB ? 0 : valueA > valueB ? 1 : -1;
  };
}

export function propertiesPathComparator<T = any>(keys: string[], defaultValues?: any[]): (a: T, b: T) => number {
  if (!keys || !keys.length || (defaultValues && keys.length > defaultValues.length)) {
    throw new Error("Invalid arguments: missing 'keys' or array 'defaultValues' has a bad length");
  }
  return (a: T, b: T) =>
    keys
      .map((key, index) => {
        const valueA = getPropertyByPath(a, key, defaultValues && defaultValues[index]);
        const valueB = getPropertyByPath(b, key, defaultValues && defaultValues[index]);
        return valueA === valueB ? 0 : valueA > valueB ? 1 : -1;
      })
      // Stop if not equals, otherwise continue with the next key
      .find((res) => res !== 0) || 0;
}

export function sort<T>(array: T[], attribute: string, opts?: Intl.CollatorOptions): T[] {
  if (isEmptyArray(array)) return array;
  const compareFn = opts ? new Intl.Collator(undefined, opts).compare : (v1, v2) => (v1 === v2 ? 0 : v1 > v2 ? 1 : -1);
  return array
    .slice() // copy
    .sort((a, b) => compareFn(a[attribute], b[attribute]));
}
export function isInt(value: string): boolean {
  return isNotNil(value) && INTEGER_REGEXP.test(value);
}
export function isNumber(value: string): boolean {
  return isNotNil(value) && NUMBER_REGEXP.test(value);
}
export function isNumberRange(value: string): boolean {
  return isNotNil(value) && NUMBER_RANGE_REGEXP.test(value);
}
export function isValidUid(value: string): boolean {
  return isNotNil(value) && UID_REGEXP.test(value);
}
export function isValidPubkey(value: string): boolean {
  return isNotNil(value) && PUBKEY_REGEXP.test(value);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getPropertyByPath(obj: any, path: string, defaultValue?: any): any {
  if (isNil(obj)) return defaultValue;
  if (isNilOrBlank(path)) return obj;
  const i = path.indexOf('.');
  // Simple property path
  if (i === -1) {
    const res = obj[path];
    return isNotNil(res) || isNil(defaultValue) ? res : defaultValue;
  }
  // Complex property path
  const key = path.substring(0, i);
  if (isNil(obj[key])) return defaultValue;
  if (obj[key] && typeof obj[key] === 'object') {
    return getPropertyByPath(obj[key], path.substring(i + 1));
  }
  throw new Error(`Invalid property path: '${key}' is not an valid object.`);
}

export function getProperty<T = any, K extends keyof T = any>(obj: T, key: K): T[K] {
  if (isNil(obj)) return undefined;
  return obj[key]; // Inferred type is T[K]
}

export function getPropertyByPathAsString(obj: any, path: string): string | undefined {
  const res = getPropertyByPath(obj, path);
  return res && (typeof res === 'string' ? res : '' + res);
}

export function sleep(ms: number): Promise<void> {
  if (ms <= 0) return Promise.resolve();
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function round(value: number | undefined | null): number {
  if (isNotNilOrNaN(value)) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
  return value;
}

export function equalsOrNil(value1: any, value2: any) {
  return value1 === value2 || (isNil(value1) && isNil(value2));
}

/**
 * remove elements from an array
 *
 * @return the removed elements
 * @param array the array on which elements will be removed
 * @param predicate the selection predicate
 */
export function removeAll<T>(array: T[], predicate: (pmfm: T) => boolean): T[] {
  let nbRemove = 0;
  return array
    .slice()
    .map((value, index) => {
      if (predicate(value)) {
        nbRemove++; // glitch counter to avoid index gap
        return array.splice(index - nbRemove + 1, 1)[0];
      }
      return null;
    })
    .filter(isNotNil);
}

/**
 * remove the first element from an array
 *
 * @return the removed element
 * @param array the array on which the element will be removed
 * @param predicate the selection predicate
 */
export function remove<T>(array: T[], predicate: (pmfm: T) => boolean): T {
  return array.slice().find((value, index) => {
    if (predicate(value)) {
      array.splice(index, 1);
      return true;
    }
    return false;
  });
}

export function capitalizeFirstLetter(value: string) {
  if (!value || value.length === 0) return value;
  return value.substr(0, 1).toUpperCase() + value.substr(1);
}
export function uncapitalizeFirstLetter(value: string) {
  if (!value || value.length === 0) return value;
  return value.substr(0, 1).toLowerCase() + value.substr(1);
}

export function splitByProperty<T, M extends KeyValueType<T> = KeyValueType<T>>(array: T[] | readonly T[], propertyName: keyof T | string): M {
  return (array || []).reduce((res, value) => {
    const key = (value as unknown as any)?.[propertyName];
    if (isNotNil(key)) {
      res[key] = value;
    }
    return res;
  }, {}) as M;
}

export function splitById<T, M extends KeyValueType<T> = KeyValueType<T>>(array: T[] | readonly T[]): M {
  return (array || []).reduce(
    (res, value) => {
      const key = value?.['id'];
      if (isNotNil(key)) {
        res[key] = value;
      }
      return res;
    },
    <M>{}
  );
}

/**
 * Determines if two objects or two values are equivalent.
 *
 * Two objects or values are considered equivalent if at least one of the following is true:
 *
 * * Both objects or values pass `===` comparison.
 * * Both objects or values are of the same type and all of their properties are equal by
 *   comparing them with `equals`.
 *
 * @param o1 Object or value to compare.
 * @param o2 Object or value to compare.
 * @returns true if arguments are equal.
 */
export function equals(o1: any, o2: any): boolean {
  if (o1 === o2) return true;
  if (o1 === null || o2 === null) return false;
  if (o1 !== o1 && o2 !== o2) return true; // NaN === NaN
  const t1 = typeof o1,
    t2 = typeof o2;
  let length: number, key: any, keySet: any;
  if (t1 == t2 && t1 == 'object') {
    if (Array.isArray(o1)) {
      if (!Array.isArray(o2)) return false;
      if ((length = o1.length) == o2.length) {
        for (key = 0; key < length; key++) {
          if (!equals(o1[key], o2[key])) return false;
        }
        return true;
      }
    } else {
      if (Array.isArray(o2)) {
        return false;
      }
      keySet = Object.create(null);
      for (key in o1) {
        if (!equals(o1[key], o2[key])) {
          return false;
        }
        keySet[key] = true;
      }
      for (key in o2) {
        if (!(key in keySet) && typeof o2[key] !== 'undefined') {
          return false;
        }
      }
      return true;
    }
  }
  return false;
}

export class Beans {
  /**
   * Copy a source object, by including only properties of the given dataType.
   * IMPORTANT: extra properties that are NOT in the targetClass are NOT copied.
   *
   * @param source The source object to copy
   * @param dataType the class to use as target class
   * @param keys The keys to copy. If empty, will copy only NOT optional properties from the dataType
   */
  static copy<T>(source: T, dataType: new () => T, keys?: KeysEnum<T>): T {
    if (isNil(source)) return source;
    const target = new dataType();
    Object.keys(keys || target).forEach((key) => {
      target[key] = source[key];
    });
    return target;
  }

  /**
   * Says if an object all all properties to nil
   */
  static isEmpty<T>(
    data: T,
    keys?: KeysEnum<T> | string[],
    opts?: {
      blankStringLikeEmpty?: boolean;
    }
  ): boolean {
    return (
      isNil(data) ||
      (Array.isArray(keys) ? keys : Object.keys(keys || data))
        // Find index of the first NOT nil value
        .findIndex((key) => {
          const value = data[key];
          if (value && typeof value === 'object') return !Beans.isEmpty(value, null, opts); // Loop
          if (opts && opts.blankStringLikeEmpty === true && typeof value === 'string') return isNotNilOrBlank(value);
          return isNotNil(value);
        }) === -1
    );
  }
}
