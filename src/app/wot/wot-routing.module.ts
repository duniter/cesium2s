import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WotLookupPage } from './wot-lookup.page';
import { WotDetailsPage } from '@app/wot/wot-details.page';
import { AppWotModule } from '@app/wot/wot.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WotLookupPage,
  },
  {
    path: ':address',
    pathMatch: 'full',
    component: WotDetailsPage,
  },
  {
    path: 'tx',
    loadChildren: () => import('@app/transfer/history/transfer-history-routing.module').then((m) => m.AppTransferHistoryRoutingModule),
  },
  {
    path: 'cert',
    loadChildren: () => import('@app/certification/history/cert-history-routing.module').then((m) => m.AppCertHistoryRoutingModule),
  },
];

@NgModule({
  imports: [AppWotModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppWotRoutingModule {}
