import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WalletPage } from './wallet.page';
import { AuthGuardService } from '@app/account/auth/auth-guard.service';
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
    path: 'tx',
    loadChildren: () => import('@app/transfer/history/transfer-history-routing.module').then((m) => m.AppTransferHistoryRoutingModule),
  },
  {
    path: 'cert',
    loadChildren: () => import('@app/certification/history/cert-history-routing.module').then((m) => m.AppCertHistoryRoutingModule),
  },
];

@NgModule({
  imports: [AppWalletModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppWalletRoutingModule {}
