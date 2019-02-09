import { Component, OnInit, Input } from '@angular/core';
import { MenuController, ModalController } from "@ionic/angular";

import { Router } from "@angular/router";
import { Account, UserProfileLabel } from "../services/model";
import { AccountService } from "../services/account.service";
import { AboutModal } from '../about/modal-about';

import { environment } from '../../../environments/environment';
import { HomePage } from '../home/home';
import { Subject } from 'rxjs';
import { fadeInAnimation } from '../../shared/material/material.animations';

export interface MenuItem {
  title: string;
  path?: string;
  page?: string | any;
  icon?: string;
  profile?: UserProfileLabel;
}

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [fadeInAnimation]
})
export class MenuComponent implements OnInit {

  public loading = true;
  public isLogin: boolean = false;
  public account: Account;

  //filteredItems: Array<MenuItem> = [];
  filteredItems = new Subject<MenuItem[]>();

  @Input()
  appVersion: String = environment.version;

  @Input() content: any;

  @Input() side: string = "left";

  root: any = HomePage;

  @Input()
  items: Array<MenuItem>;

  constructor(
    protected accountService: AccountService,
    protected router: Router,
    protected menu: MenuController,
    protected modalCtrl: ModalController
  ) {

  }

  ngOnInit() {
    // subscriptions
    this.accountService.onLogin.subscribe(account => this.onLogin(account));
    this.accountService.onLogout.subscribe(() => this.onLogout());

    if (this.accountService.isLogin()) {
      this.onLogin(this.accountService.account);
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }
    else {
      this.isLogin = false;
      setTimeout(() => {
        this.updateItems();
        this.loading = false;
      }, 1000);
    }
  }

  onLogin(account: Account) {
    console.debug('[menu] Logged account: ', account);
    this.account = account;
    this.isLogin = true;
    this.updateItems();
  }

  onLogout() {
    console.debug("[menu] logout");
    this.updateItems();
    this.isLogin = false;

    // Wait the end of fadeout, to reset the account
    setTimeout(() => {
      this.account = null;
    }, 1000);

    this.router.navigate(['']);
  }

  logout(): void {
    this.accountService.logout();
  }

  async openAboutModal(event) {
    const modal = await this.modalCtrl.create({ component: AboutModal });
    return modal.present();
  }

  updateItems() {
    if (!this.isLogin) {
      this.filteredItems.next((this.items || []).filter(i => !i.profile));
    }
    else {
      this.filteredItems.next((this.items || []).filter(i => {
        const res = !i.profile || this.accountService.hasProfile(i.profile);
        if (!res) {
          console.debug("[menu] User does not have profile '" + i.profile + "' need by ", (i.path || i.page));
          this.accountService.hasProfile(i.profile);
        }
        return res;
      }));
    }
  }

  trackByFn(index, item) {
    return item.title;
  }
}

