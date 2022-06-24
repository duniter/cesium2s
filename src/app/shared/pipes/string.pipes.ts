import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {changeCaseToUnderscore, isNilOrBlank, isNotNilOrBlank} from '../functions';

@Pipe({
  name: 'isNotNilOrBlank'
})
export class IsNotNilOrBlankPipe implements PipeTransform {
  transform(value: string): boolean {
    return isNotNilOrBlank(value);
  }
}

@Pipe({
  name: 'isNilOrBlank'
})
export class IsNilOrBlankPipe implements PipeTransform {
  transform(value: string): boolean {
    return isNilOrBlank(value);
  }
}

@Pipe({
  name: 'toString'
})
export class ToStringPipe implements PipeTransform {
  transform(value: number): string {
    return (value !== null && value !== undefined) ? value.toString() : '';
  }
}


@Pipe({
  name: 'strLength'
})
@Injectable({providedIn: 'root'})
export class StrLengthPipe implements PipeTransform {
  transform(value: string): number {
    return value && value.length || 0;
  }
}


@Pipe({
  name: 'strIncludes'
})
export class StrIncludesPipe implements PipeTransform {
  transform(value: string, searchString: string, position?: number): boolean {
    return value?.includes(searchString, position) || false;
  }
}

/*
 * Transform a string into valid i18n key
 * Usage:
 *   value | translatable
 * Example:
 *   {{ 'myPropertyName' | translatable}}
 *   formats to: MY_PROPERTY_PATH
*/
@Pipe({
  name: 'translatable'
})
export class TranslatablePipe implements PipeTransform {
  transform(value: string): string {
    return changeCaseToUnderscore(value)?.toUpperCase();
  }
}
