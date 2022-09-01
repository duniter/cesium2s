import {Component} from '@angular/core';
import {PlatformService} from "./shared/services/platform.service";
import {environment} from "@environments/environment";
import {AccountService} from "@app/wallet/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  appName = environment.name;
  appPages = [

    { title: 'MENU.HOME', url: '/home', icon: 'home' },
    { title: 'MENU.ACCOUNT', url: '/wallet', icon: 'card' },
    { title: 'COMMON.BTN_SEND_MONEY', url: '/transfer', icon: 'paper-plane' },

    // { title: 'Messages', url: '/message/inbox', icon: 'mail' },

    { title: 'MENU.WOT', url: '/wot', icon: 'people' },

    { title: 'MENU.SETTINGS', url: '/settings', icon: 'settings' },

    { title: 'HOME.BTN_CHANGE_ACCOUNT', icon: 'log-out', color: 'danger',

      handle: (event) => this.logout(event),
      enable: () => this.accountService.isLogin
    },
  ];

  constructor(private platform: PlatformService,
              private accountService: AccountService,
              private router: Router) {
    this.start();
  }

  async start() {
    var now = Date.now();
    console.info('[app] Starting...');

    await this.platform.start();

    console.info(`[app] Starting [OK] in ${Date.now()-now}ms`);
  }

  async logout(event) {
    this.accountService.forgetAll();
    await this.router.navigateByUrl('/home', {
      replaceUrl: true
    });
  }
}
