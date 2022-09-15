import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IonicModule} from '@ionic/angular';
import {TranslateModule} from "@ngx-translate/core";
import {ListPopover} from "./list.popover";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ],
  declarations: [
    ListPopover
  ],
  exports: [
    ListPopover
  ]

})
export class ListPopoverModule {}
