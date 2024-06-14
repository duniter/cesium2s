import { NgModule } from '@angular/core';

import { AppSharedModule } from '@app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyPage } from './currency.page';

@NgModule({
  imports: [AppSharedModule, TranslateModule.forChild()],
  declarations: [CurrencyPage],
  exports: [CurrencyPage],
})
export class AppCurrencyModule {
  constructor() {
    console.debug('[settings] Creating module');
  }
}
