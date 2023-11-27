import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {TranslateModule} from "@ngx-translate/core";
import {SharedPipesModule} from "@app/shared/pipes/pipes.module";
import {QrCodeModule} from "ng-qrcode";
import {ListPopoverModule} from "@app/shared/popover/list.popover.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    QrCodeModule,

    // Sub modules
    SharedPipesModule,
    ListPopoverModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    QrCodeModule,

    // Sub modules
    SharedPipesModule,
    ListPopoverModule
  ]
})
export class AppSharedModule {}
