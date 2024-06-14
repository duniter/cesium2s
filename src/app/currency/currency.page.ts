import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NetworkService } from '@app/network/network.service';
import { AppPage, AppPageState } from '@app/shared/pages/base-page.class';
import { TranslateService } from '@ngx-translate/core';
import { u32, u64 } from '@polkadot/types';
import { RxState } from '@rx-angular/state';
import { RxStateProperty } from '@app/shared/decorator/state.decorator';
import { SettingsService } from '@app/settings/settings.service';
import { CurrencyDisplayUnit } from '@app/settings/settings.model';
import { map } from 'rxjs/operators';
import { toBoolean } from '@app/shared/functions';

export interface CurrencyParameters {
  currencyName: string;
  currencyNetwork: string;
  currencySymbol: SafeHtml;
  members: number;
  monetaryMass: number;
  unitsPerUd: number;
  udCreationPeriodMs: number;
  udReevalPeriodMs: number;
  growthRate: number;
}

export interface CurrencyPageState extends AppPageState {
  params: CurrencyParameters;
  paramsByUnit: Map<CurrencyDisplayUnit, CurrencyParameters>;
  useRelativeUnit: boolean;
  displayUnit: CurrencyDisplayUnit;
  showAllRules: boolean;
}

@Component({
  selector: 'app-currency',
  templateUrl: './currency.page.html',
  styleUrls: ['./currency.page.scss'],
  providers: [RxState],
})
export class CurrencyPage extends AppPage<CurrencyPageState> {
  @RxStateProperty() protected params: CurrencyParameters;
  @RxStateProperty() protected useRelativeUnit: boolean;

  @Input() @RxStateProperty() showAllRules: boolean;
  @Input() @RxStateProperty() displayUnit: CurrencyDisplayUnit;

  constructor(
    protected networkService: NetworkService,
    protected translate: TranslateService,
    protected settings: SettingsService,
    private sanitizer: DomSanitizer
  ) {
    super({ name: 'currency-service' });

    // Watch settings
    this._state.connect('useRelativeUnit', this.settings.displayUnit$.pipe(map((unit) => unit === 'du')));

    this._state.connect('displayUnit', this._state.select('useRelativeUnit').pipe(map((useRelativeUnit) => (useRelativeUnit ? 'du' : 'base'))));

    this._state.connect(
      'params',
      this._state.select(['paramsByUnit', 'displayUnit'], (res) => res).pipe(map(({ paramsByUnit, displayUnit }) => paramsByUnit.get(displayUnit)))
    );
  }

  protected async ngOnLoad(): Promise<Partial<CurrencyPageState>> {
    const showAllRules = toBoolean(this.showAllRules, false);
    const useRelativeUnit = toBoolean(this.useRelativeUnit, false);
    const network = await this.networkService.ready();
    const api = network.api;
    const currency = network.currency;
    const fractionsPerUnit = Math.pow(10, currency.decimals);
    const [monetaryMassFractions, members] = await Promise.all([
      api.query.universalDividend.monetaryMass(),
      api.query.membership.counterForMembership(),
    ]);
    const duValue = (api.consts.universalDividend.unitsPerUd as u64).toNumber() / fractionsPerUnit;
    const growthRate = Math.sqrt((api.consts.universalDividend.squareMoneyGrowthRate as u64).toNumber());
    const paramsByUnit = new Map<CurrencyDisplayUnit, CurrencyParameters>();
    paramsByUnit.set('base', {
      currencyName: currency.displayName,
      currencySymbol: currency.symbol,
      currencyNetwork: currency.network,
      monetaryMass: (monetaryMassFractions as u64).toNumber() / fractionsPerUnit,
      members: (members as u32).toNumber(),
      unitsPerUd: duValue,
      udCreationPeriodMs: (api.consts.universalDividend.udCreationPeriod as u64).toNumber(),
      udReevalPeriodMs: (api.consts.universalDividend.udReevalPeriod as u64).toNumber(),
      growthRate,
    });
    paramsByUnit.set('du', {
      currencyName: currency.displayName,
      currencySymbol: this.sanitizer.bypassSecurityTrustHtml(`${this.translate.instant('COMMON.UD')}<sub>${currency.symbol}</sub>`),
      currencyNetwork: currency.network,
      monetaryMass: (monetaryMassFractions as u64).toNumber() / fractionsPerUnit / duValue,
      members: (members as u32).toNumber(),
      unitsPerUd: 1,
      udCreationPeriodMs: (api.consts.universalDividend.udCreationPeriod as u64).toNumber(),
      udReevalPeriodMs: (api.consts.universalDividend.udReevalPeriod as u64).toNumber(),
      growthRate,
    });

    return { paramsByUnit, showAllRules, useRelativeUnit };
  }
}
