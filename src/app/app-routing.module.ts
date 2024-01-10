import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    loadChildren: () => import('./wallet/wallet-routing.module').then((m) => m.AppWalletRoutingModule),
  },
  {
    path: 'transfer',
    loadChildren: () => import('./transfer/transfer-routing.module').then((m) => m.AppTransferRoutingModule),
  },
  {
    path: 'wot',
    loadChildren: () => import('./wot/wot-routing.module').then((m) => m.AppWotRoutingModule),
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
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
