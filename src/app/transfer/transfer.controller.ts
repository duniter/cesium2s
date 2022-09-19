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
import {TransferPage, TransferPageOptions} from "@app/transfer/transfer.page";
import {Account} from "@app/wallet/account.model";

@Injectable()
export class TransferController {

  private _mobile = this.platform.mobile;

  constructor(
    private platform: PlatformService,
    private translate: TranslateService,
    private modalCtrl: ModalController,
    private router: Router
  ) {
  }

  async transfer(event: UIEvent, opts?: TransferPageOptions): Promise<string|undefined> {

    if (this._mobile) {
      console.info('[transfer] Opening transfer page');
      this.router.navigateByUrl('/transfer');
    }
    else {
      console.info('[transfer] Opening transfer modal');

      const modal = await this.modalCtrl.create({
            component: TransferPage,
            componentProps: <TransferPageOptions>{
              ...opts,
              dismissOnSubmit: true
            }
          });
      await modal.present();
      const {data} = await modal.onWillDismiss();

      return data;
    }
  }
}
