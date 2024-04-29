import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NetworkService } from '@app/network/network.service';
import { AppPage, AppPageState } from '@app/shared/pages/base-page.class';
import { TranslateService } from '@ngx-translate/core';
import { u32, u64 } from '@polkadot/types';
import { RxState } from '@rx-angular/state';

export interface CurrencyParameters {
  currencyName: SafeHtml;
  currencyNetwork: string;
  members: number;
  monetaryMass: number;
  unitsPerUd: number;
  udCreationPeriodMs: number;
  udReevalPeriodMs: number;
}

export interface CurrencyPageState extends AppPageState {
  params: { [key: string]: CurrencyParameters };
}

@Component({
  selector: 'app-currency',
  templateUrl: './currency.page.html',
  styleUrls: ['./currency.page.scss'],
  providers: [RxState],
})
export class CurrencyPage extends AppPage<CurrencyPageState> {
  params: { [key: string]: CurrencyParameters };

  @Input() showAllRules: boolean;
  @Input()
  get showUnitsInDU(): boolean {
    return this.units === 'du';
  }
  set showUnitsInDU(showInDu: boolean) {
    this.units = showInDu ? 'du' : 'base';
  }
  units: 'du' | 'base' = 'base';

  constructor(
    protected networkService: NetworkService,
    protected translate: TranslateService,
    private sanitizer: DomSanitizer
  ) {
    super({ name: 'currency-service' });
  }

  protected async ngOnLoad(): Promise<Partial<CurrencyPageState>> {
    this.showAllRules = false;
    this.showUnitsInDU = false;
    const networkService = await this.networkService.ready();
    const api = networkService.api;
    const currency = networkService.currency;
    const fractionsPerUnit = Math.pow(10, currency.decimals);
    const [monetaryMassFractions, members] = await Promise.all([
      api.query.universalDividend.monetaryMass(),
      api.query.membership.counterForMembership(),
    ]);
    const duValue = (api.consts.universalDividend.unitsPerUd as u64).toNumber() / fractionsPerUnit;
    this.params = {
      base: {
        currencyName: currency.displayName,
        currencyNetwork: currency.network,
        monetaryMass: (monetaryMassFractions as u64).toNumber() / fractionsPerUnit,
        members: (members as u32).toNumber(),
        unitsPerUd: duValue,
        udCreationPeriodMs: (api.consts.universalDividend.udCreationPeriod as u64).toNumber(),
        udReevalPeriodMs: (api.consts.universalDividend.udReevalPeriod as u64).toNumber(),
      },
      du: {
        currencyName: this.sanitizer.bypassSecurityTrustHtml(`${this.translate.instant('UD')}<sub>${currency.displayName}</sub>`),
        currencyNetwork: currency.network,
        monetaryMass: (monetaryMassFractions as u64).toNumber() / fractionsPerUnit / duValue,
        members: (members as u32).toNumber(),
        unitsPerUd: 1,
        udCreationPeriodMs: (api.consts.universalDividend.udCreationPeriod as u64).toNumber(),
        udReevalPeriodMs: (api.consts.universalDividend.udReevalPeriod as u64).toNumber(),
      },
    };

    return { params: this.params };
  }
}
