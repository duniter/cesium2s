import { Pipe, PipeTransform } from '@angular/core';
import { NumberFormatPipe } from '@app/shared/pipes/number-format.pipe';
import { NetworkService } from '@app/network/network.service';
import { isNilOrNaN } from '@app/shared/functions';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SettingsService } from '@app/settings/settings.service';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'amountFormat',
})
export class AmountFormatPipe extends NumberFormatPipe implements PipeTransform {
  private currencySymbol = this.networkService.currency?.symbol;
  private powBase = this.networkService.currency?.powBase;
  private decimals = this.networkService.currency?.decimals;
  private currentUd: number = this.networkService.currentUd;
  constructor(
    private networkService: NetworkService,
    private settings: SettingsService,
    private translate: TranslateService,
    private sanitizer: DomSanitizer
  ) {
    super();
  }

  transform(amount: number, opts?: Intl.NumberFormatOptions & { fixedDecimals?: number; html?: boolean }): SafeHtml {
    if (isNilOrNaN(amount)) return '';
    switch (this.settings.displayUnit) {
      case 'du': {
        if (opts?.html === false) {
          return (
            super.transform((amount / this.powBase) | this.currentUd, { fixedDecimals: this.decimals + 1, ...opts }) +
            ` ${this.translate.instant('COMMON.UD')}(${this.currencySymbol})`
          );
        }
        return this.sanitizer.bypassSecurityTrustHtml(
          super.transform(amount / this.powBase / this.currentUd, { fixedDecimals: this.decimals + 1, ...opts }) +
            ` ${this.translate.instant('COMMON.UD')}<sub>${this.currencySymbol}</sub>`
        );
      }
      default:
        return super.transform(amount / this.powBase, { fixedDecimals: this.decimals, ...opts }) + (' ' + this.currencySymbol);
    }
  }
}
