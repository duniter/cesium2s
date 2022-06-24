import { Component } from '@angular/core';
import {PlatformService} from "./services/platform.service";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [

    { title: 'MENU.HOME', url: '/home', icon: 'home' },
    { title: 'MENU.ACCOUNT', url: '/wallet/Alice', icon: 'card' },
    { title: 'TRANSFER.SUB_TITLE', url: '/transfer', icon: 'paper-plane' },

    // { title: 'Messages', url: '/message/inbox', icon: 'mail' },

    { title: 'MENU.WOT', url: '/wot', icon: 'people' },

    { title: 'MENU.SETTINGS', url: '/settings', icon: 'settings' },
  ];
  public labels = [];

  constructor(private platform: PlatformService) {
    this.start();
  }

  async start() {
    console.info('[app] Starting...');
    await this.platform.start();
    console.info('[app] Starting [OK]');
  }
}
