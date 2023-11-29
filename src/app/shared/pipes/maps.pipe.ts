import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mapGet'
})
@Injectable({providedIn: 'root'})
export class MapGetPipe implements PipeTransform {

    transform(val: any, args: string | number | {key: string | number} ): any {
      if (!val) return null;
      const key = (args && typeof args === 'object' ? args.key : args) as any;
      if (!key) return null;
      return val[key];
    }
}

@Pipe({
  name: 'mapKeys'
})
@Injectable({providedIn: 'root'})
export class MapKeysPipe implements PipeTransform {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(map: any): any[] {
    if (!map) return null;
    return Object.keys(map);
  }
}

@Pipe({
  name: 'mapValues'
})
@Injectable({providedIn: 'root'})
export class MapValuesPipe implements PipeTransform {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(map: any): any[] {
    if (!map) return null;
    return Object.values(map);
  }
}
