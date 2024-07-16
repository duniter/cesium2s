import { Component, Inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AccountsService } from '@app/account/accounts.service';

import { APP_AUTH_CONTROLLER, IAuthController } from '@app/account/auth/auth.model';
import { APP_WOT_CONTROLLER } from './wot.model';
import { WotController } from './wot.controller';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: 'confirm.modal.html',
})
export class ConfirmModal {
  constructor(
    private accountService: AccountsService,
    private viewCtrl: ModalController,
    @Inject(APP_AUTH_CONTROLLER) private authController: IAuthController,
    @Inject(APP_WOT_CONTROLLER) private wotController: WotController
  ) {}
}
