import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '@app/account/auth-guard.service';
import { WalletTxPage } from '@app/history/wallet-tx.page';
import { AppWalletTxModule } from '@app/history/wallet-tx.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'default',
  },
  {
    path: ':address',
    component: WalletTxPage,
    canActivate: [AuthGuardService],
  },
  {
    path: ':address/:name',
    component: WalletTxPage,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [AppWalletTxModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppWalletTxRoutingModule {}
