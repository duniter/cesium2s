import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {TranslateModule} from "@ngx-translate/core";
import {SharedPipesModule} from "@app/shared/pipes/pipes.module";
import {QrCodeModule} from "ng-qrcode";
import {ListPopoverModule} from "@app/shared/popover/list.popover.module";
import {ForModule, LetModule} from "@rx-angular/template";
import {IfModule} from "@rx-angular/template/experimental/if";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    QrCodeModule,

    // RxState template
    LetModule,
    ForModule,
    IfModule,

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

    // RxState template
    LetModule,
    ForModule,
    IfModule,

    // Sub modules
    SharedPipesModule,
    ListPopoverModule
  ]
})
export class AppSharedModule {}
