import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WotLookupPage } from './wot-lookup.page';
import {WotDetailsPage} from "@app/wot/wot-details.page";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WotLookupPage
  },
  {
    path: ':address',
    pathMatch: 'full',
    component: WotDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WotRoutingModule {}
