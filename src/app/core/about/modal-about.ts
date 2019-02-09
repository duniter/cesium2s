import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

import { environment } from '../../../environments/environment';


@Component({
    selector: 'modal-about',
    templateUrl: './modal-about.html'
})
export class AboutModal {

    appVersion: String = environment.version;

    constructor(
        protected modalController: ModalController
    ) {
    }

    async cancel() {
        await this.modalController.dismiss();
    }

    async close() {
        await this.modalController.dismiss();
    }
}