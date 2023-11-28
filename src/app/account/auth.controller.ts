import {
  ActionSheetButton,
  ActionSheetController,
  ActionSheetOptions,
  ModalController,
  PopoverController
} from "@ionic/angular";
import {Injectable} from "@angular/core";
import {PlatformService} from "@app/shared/services/platform.service";
import {PopoverOptions} from "@ionic/core";
import {ListPopover, ListPopoverOptions} from "@app/shared/popover/list.popover";
import {TranslateService} from "@ngx-translate/core";
import {AuthModal, AuthModalOptions} from "@app/account/auth/auth.modal";
import {Router} from "@angular/router";
import {RegisterModal, RegisterModalOptions} from "@app/account/register/register.modal";
import {
  Account,
  IAuthController,
  LoginEvent,
  LoginMethods,
  LoginOptions,
  SelectAccountOptions,
  UnlockOptions
} from "@app/account/account.model";
import {AuthV2Modal} from "@app/account/auth/authv2.modal";
import {UnlockModal} from "@app/account/unlock/unlock.modal";
import {AccountListComponent, AccountListComponentInputs} from "@app/account/list/account-list.component";

@Injectable()
export class AuthController implements IAuthController {

  private readonly _mobile = this.platform.mobile;

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

  async login(event?: LoginEvent, opts?: LoginOptions): Promise<Account> {

    let loginMethod = opts?.loginMethod;

    // Ask login method
    if (!loginMethod) {

      // ...using popover
      if (!this._mobile) {
        const popover = await this.popoverCtrl.create(<PopoverOptions>{
          event,
          backdropDismiss: true,
          component: ListPopover,
          cssClass: 'login-method-popover',
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
      case 'v2':
        modal = await this.modalCtrl.create({
          component: AuthV2Modal,
          componentProps: <AuthModalOptions>{
            auth: opts?.auth,
            scrollY: false // TODO remove this !
          }
        });
        break;
      default:
        console.warn('[account-modal-controller] Unknown login method: ' + loginMethod);
    }
    if (!modal) return null; // User cancelled of method not found

    await modal.present();
    const {data} = await modal.onWillDismiss();

    if (!data?.address) return null;

    if (opts?.redirectToWalletPage === true) {
      setTimeout(() => this.router.navigate(['/wallet', data.address]));
    }

    return data as Account;
  }

  async unlock(opts?: UnlockOptions): Promise<string> {
    const modal = await this.modalCtrl.create({
      component: UnlockModal,
      componentProps: opts
    });
    await modal.present();
    const {data, role} = await modal.onDidDismiss();

    return data;
  }

  async createNew(opts?: {redirectToWalletPage?: boolean}): Promise<Account> {
    const modal = await this.modalCtrl.create({
      component: RegisterModal,
      componentProps: <RegisterModalOptions>{
        scrollY: false // TODO remove this !
      }
    });

    await modal.present();

    const {data} = await modal.onDidDismiss();

    if (!data?.address) return null; // Skip

    if (opts?.redirectToWalletPage) {
      setTimeout(() => this.router.navigate(['/wallet', data.address]));
    }

    return data as Account;
  }

  async selectAccount(opts?: SelectAccountOptions): Promise<Account> {
    const modal = await this.modalCtrl.create({
      component: AccountListComponent,
      componentProps: <AccountListComponentInputs>{
        ...opts
      }
    });
    await modal.present();
    const {data, role} = await modal.onDidDismiss();

    if (!data) return null;

    console.debug('[account-controller] Selected account: ' + data?.address);

    return data as Account;
  }
}
