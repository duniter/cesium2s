import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransferPage } from './transfer.page';
import { AuthGuardService } from '@app/account/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TransferPage,
    canActivate: [AuthGuardService],
  },
  {
    path: 'from/:from',
    pathMatch: 'full',
    component: TransferPage,
    canActivate: [AuthGuardService],
  },
  {
    path: 'to/:to',
    pathMatch: 'full',
    component: TransferPage,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferPageRoutingModule {}
