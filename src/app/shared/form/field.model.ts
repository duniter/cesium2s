import {ElementRef} from "@angular/core";
import {MatAutocompleteFieldConfig} from "../material/material.autocomplete";



export declare type FormFieldType = 'integer' | 'double' | 'boolean' | 'string' | 'enum' | 'color' | 'peer' | 'entity';

export declare interface FieldEnumValue {
  key: string;
  value: string;
}

export declare interface FormFieldDefinition<T = any> {
  key: string;
  label: string;
  defaultValue?: any;
  isTransient?: boolean; // Useful only for remote configuration
  values?: FieldEnumValue[];
  type: FormFieldType;
  autocomplete?: MatAutocompleteFieldConfig<T>;
  extra?: {
    [key: string]: {
      disable: boolean;
      required: boolean
    }
  };
}

export declare interface FocusableElement {
  focus();
}
export declare interface InputElement {
  focus();
  tabindex?: number;
  tabIndex?: number;
  value: any;
}

export function isFocusableElement(object: any): object is FocusableElement {
  if (!object) return false;
  return 'focus' in object;
}

export function isInputElement(object: any): object is InputElement {
  if (!object) return false;
  return (('focus' in object) && ('tabindex' in object || 'tabIndex' in object));
}

export function asInputElement(object: ElementRef): InputElement|undefined {
  if (object) {
    if (isInputElement(object)) return object;
    if (object.nativeElement && isInputElement(object.nativeElement)) return object.nativeElement;
  }
  return undefined;
}
