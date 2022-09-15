import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {AuthForm} from "./auth.form";
import {AuthModal} from "./auth.modal";
import {AppSharedModule} from "@app/shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";
import {AuthController} from "@app/auth/auth.controller";
import {AppRegisterModule} from "@app/register/register.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,

    // App modules
    AppSharedModule,
    AppRegisterModule
  ],
  declarations: [
    AuthForm, AuthModal
  ],
  exports: [
    AuthForm,
    AuthModal,
    TranslateModule
  ],
  providers: [
    AuthController
  ]
})
export class AppAuthModule {}
