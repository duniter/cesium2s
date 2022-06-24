import {Pipe, PipeTransform} from '@angular/core';
import {getPropertyByPath} from '../functions';

@Pipe({
    name: 'propertyGet'
})
export class PropertyGetPipe implements PipeTransform {

    transform(obj: any, opts: string | {key: string; defaultValue?: any } ): any {
      return getPropertyByPath(obj,
        // Path
        opts && (typeof opts === 'string' ? opts : opts.key),
        // Default value
        opts && (opts as any).defaultValue);
    }
}
