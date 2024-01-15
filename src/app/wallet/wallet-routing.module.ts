import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WalletPage } from './wallet.page';
import { AuthGuardService } from '@app/account/auth-guard.service';
import { AppWalletModule } from '@app/wallet/wallet.module';

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
  {
    path: 'tx/:address',
    component: WalletPage,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [AppWalletModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppWalletRoutingModule {}
