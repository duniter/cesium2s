import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Account } from '@app/account/account.model';
import { WotLookupInputs, WotLookupPage } from '@app/wot/wot-lookup.page';
import { IWotController, WotLookupOptions } from '@app/wot/wot.model';

@Injectable()
export class WotController implements IWotController {
  constructor(protected modalCtrl: ModalController) {}

  async select(options?: WotLookupOptions): Promise<Account | undefined> {
    const modal = await this.modalCtrl.create({
      component: WotLookupPage,
      componentProps: <WotLookupInputs>{
        ...options,
        isModal: true,
        loading: false,
      },
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (!data) return undefined; // User cancelled

    return data as Account;
  }
}
