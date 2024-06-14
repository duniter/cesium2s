import { Pipe, PipeTransform } from '@angular/core';
import { NumberFormatPipe } from '@app/shared/pipes/number-format.pipe';
import { NetworkService } from '@app/network/network.service';
import { isNil } from '@app/shared/functions';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SettingsService } from '@app/settings/settings.service';
import { u64 } from '@polkadot/types';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'amountFormat',
})
export class AmountFormatPipe extends NumberFormatPipe implements PipeTransform {
  private currencySymbol = this.networkService.currency?.symbol;
  private powBase = this.networkService.currency?.powBase;
  private decimals = this.networkService.currency?.decimals;
  private udValue: number;
  constructor(
    private networkService: NetworkService,
    private settings: SettingsService,
    private translate: TranslateService,
    private sanitizer: DomSanitizer
  ) {
    super();
    this.udValue = (networkService.api.consts.universalDividend.unitsPerUd as u64).toNumber();
  }

  transform(val: number, opts?: Intl.NumberFormatOptions & { fixedDecimals?: number; html?: boolean }): SafeHtml {
    if (isNil(val)) return '';
    switch (this.settings.displayUnit) {
      case 'du': {
        if (opts?.html === false) {
          return (
            super.transform(val / this.udValue / this.powBase, { fixedDecimals: this.decimals, ...opts }) +
            ` ${this.translate.instant('COMMON.UD')}(${this.currencySymbol})`
          );
        }
        return this.sanitizer.bypassSecurityTrustHtml(
          super.transform(val / this.udValue / this.powBase, { fixedDecimals: this.decimals, ...opts }) +
            ` ${this.translate.instant('COMMON.UD')}<sub>${this.currencySymbol}</sub>`
        );
      }
      default:
        return super.transform(val / this.powBase, { fixedDecimals: this.decimals, ...opts }) + (' ' + this.currencySymbol);
    }
  }
}
