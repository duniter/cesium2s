import {Moment} from "moment/moment";
import {
  attributeComparator,
  fromDateISOString,
  isNil,
  isNilOrBlank,
  isNotNil,
  joinProperties,
  sort,
  toDateISOString
} from "../../shared/shared.module";
import {Observable} from "rxjs";

export {
  joinProperties,
  attributeComparator,
  sort
};

export const StatusIds = {
  WALLET: 0,
  MEMBER: 1,
  PENDING: 2
}

export const REGEXP = {
  UID: /^[0-9a-zA-Z-_]+$/
}

export declare interface PropertyValue {
  key: string;
  value: string;
}
export declare interface PropertiesMap {
  [key: string]: string;
}

export declare type ConfigOptionType = 'integer' | 'double' | 'boolean' | 'string' | 'enum' | 'color';

export declare interface ConfigOption {
  key: string;
  label: string;
  defaultValue?: any;
  isTransient?: boolean; // Useful only for remote configuration
  values?: PropertyValue[];
  type: ConfigOptionType;
}

export const ConfigOptions = {
  COLOR_PRIMARY: {
    key: 'theme.color.primary',
    label: 'SETTINGS.OPTIONS.COLORS.PRIMARY',
    type: 'color'
  },
  COLOR_SECONDARY: {
    key: 'theme.color.secondary',
    label: 'SETTINGS.OPTIONS.COLORS.SECONDARY',
    type: 'color'
  },
  COLOR_TERTIARY: {
    key: 'theme.color.tertiary',
    label: 'SETTINGS.OPTIONS.COLORS.TERTIARY',
    type: 'color'
  }
};

export type UserProfileLabel = 'ADMIN' | 'MEMBER' | 'USER' | 'GUEST';

export const PRIORITIZED_USER_PROFILES: UserProfileLabel[] = ['ADMIN', 'MEMBER', 'USER', 'GUEST'];

export function getMainProfile(profiles?: string[]): UserProfileLabel {
  return profiles && profiles.length && PRIORITIZED_USER_PROFILES.find(pp => profiles.indexOf(pp) > -1) || 'GUEST';
}

export function getMainProfileIndex(profiles?: string[]): number {
  if (!profiles && !profiles.length) return PRIORITIZED_USER_PROFILES.length - 1; // return last profile
  const index = PRIORITIZED_USER_PROFILES.findIndex(pp => profiles.indexOf(pp) > -1);
  return (index !== -1) ? index : (PRIORITIZED_USER_PROFILES.length - 1);
}

export function hasUpperOrEqualsProfile(actualProfiles: string[], expectedProfile: UserProfileLabel): boolean {
  const expectedProfileIndex = PRIORITIZED_USER_PROFILES.indexOf(expectedProfile);
  return expectedProfileIndex !== -1 && getMainProfileIndex(actualProfiles) <= expectedProfileIndex;
}

export declare interface Cloneable<T> {
  clone(): T;
}


export function entityToString(obj: Entity<any> | any, properties?: String[]): string | undefined {
  return obj && obj.id && joinProperties(obj, properties || ['name']) || undefined;
}

export function personToString(obj: Person): string {
  return obj && obj.id && (obj.lastName + ' ' + obj.firstName) || undefined;
}

export function personsToString(data: Person[], separator?: string): string {
  if (!data || !data.length) return '';
  separator = separator || ", ";
  return data.reduce((result: string, person: Person, index: number) => {
    return index ? (result + separator + personToString(person)) : personToString(person);
  }, '');
}

export interface IEntity<ID> {
  id: ID;
}

export abstract class Entity<T, ID = any> implements IEntity<ID>, Cloneable<T> {

  abstract get id(): ID;
  abstract clone(): T;

  asObject(minify?: boolean): any {
    const target: any = Object.assign({}, this);
    return target;
  }

  fromObject(source: any): Entity<T, ID> {
    Object.assign(this, source|| {});
    return this;
  }

  equals(other: Entity<T, ID>): boolean {
    return other && this.id === other.id;
  }
}

export class EntityUtils {
  static isNotEmpty(obj: any | Entity<any>): boolean {
    return !!obj && obj['id'];
  }

  static isEmpty(obj: any | Entity<any>): boolean {
    return !obj || !obj['id'];
  }

  static getPropertyByPath(obj: any | Entity<any>, path: string): any {
    if (isNil(obj)) return undefined;
    const i = path.indexOf('.');
    if (i === -1) {
      return obj[path];
    }
    const key = path.substring(0, i);
    if (isNil(obj[key])) return undefined;
    if (obj[key] && typeof obj[key] === "object") {
      return EntityUtils.getPropertyByPath(obj[key], path.substring(i + 1));
    }
    throw new Error(`Invalid form path: '${key}' is not an valid object.`);
  }

  static getMapAsArray(source?: Map<string, string>): { key: string; value?: string; }[] {
    return Object.getOwnPropertyNames(source || {})
      .map(key => {
        return {
          key,
          value: source[key]
        };
      });
  }

  static getArrayAsMap(source?: { key: string; value?: string; }[]): Map<string, string> {
    const target = new Map<string, string>();
    (source || []).forEach(item => target.set(item.key, item.value));
    return target;
  }

  static getObjectAsArray(source?: { [key: string]: string }): { key: string; value?: string; }[] {
    return Object.getOwnPropertyNames(source || {})
      .map(key => {
        return {
          key,
          value: source[key]
        };
      });
  }

  static getArrayAsObject(source?: { key: string; value?: string; }[]): { [key: string]: string } {
    return (source || []).reduce((res, item) => {
      res[item.key] = item.value;
      return res;
    }, {});
  }

  static equals(o1: Entity<any>, o2: Entity<any>): boolean {
    return (!!o1 === !!o2) || (o1 && o2 && o1.id === o2.id);
  }

  static sort<T extends Entity<T> | any>(data: T[], sortBy?: string, sortDirection?: string): T[] {
    const after = (!sortDirection || sortDirection === 'asc') ? 1 : -1;
    return data.sort((a, b) => {
      const valueA = EntityUtils.getPropertyByPath(a, sortBy);
      const valueB = EntityUtils.getPropertyByPath(b, sortBy);
      return valueA === valueB ? 0 : (valueA > valueB ? after : (-1 * after));
    });
  }
}

/* -- Person -- */

export class Person extends Entity<Person, string> implements Cloneable<Person> {

  static fromObject(source: any): Person {
    if (!source || source instanceof Person) return source;
    const result = new Person();
    result.fromObject(source);
    return result;
  }

  uid: string;
  pubkey: string;

  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  creationDate: Date | Moment;
  statusId: number;
  profiles: UserProfileLabel[];
  mainProfile: UserProfileLabel;

  constructor() {
    super();
  }

  get id(): any {
    return this.pubkey
  }

  clone(): Person {
    const target = new Person();
    this.copy(target);
    return target;
  }

  copy(target: Person) {
    Object.assign(target, this);
    target.profiles = this.profiles && this.profiles.slice(0) || undefined;
  }

  asObject(minify?: boolean): any {
    if (minify) return {id: this.id}; // minify=keep id only
    const target: any = super.asObject();
    target.profiles = this.profiles && this.profiles.slice(0) || [];
    // Set profile list from the main profile
    target.profiles = this.mainProfile && [this.mainProfile] || target.profiles || ['GUEST'];
    target.creationDate = toDateISOString(this.creationDate);

    if (!minify) target.mainProfile = getMainProfile(target.profiles);
    return target;
  }

  fromObject(source: any): Person {
    super.fromObject(source);
    this.uid = source.uid;
    this.pubkey = source.pubkey;
    this.firstName = source.firstName;
    this.lastName = source.lastName;
    this.email = source.email;
    this.creationDate = fromDateISOString(source.creationDate);
    this.avatar = source.avatar;
    this.statusId = source.statusId;
    this.profiles = source.profiles && source.profiles.slice(0) || [];
    // Add main profile to the list, if need
    if (source.mainProfile && !this.profiles.find(p => p === source.mainProfile)) {
      this.profiles = this.profiles.concat(source.mainProfile);
    }
    this.mainProfile = getMainProfile(this.profiles);
    return this;
  }
}

export class UserSettings extends Entity<UserSettings, string>  {
  static fromObject(source: any): UserSettings {
    if (!source) return undefined;
    const target = new UserSettings();
    target.fromObject(source);
    return target;
  }

  locale: string;
  content: {};
  nonce: string;

  get id(): string {
    return "SETTINGS"; // TODO
  }

  clone(): UserSettings {
    return UserSettings.fromObject(this.asObject());
  }

  asObject(minify?: boolean): any {
    const res: any = super.asObject(minify);
    res.content = this.content && JSON.stringify(res.content) || undefined;
    return res;
  }

  fromObject(source: any): UserSettings {
    super.fromObject(source);
    this.locale = source.locale;
    if (isNil(source.content) || typeof source.content === 'object') {
      this.content = source.content || {};
    } else {
      this.content = source.content && JSON.parse(source.content) || {};
    }
    this.nonce = source.nonce;
    return this;
  }
}

/**
 * A user account
 */
export class Account extends Person {

  static fromObject(source: any): Account {
    if (!source || source instanceof Account) return source;
    const result = new Account();
    result.fromObject(source);
    return result;
  }

  settings: UserSettings;

  constructor() {
    super();
    this.settings = new UserSettings();
  }

  clone(): Account {
    const target = new Account();
    super.copy(target);
    return target;
  }

  copy(target: Account): Account {
    super.copy(target);
    target.settings = this.settings && this.settings.clone() || undefined;
    return target;
  }

  asObject(minify?: boolean): any {
    const target: any = super.asObject();
    target.settings = this.settings && this.settings.asObject() || undefined;
    return target;
  }

  fromObject(source: any): Account {
    super.fromObject(source);
    source.settings && this.settings.fromObject(source.settings);
    return this;
  }
}

/* -- Network -- */


/* -- Local settings -- */
export declare interface LocalSettings {
  pages?: any;
  peerUrl?: string;
  locale?: string;
  mobile?: boolean;
  accountInheritance?: boolean;
  touchUi?: boolean;
  fields?: PropertyValue[];
  properties?: PropertiesMap;
}
