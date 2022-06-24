import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {AuthForm} from "./auth.form";
import {AuthModal} from "./auth.modal";
import {AppSharedModule} from "@app/shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      IonicModule,
      AppSharedModule,
      TranslateModule
    ],
    exports: [
        AuthForm, AuthModal
    ],
    declarations: [AuthForm, AuthModal]
})
export class AppAuthModule {}
