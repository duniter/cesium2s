import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {TranslateModule} from "@ngx-translate/core";
import {SharedPipesModule} from "@app/shared/pipes/pipes.module";
import {QRCodeModule} from "angular2-qrcode";
import {ListPopoverModule} from "@app/shared/popover/list.popover.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    QRCodeModule,

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
    QRCodeModule,

    // Sub modules
    SharedPipesModule,
    ListPopoverModule
  ]
})
export class AppSharedModule {}
