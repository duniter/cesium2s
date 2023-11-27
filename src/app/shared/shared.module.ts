import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {TranslateModule} from "@ngx-translate/core";
import {SharedPipesModule} from "@app/shared/pipes/pipes.module";
import {QrCodeModule} from "ng-qrcode";
import {ListPopoverModule} from "@app/shared/popover/list.popover.module";
import {ForModule} from "@rx-angular/template/for";
import {LetModule} from "@rx-angular/template/let";
import {IfModule} from "@rx-angular/template/if";
import {PushModule} from "@rx-angular/template/push";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    QrCodeModule,

    // RxState template
    PushModule,
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
    PushModule,
    LetModule,
    ForModule,
    IfModule,

    // Sub modules
    SharedPipesModule,
    ListPopoverModule
  ]
})
export class AppSharedModule {}
