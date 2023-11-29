import {ModalController} from "@ionic/angular";
import {Injectable} from "@angular/core";
import {PlatformService} from "@app/shared/services/platform.service";
import {Router} from "@angular/router";
import {TransferPage, TransferPageOptions} from "@app/transfer/transfer.page";

@Injectable()
export class TransferController {

  private _mobile = this.platform.mobile;

  constructor(
    private platform: PlatformService,
    private modalCtrl: ModalController,
    private router: Router
  ) {
  }

  async transfer(opts?: TransferPageOptions): Promise<string> {

    if (this._mobile) {
      console.info('[transfer] Opening transfer page');
      await this.router.navigateByUrl('/transfer');
      return undefined;
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
