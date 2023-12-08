import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WalletPage } from './wallet.page';
import { AuthGuardService } from '@app/account/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'default',
  },
  {
    path: ':address',
    component: WalletPage,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletPageRoutingModule {}
