import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Account } from '@app/account/account.model';
import { WotLookupInputs, WotLookupPage } from '@app/wot/wot-lookup.page';
import { WotLookupOptions } from '@app/wot/wot.model';
import { ConfirmModal } from './confirm.modal';

@Injectable({ providedIn: 'root' })
export class WotController {
  constructor(protected modalCtrl: ModalController) {}

  async select(options?: WotLookupOptions): Promise<Account> {
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

    if (!data) return; // User cancelled

    return data as Account;
  }

  // open confirm modal to confirm identity and give it a name
  async confirm(): Promise<void> {
    console.info('[confirm] Opening confirm modal');
    const presentingElement: HTMLElement = document.querySelector('.ion-page');

    const modal = await this.modalCtrl.create({
      component: ConfirmModal,
      presentingElement,
      canDismiss: true,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();

    return data;
  }
}
