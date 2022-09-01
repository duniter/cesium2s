import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {TranslateModule} from "@ngx-translate/core";
import {SharedPipesModule} from "@app/shared/pipes/pipes.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {QRCodeModule} from "angular2-qrcode";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    QRCodeModule,

    // App modules
    SharedPipesModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    QRCodeModule,

    // App modules
    SharedPipesModule
  ]
})
export class AppSharedModule {}
