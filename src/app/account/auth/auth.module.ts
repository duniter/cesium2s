import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {AuthForm} from './auth.form';
import {AuthModal} from './auth.modal';
import {AppSharedModule} from '@app/shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {AuthV2Modal} from './authv2.modal';
import {AuthV2Form} from './authv2.form';
import {AuthController} from "@app/account/auth/auth.controller";
import {AppRegisterModule} from "@app/account/register/register.module";

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
    AuthForm, AuthModal, AuthV2Form, AuthV2Modal
  ],
  exports: [
    AuthForm,
    AuthModal,
    AuthV2Form,
    AuthV2Modal,
    TranslateModule
  ],
  providers: [
    AuthController
  ]
})
export class AppAuthModule {}
