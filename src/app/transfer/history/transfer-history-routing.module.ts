import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '@app/account/auth/auth-guard.service';
import { AppTransferHistoryModule } from '@app/transfer/history/transfer-history.module';
import { TransferHistoryPage } from '@app/transfer/history/transfer-history.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'default',
  },
  {
    path: ':address',
    component: TransferHistoryPage,
    canActivate: [AuthGuardService],
  },
  {
    path: ':address/:name',
    component: TransferHistoryPage,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [AppTransferHistoryModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppTransferHistoryRoutingModule {}
