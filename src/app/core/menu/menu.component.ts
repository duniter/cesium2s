import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonSplitPane, MenuController, ModalController} from "@ionic/angular";

import {Router} from "@angular/router";
import {Account, UserProfileLabel} from "../services/model";
import {AccountService} from "../services/account.service";
import {AboutModal} from '../about/modal-about';

import {environment} from '../../../environments/environment';
import {HomePage} from '../home/home';
import {fadeInAnimation} from '../../shared/material/material.animations';
import {TranslateService} from "@ngx-translate/core";
import {switchMap} from "rxjs/operators";
import {DuniterService} from "../services/duniter/duniter.service";
import {from} from "rxjs";

export interface MenuItem {
  title: string;
  path?: string;
  page?: string | any;
  action?: string | any;
  icon?: string;
  matIcon?: string;
  profile?: UserProfileLabel;
  exactProfile?: UserProfileLabel;
  cssClass?: string;
}

const SPLIT_PANE_SHOW_WHEN = 'lg';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [fadeInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {

  loading = true;
  isLogin = false;
  account: Account;
  splitPaneOpened: boolean;

  currencySymbol$: Observable<string>;

  filteredItems: MenuItem[];

  @Input()
  appVersion: String = environment.version;

  @Input() content: any;

  @Input() side: string = "left";

  root: any = HomePage;

  @Input()
  items: Array<MenuItem>;

  @ViewChild('splitPane') splitPane: IonSplitPane;

  constructor(
    protected accountService: AccountService,
    protected router: Router,
    protected menu: MenuController,
    protected modalCtrl: ModalController,
    protected alertController: AlertController,
    protected duniterService: DuniterService,
    protected translate: TranslateService,
    protected cd: ChangeDetectorRef
  ) {

  }

  async ngOnInit() {
    // subscriptions
    this.accountService.onLogin.subscribe(account => this.onLogin(account));
    this.accountService.onLogout.subscribe(() => this.onLogout());

    this.splitPane.when = SPLIT_PANE_SHOW_WHEN;

    if (this.accountService.isLogin()) {
      this.onLogin(this.accountService.account);

    } else {
      await this.onLogout(true);
    }

    this.currencySymbol$ = from(this.duniterService.ready())
        .pipe(switchMap(() =>  this.duniterService.currencySymbol()));

    this.currencySymbol$.subscribe((c) => {
      console.log("Detectcurrency: " + c);
    })
  }

  onLogin(account: Account) {
    console.info('[menu] Update using logged account');
    this.account = account;
    this.isLogin = true;
    //this.splitPaneOpened = true;
    //this.splitPane.when = SPLIT_PANE_SHOW_WHEN;
    this.updateItems();
    this.cd.markForCheck();

    setTimeout(() => {
      this.loading = false;
      this.cd.markForCheck();
    }, 500);
  }

  async onLogout(skipRedirect?: boolean) {
    if (!skipRedirect) console.debug("[menu] logout");
    this.isLogin = false;
    //this.splitPaneOpened = false;
    //this.splitPane.when = false;
    this.account = null;
    this.updateItems();
    this.cd.markForCheck();

    // Wait the end of fadeout, to reset the account
    if (!skipRedirect) {
      await this.router.navigate(['']);
    }

    //setTimeout(() => {
      this.loading = false;
      this.cd.markForCheck();
    //}, 1000);

  }

  async logout() {

    const translations = await this.translate.get([
      'AUTH.LOGOUT.CONFIRM_TITLE',
      'AUTH.LOGOUT.CONFIRM_MESSAGE',
      'COMMON.BTN_CANCEL',
      'AUTH.LOGOUT.BTN_CONFIRM'
    ]).toPromise();
    const alert = await this.alertController.create({
      header: translations['AUTH.LOGOUT.CONFIRM_TITLE'],
      message: translations['AUTH.LOGOUT.CONFIRM_MESSAGE'],
      buttons: [
        {
          text: translations['COMMON.BTN_CANCEL'],
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: translations['AUTH.LOGOUT.BTN_CONFIRM'],
          cssClass: 'ion-color-primary',
          handler: () => {
            this.accountService.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  async openAboutModal(event) {
    const modal = await this.modalCtrl.create({component: AboutModal});
    return modal.present();
  }

  updateItems() {
    if (!this.isLogin) {
      this.filteredItems = (this.items || []).filter(i => !i.profile);
    } else {
      this.filteredItems = (this.items || []).filter(i => {
        let res;
        if (i.profile) {
          res = this.accountService.hasMinProfile(i.profile);
          if (!res) {
            console.debug("[menu] User does not have minimal profile '" + i.profile + "' need by ", (i.path || i.page));
          }
        } else if (i.exactProfile) {
          res = !i.profile || this.accountService.hasExactProfile(i.profile);
          if (!res) {
            console.debug("[menu] User does not have exact profile '" + i.profile + "' need by ", (i.path || i.page));
          }
        } else {
          res = true;
        }

        return res;
      });
    }

    this.cd.markForCheck();
  }

  trackByFn(index, item) {
    return item.title;
  }

  toggleSplitPane($event: MouseEvent) {
    if ($event.defaultPrevented) return;
    this.splitPaneOpened = !this.splitPaneOpened;
    if (!this.splitPaneOpened) {
      this.splitPane.when = false;
    } else {
      this.splitPane.when = SPLIT_PANE_SHOW_WHEN;
    }
    $event.preventDefault();
  }

  async doAction(action: string, event: UIEvent) {
    switch (action) {
      case 'logout':
        await this.logout();
        break;
      case 'about':
        await this.openAboutModal(event);
        break;
      default:
        throw new Error('Unknown action: ' + action);
    }
  }
}

