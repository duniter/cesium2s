import { ModalController, NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { PlatformService } from '@app/shared/services/platform.service';
import { TransferPage, TransferPageInputs } from '@app/transfer/send/transfer.page';
import { ITransferController, TransferFormOptions } from '@app/transfer/transfer.model';

@Injectable()
export class TransferController implements ITransferController {
  get mobile() {
    return this.platform.mobile;
  }

  constructor(
    private platform: PlatformService,
    private modalCtrl: ModalController,
    private navController: NavController
  ) {}

  async transfer(opts?: TransferFormOptions): Promise<string> {
    // Open as a page
    if (opts?.modal === false && this.platform.mobile) {
      console.info('[transfer] Opening transfer page');
      if (opts?.account?.address) {
        await this.navController.navigateForward(['transfer', 'from', opts.account.address], {
          state: {
            to: '5H7L4V5qMLEcqAsRMmyRYU42q8XWxgk1HroC5QsQTDZpY7hx',
          },
        });
      } else if (opts?.recipient?.address) {
        await this.navController.navigateForward(['transfer', 'to', opts.recipient.address]);
      } else {
        await this.navController.navigateForward(['transfer']);
      }
      return undefined;
    }

    // Open as a modal
    else {
      console.info('[transfer] Opening transfer modal');
      const presentingElement: HTMLElement = this.platform.mobile ? document.querySelector('.ion-page') : null;

      const modal = await this.modalCtrl.create({
        component: TransferPage,
        presentingElement,
        canDismiss: true,
        componentProps: <TransferPageInputs>{
          ...opts,
          toolbarColor: 'secondary',
          dismissOnSubmit: true,
        },
      });
      await modal.present();
      const { data } = await modal.onWillDismiss();

      return data;
    }
  }
}
