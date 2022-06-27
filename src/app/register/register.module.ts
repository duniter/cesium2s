import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {RegisterForm} from "@app/register/register.form";
import {RegisterModal} from "@app/register/register.modal";
import {TranslateModule} from "@ngx-translate/core";
import {AppSharedModule} from "@app/shared/shared.module";

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      TranslateModule,
      AppSharedModule
    ],
    exports: [
        RegisterForm, RegisterModal
    ],
    declarations: [RegisterForm, RegisterModal]
})
export class AppRegisterModule {}
