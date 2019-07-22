import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from "@angular/core";
import {ModalController, NavParams} from '@ionic/angular';
import {BehaviorSubject} from "rxjs";

export declare interface ColumnItem {
  name?: string;
  label: string;
  visible: boolean;
}

@Component({
  selector: 'table-select-columns',
  templateUrl: './table-select-columns.component.html'
})
export class TableSelectColumnsComponent implements OnInit {

  @Input() columns: ColumnItem[];

  constructor(
    private navParams: NavParams,
    private viewCtrl: ModalController) {
  }

  ngOnInit() {
    this.columns = this.columns || this.navParams.data && this.navParams.data.columns || [];
  }

  onRenderItems(event: CustomEvent<{ from: number; to: number; complete: () => {} }>) {
    const element = this.columns.splice(event.detail.from, 1)[0];
    this.columns.splice(event.detail.to, 0, element);
    event.detail.complete();
  }

  close() {
    this.viewCtrl.dismiss(this.columns);
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
