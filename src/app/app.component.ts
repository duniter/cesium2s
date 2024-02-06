import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlatformService } from './shared/services/platform.service';
import { AccountsService } from '@app/account/accounts.service';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { isNotNilOrBlank } from '@app/shared/functions';
import { TransferController } from '@app/transfer/send/transfer.controller';
import { PredefinedColors } from '@app/shared/colors/colors.utils';
import { fadeInAnimation } from '@app/shared/animations';
import { SettingsService } from '@app/settings/settings.service';

export interface IMenuItem {
  title: string;
  url?: string;
  icon: string;
  disabled?: () => boolean;
  handle?: (event: Event) => Promise<void | unknown>;
  visible?: () => boolean;
  color?: PredefinedColors;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [fadeInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  appName = 'COMMON.APP_NAME';
  appPages: IMenuItem[] = [
    { title: 'MENU.HOME', url: '/home', icon: 'home' },
    { title: 'MENU.ACCOUNT', url: '/wallet', icon: 'person' },
    { title: 'MENU.TRANSACTIONS', url: '/history', icon: 'card' },
    { title: 'COMMON.BTN_SEND_MONEY', url: '/transfer', icon: 'paper-plane', visible: () => this.platform.mobile },

    {
      title: 'COMMON.BTN_SEND_MONEY',
      icon: 'paper-plane',
      handle: () => this.transferController.transfer(),
      visible: () => !this.platform.mobile,
    },

    // { title: 'Messages', url: '/message/inbox', icon: 'mail' },

    { title: 'MENU.WOT', url: '/wot', icon: 'people' },

    { title: 'MENU.SETTINGS', url: '/settings', icon: 'settings' },

    {
      title: 'COMMON.BTN_LOGOUT',
      icon: 'log-out',
      color: 'danger',

      handle: () => this.logout(),
      visible: () => this.accountService.isLogin && this.platform.mobile,
    },
  ];

  constructor(
    private platform: PlatformService,
    protected settings: SettingsService,
    private accountService: AccountsService,
    private transferController: TransferController,
    private router: Router
  ) {
    this.start();
  }

  async start() {
    const now = Date.now();
    console.info('[app] Starting...');

    // Start all stuff (services, plugins, etc.)
    await this.platform.start();

    console.info(`[app] Starting [OK] in ${Date.now() - now}ms`);
    // Detecting deep link
    await this.detectDeepLink();
  }

  async logout() {
    this.accountService.forgetAll();
    await this.router.navigateByUrl('/home', {
      replaceUrl: true,
    });
  }

  async detectDeepLink() {
    try {
      const url = (await App.getLaunchUrl())?.url;
      if (isNotNilOrBlank(url)) {
        const slashIndex = url.indexOf('/');
        if (slashIndex !== -1) {
          const relativeUrl = url.substring(slashIndex + 1);
          console.info('[app] Detected a deep link: ' + relativeUrl);

          // TODO: call the router ?
          await this.router.navigateByUrl(relativeUrl);
        } else {
          console.warn(`[app] Detected a INVALID deep link: ${url} - missing slash`);
        }
      }
    } catch (err) {
      console.error(`[platform] Cannot get launch URL: ${err.message || err}\n${err?.originalStack || JSON.stringify(err)}`);
      // Continue
    }
  }
}
