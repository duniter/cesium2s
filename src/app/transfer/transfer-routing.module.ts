import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TransferPage} from './transfer.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TransferPage
  },
  {
    path: 'from/:from',
    pathMatch: 'full',
    component: TransferPage
  },
  {
    path: 'to/:to',
    pathMatch: 'full',
    component: TransferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferPageRoutingModule {}
