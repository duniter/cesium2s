import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CurrencyPage } from './currency.page';
import { AppCurrencyModule } from './currency.module';

const routes: Routes = [
  {
    path: '',
    component: CurrencyPage,
  },
];

@NgModule({
  imports: [AppCurrencyModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppCurrencyRoutingModule {}
