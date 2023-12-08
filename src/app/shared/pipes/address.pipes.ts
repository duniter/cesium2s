import { Pipe, PipeTransform } from '@angular/core';
import { formatAddress } from '@app/shared/currencies';

@Pipe({
  name: 'addressFormat',
})
export class AddressFormatPipe implements PipeTransform {
  transform(value: string): string {
    return formatAddress(value);
  }
}
