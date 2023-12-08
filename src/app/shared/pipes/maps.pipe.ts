import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapGet',
})
@Injectable({ providedIn: 'root' })
export class MapGetPipe implements PipeTransform {
  transform<V, K extends keyof V>(val: V, args: K | { key: K }): V[K] {
    if (!val) return null;
    const key = (args && typeof args === 'object' ? args.key : args) as K;
    if (!key) return null;
    return val[key];
  }
}

@Pipe({
  name: 'mapKeys',
})
@Injectable({ providedIn: 'root' })
export class MapKeysPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(map: any): any[] {
    if (!map) return null;
    return Object.keys(map);
  }
}

@Pipe({
  name: 'mapValues',
})
@Injectable({ providedIn: 'root' })
export class MapValuesPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(map: any): any[] {
    if (!map) return null;
    return Object.values(map);
  }
}
