import {Pipe, PipeTransform} from '@angular/core';
import {isNotNil} from '../functions';

@Pipe({
    name: 'isNotEmptyArray'
})
export class NotEmptyArrayPipe implements PipeTransform {

    transform(val: any[]): boolean {
      if (val === undefined || val === null) {
        return false;
      }
      return val.length > 0;
    }
}


@Pipe({
  name: 'isEmptyArray'
})
export class EmptyArrayPipe implements PipeTransform {

  transform(val: any[]): boolean {
    if (val === undefined || val === null) {
      return true;
    }
    return val.length === 0;
  }
}


@Pipe({
  name: 'isArrayLength'
})
export class ArrayLengthPipe implements PipeTransform {

  transform(val: any[], args?: { greaterThan?: number; equals?: number; lessThan?: number }): boolean {
    args = args || {};
    const size = (val === undefined || val === null) ? 0 : val.length;
    if (isNotNil(args.lessThan)) {
      return size < args.lessThan;
    }
    if (isNotNil(args.greaterThan)) {
      return size > args.greaterThan;
    }
    if (isNotNil(args.equals)) {
      return size === args.equals;
    }
    return false;
  }
}

@Pipe({
  name: 'arrayFirst'
})
export class ArrayFirstPipe implements PipeTransform {

  transform<T>(val: T[]): T | undefined {
    return val && val.length > 0 ? val[0] : undefined;
  }
}

@Pipe({
  name: 'arrayPluck'
})
export class ArrayPluckPipe implements PipeTransform {

  transform<T>(val: T[], opts: string | { property: string; omitNil?: boolean }): any[] {
    const property = typeof opts === 'string' ? opts : opts?.property;
    const omitNil = typeof opts === 'string' ? false : opts?.omitNil;
    return (omitNil !== true) ?
      (val || []).map(value => value && value[property]) :
      (val || []).map(value => value && value[property]).filter(isNotNil);
  }
}
@Pipe({
  name: 'arrayJoin'
})
export class ArrayJoinPipe implements PipeTransform {

  transform<T>(val: T[], opts: string | { separator: string; omitNil?: boolean }): string {
    const separator = typeof opts === 'string' ? opts : (opts?.separator || ', ');
    const omitNil = typeof opts === 'string' ? false : opts?.omitNil;
    return (omitNil !== true) ?
      (val || []).join(separator) :
      (val || []).filter(isNotNil).join(separator);
  }
}

@Pipe({
  name: 'arrayIncludes'
})
export class ArrayIncludesPipe implements PipeTransform {

  transform<T>(val: T[], args): boolean {
    return val && val.includes(args) || false;
  }
}


@Pipe({
  name: 'arrayFilter'
})
export class ArrayFilterPipe implements PipeTransform {

   transform<T>(val: T[], filterFn: (T) => boolean): T[] {
    return val && val.filter(filterFn);
  }
}
