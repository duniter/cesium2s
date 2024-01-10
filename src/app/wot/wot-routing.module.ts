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
];

@NgModule({
  imports: [AppWotModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppWotRoutingModule {}
