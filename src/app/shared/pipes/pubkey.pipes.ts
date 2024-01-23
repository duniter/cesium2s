import { Pipe, PipeTransform } from '@angular/core';
import { formatPubkey } from '@app/shared/currencies';

@Pipe({
  name: 'pubkeyFormat',
})
export class PubkeyFormatPipe implements PipeTransform {
  transform(value: string, withChecksum?: boolean): string {
    return formatPubkey(value, withChecksum);
  }
}
