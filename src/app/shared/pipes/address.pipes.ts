import { Pipe, PipeTransform } from '@angular/core';
import { address2PubkeyV1, formatAddress } from '@app/shared/currencies';

@Pipe({
  name: 'addressFormat',
})
export class AddressFormatPipe implements PipeTransform {
  transform(value: string): string {
    return formatAddress(value);
  }
}

@Pipe({
  name: 'addressToPubkeyV1',
})
export class AddressToPubkeyPipePipe implements PipeTransform {
  transform(address: string, ss58Format?: number): string {
    return address2PubkeyV1(address, ss58Format);
  }
}
