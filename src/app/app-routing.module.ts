import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { environment } from '@environments/environment';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'wallet',
    loadChildren: () => import('@app/account/wallet/wallet-routing.module').then((m) => m.AppWalletRoutingModule),
  },
  {
    path: 'history',
    loadChildren: () => import('@app/transfer/history/transfer-history-routing.module').then((m) => m.AppTransferHistoryRoutingModule),
  },
  {
    path: 'transfer',
    loadChildren: () => import('./transfer/send/transfer-routing.module').then((m) => m.AppTransferRoutingModule),
  },
  {
    path: 'scan',
    loadChildren: () => import('./scan/scan-routing.module').then((m) => m.AppScanRoutingModule),
  },
  {
    path: 'wot',
    loadChildren: () => import('./wot/wot-routing.module').then((m) => m.AppWotRoutingModule),
  },
  {
    path: 'block',
    loadChildren: () => import('./block/block-routing.module').then((m) => m.AppBlockRoutingModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings-routing.module').then((m) => m.AppSettingsRoutingModule),
  },

  // -- DEV only
  {
    path: 'playground',
    loadChildren: () => import('./playground/playground.module').then((m) => m.PlaygroundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: environment.useHash || false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
