import { Pipe, PipeTransform } from '@angular/core';
import { formatPubkey } from '@app/shared/currencies';

@Pipe({
  name: 'pubkeyFormat',
})
export class PubkeyFormatPipe implements PipeTransform {
  transform(value: string): string {
    return formatPubkey(value);
  }
}
