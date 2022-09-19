import {
  ActionSheetButton,
  ActionSheetController,
  ActionSheetOptions,
  IonModal,
  ModalController,
  PopoverController
} from "@ionic/angular";
import {Injectable} from "@angular/core";
import {PlatformService} from "@app/shared/services/platform.service";
import {PopoverOptions} from "@ionic/core";
import {ListItem, ListPopover, ListPopoverOptions} from "@app/shared/popover/list.popover";
import {TranslateService} from "@ngx-translate/core";
import {AuthModal, AuthModalOptions} from "@app/auth/auth.modal";
import {Router} from "@angular/router";
import {RegisterModal, RegisterModalOptions} from "@app/register/register.modal";
import { Account } from "@app/wallet/account.model";

export declare type LoginMethodType = 'v1' | 'v2' | 'keyfile-v1';
export const LoginMethods: ListItem[] = [
  {value: 'v1', label: 'Compte Duniter v1'},
  {value: 'v2', label: 'Phrase de restauration'},
  {value: 'keyfile-v1', label: 'Fichier de clef Duniter v1', disabled: true}
];

@Injectable()
export class AuthController {

  private _mobile = this.platform.mobile;

  protected actionSheetOptions: Partial<ActionSheetOptions> = {
    backdropDismiss: true,
    cssClass: 'select-login-action-sheet'
  };
  protected popoverOptions: Partial<PopoverOptions> = {
    backdropDismiss: true,
    cssClass: 'select-login-popover',
    reference: 'event'
  };

  constructor(
    private platform: PlatformService,
    private translate: TranslateService,
    private popoverCtrl: PopoverController,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private router: Router
  ) {
  }

  async login(event, opts?: {
    loginMethod?: LoginMethodType,
    auth?: boolean,
    redirectToWalletPage?: boolean
  }) {

    let loginMethod = opts?.loginMethod;

    // Ask login method
    if (!loginMethod) {

      // ...using popover
      if (!this._mobile) {
        const popover = await this.popoverCtrl.create(<PopoverOptions>{
          event,
          backdropDismiss: true,
          component: ListPopover,
          componentProps: <ListPopoverOptions>{
            title: 'LOGIN.METHOD_POPOVER_TITLE',
            items: LoginMethods
          }
        })
        await popover.present(event);
        const {data} = await popover.onWillDismiss();
        loginMethod = data;
      }
      else {
        const actionSheet = await this.actionSheetCtrl.create({
          ...this.actionSheetOptions,
          header: this.translate.instant('LOGIN.METHOD_POPOVER_TITLE'),
          buttons: LoginMethods.map(method => {
            return <ActionSheetButton>{
              id: method.value,
              data: method.value,
              text: this.translate.instant(method.label)
            }
          })
        });
        await actionSheet.present();
        const {data} = await actionSheet.onWillDismiss();
        loginMethod = data;
      }
    }
    if (!loginMethod) return undefined; // User cancelled

    console.info('[auth] Selected login method: ' + loginMethod);

    let modal: HTMLIonModalElement;
    switch (loginMethod) {
      case 'v1':
        modal = await this.modalCtrl.create({
          component: AuthModal,
          componentProps: <AuthModalOptions>{
            auth: opts?.auth,
            scrollY: false // TODO remove this !
          }
        });
        break;
      default:
        console.warn('[home] Unknown login method: ' + loginMethod);
    }
    if (!modal) return; // User cancelled of method not found

    await modal.present();
    const {data} = await modal.onWillDismiss();

    if (data?.address && opts?.redirectToWalletPage === true) {
      setTimeout(() => this.router.navigate(['/wallet', data.address]));
    }

    return data;
  }

  async register(opts?: { redirectToWalletPage?: boolean; }): Promise<Account> {
    const modal = await this.modalCtrl.create({
      component: RegisterModal,
      componentProps: <RegisterModalOptions>{
        scrollY: false // TODO remove this !
      }
    });

    await modal.present();

    const {data} = await modal.onWillDismiss();

    try {
      if (!data?.address) return null; // Skip

      if (opts?.redirectToWalletPage) {
        setTimeout(() => this.router.navigate(['/wallet', data.address]));
      }

      return data as Account;
    }
    finally {
      await modal.onDidDismiss();
    }
  }
}
