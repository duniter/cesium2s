import { Pipe, PipeTransform } from '@angular/core';
import { NumberFormatPipe } from '@app/shared/pipes/number-format.pipe';
import { NetworkService } from '@app/network/network.service';
import { isNil } from '@app/shared/functions';

@Pipe({
  name: 'amountFormat',
})
export class AmountFormatPipe extends NumberFormatPipe implements PipeTransform {
  private currencySymbol = this.networkService.currency?.symbol;
  private powBase = this.networkService.currency?.powBase;
  private decimals = this.networkService.currency?.decimals;

  constructor(private networkService: NetworkService) {
    super();
  }

  transform(val: number, opts?: Intl.NumberFormatOptions & { fixedDecimals?: number }): string {
    if (isNil(val)) return '';
    return super.transform(val / this.powBase, { fixedDecimals: this.decimals, ...opts }) + (' ' + this.currencySymbol);
  }
}
