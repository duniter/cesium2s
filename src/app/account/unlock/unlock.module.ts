import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {RegisterForm} from "@app/account/register/register.form";
import {RegisterModal} from "@app/account/register/register.modal";
import {TranslateModule} from "@ngx-translate/core";
import {AppSharedModule} from "@app/shared/shared.module";
import {UnlockForm} from "@app/account/unlock/unlock.form";
import {UnlockModal} from "@app/account/unlock/unlock.modal";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AppSharedModule
  ],
  declarations: [
    UnlockForm,
    UnlockModal
  ],
  exports: [
    UnlockForm,
    UnlockModal
  ],
})
export class AppUnlockModule {}
