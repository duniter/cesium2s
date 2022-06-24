import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

    transform(val: number, opts?: Intl.NumberFormatOptions & {fixedDecimals?: number}): string | Promise<string> {
      // Format the output to display any way you want here.
      // For instance:
      if (val !== undefined && val !== null) {
        if (opts?.fixedDecimals) {
          return val.toFixed(opts.fixedDecimals);
        }
        return val.toLocaleString(undefined, opts);
      } else {
        return '';
      }
    }
}
