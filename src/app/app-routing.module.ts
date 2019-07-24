import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {HomePage} from './core/home/home';
import {AccountPage} from './core/account/account';
import {AuthGuardService} from './core/core.module';
import {WotSearchPage} from './wot/pages/wot-search';
import {SettingsPage} from "./core/settings/settings.page";

const routeOptions: ExtraOptions = {
  enableTracing: false,
  //enableTracing: !environment.production,
  useHash: false
};

const routes: Routes = [
  // Core path
  {
    path: '',
    component: HomePage
  },

  {
    path: 'home/:action',
    component: HomePage
  },
  {
    path: 'account',
    pathMatch: 'full',
    component: AccountPage,
    canActivate: [AuthGuardService]
  },
  {
    path: 'settings',
    pathMatch: 'full',
    component: SettingsPage
  },


  // Wot
  {
    path: 'wot/search',
    component: WotSearchPage,
    data: {
    }
  },  

  {
    path: "**",
    redirectTo: '/'
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, routeOptions)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
