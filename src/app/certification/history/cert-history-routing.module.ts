import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '@app/account/auth-guard.service';
import { AppCertHistoryModule } from '@app/certification/history/cert-history.module';
import { CertHistoryPage } from '@app/certification/history/cert-history.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'default',
  },
  {
    path: ':address',
    component: CertHistoryPage,
    canActivate: [AuthGuardService],
  },
  {
    path: ':address/:name',
    component: CertHistoryPage,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [AppCertHistoryModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppCertHistoryRoutingModule {}
