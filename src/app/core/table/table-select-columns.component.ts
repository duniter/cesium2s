import { Component, OnInit } from "@angular/core";
import { NavParams } from '@ionic/angular';
import { ModalController } from "@ionic/angular";

@Component({
    selector: 'table-select-columns',
    templateUrl: './table-select-columns.component.html'
})
export class TableSelectColumnsComponent implements OnInit {

    columns: [{ name?: string, label: string, visible: boolean }];

    constructor(
        private navParams: NavParams,
        private viewCtrl: ModalController) {
    }

    ngOnInit() {
        this.columns = this.navParams.data && this.navParams.data.columns || [];
    }

    reorderItems(event: CustomEvent<{ from: number; to: number; }>) {
        let element = this.columns[event.detail.from];
        this.columns.splice(event.detail.from, 1);
        this.columns.splice(event.detail.to, 0, element);
    }

    close() {
        this.viewCtrl.dismiss(this.columns);
    }

    cancel() {
        this.viewCtrl.dismiss();
    }
}