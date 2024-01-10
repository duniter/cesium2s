import { ModalController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { PlatformService } from '@app/shared/services/platform.service';
import { Router } from '@angular/router';
import { TransferPage, TransferPageInputs } from '@app/transfer/transfer.page';
import { ITransferController, TransferFormOptions } from '@app/transfer/transfer.model';

@Injectable()
export class TransferController implements ITransferController {
  constructor(
    private platform: PlatformService,
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  async transfer(opts?: TransferFormOptions): Promise<string> {
    if (this.platform.mobile) {
      console.info('[transfer] Opening transfer page');
      if (opts?.account?.address) {
        await this.router.navigateByUrl('/transfer/from/' + opts.account.address, {
          state: {
            to: '5H7L4V5qMLEcqAsRMmyRYU42q8XWxgk1HroC5QsQTDZpY7hx',
          },
        });
      } else if (opts?.recipient?.address) {
        await this.router.navigateByUrl('/transfer/to/' + opts.recipient.address);
      }
      return undefined;
    } else {
      console.info('[transfer] Opening transfer modal');

      const modal = await this.modalCtrl.create({
        component: TransferPage,
        componentProps: <TransferPageInputs>{
          ...opts,
          dismissOnSubmit: true,
        },
      });
      await modal.present();
      const { data } = await modal.onWillDismiss();

      return data;
    }
  }
}
