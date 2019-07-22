import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'numberFormat'
})
@Injectable()
export class NumberFormatPipe implements PipeTransform {

    transform(val: number): string | Promise<string> {
      // Format the output to display any way you want here.
      // For instance:
      if (val !== undefined && val !== null) {
        return val.toLocaleString(/*arguments you need*/);
      } else {
        return '';
      }
    }
}
