import { Injectable } from '@angular/core';
import { RxStartableService } from '@app/shared/services/rx-startable-service.class';
import { Promise } from '@rx-angular/cdk/zone-less/browser';
import { RxStateProperty, RxStateSelect } from '@app/shared/decorator/state.decorator';
import { Observable } from 'rxjs';
import { Currency } from '@app/currency/currency.model';

export interface Context {
  currency: Currency;
  qrcode: string;

  //address: string;
  //amount: number;
}

@Injectable({
  providedIn: 'root',
})
export class ContextService<T extends Context = Context> extends RxStartableService<T> {
  @RxStateSelect() currency$: Observable<Currency>;
  @RxStateProperty() currency: Currency;

  @RxStateSelect() qrcode$: Observable<string>;
  @RxStateProperty() qrcode: string;

  constructor() {
    super();
  }

  protected ngOnStart(): Promise<T> {
    return Promise.resolve(<T>{});
  }
}
