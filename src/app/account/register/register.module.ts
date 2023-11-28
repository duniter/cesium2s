import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {RegisterForm} from "@app/account/register/register.form";
import {RegisterModal} from "@app/account/register/register.modal";
import {TranslateModule} from "@ngx-translate/core";
import {AppSharedModule} from "@app/shared/shared.module";
import {AppUnlockModule} from "@app/account/unlock/unlock.module";

@NgModule({
  imports: [
    AppSharedModule,
    AppUnlockModule
  ],
  declarations: [
    RegisterForm,
    RegisterModal
  ],
  exports: [
    RegisterForm,
    RegisterModal,
    TranslateModule
  ]
})
export class AppRegisterModule {}
