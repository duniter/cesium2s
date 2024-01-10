import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransferPage } from './transfer.page';
import { AuthGuardService } from '@app/account/auth-guard.service';
import { AppTransferModule } from '@app/transfer/transfer.module';

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
  imports: [AppTransferModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppTransferRoutingModule {}
