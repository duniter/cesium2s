import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

export interface ListItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ListPopoverOptions {
  title?: string;
  items: ListItem[];
}

@Component({
  selector: 'app-list-popover',
  templateUrl: './list.popover.html',
  styleUrls: ['./list.popover.scss'],
})
export class ListPopover {
  @Input() title: string = null;
  @Input() items: ListItem[] = null;

  constructor(protected popoverCtrl: PopoverController) {}

  click(value: string) {
    this.popoverCtrl.dismiss(value);
  }
}
