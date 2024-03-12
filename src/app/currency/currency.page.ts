import { Component } from '@angular/core';
import { Currency } from '@app/currency/currency.model';
import { NetworkService } from '@app/network/network.service';
import { AppPage, AppPageState } from '@app/shared/pages/base-page.class';
import { RxState } from '@rx-angular/state';

export interface CurrencyPageState extends AppPageState {
  currency: Currency;
}

@Component({
  selector: 'app-currency',
  templateUrl: './currency.page.html',
  styleUrls: ['./currency.page.scss'],
  providers: [RxState],
})
export class CurrencyPage extends AppPage<CurrencyPageState> {
  currency: Currency;

  constructor(protected networkService: NetworkService) {
    super({ name: 'currency-service' });
  }

  protected async ngOnLoad(): Promise<Partial<CurrencyPageState>> {
    const networkService = await this.networkService.ready();
    this.currency = networkService.currency;
    console.log(this.currency);
    return { currency: this.currency };
  }
}
