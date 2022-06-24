import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {RegisterForm} from "@app/register/register.form";
import {RegisterModal} from "@app/register/register.modal";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
    ],
    exports: [
        RegisterForm, RegisterModal
    ],
    declarations: [RegisterForm, RegisterModal]
})
export class AppAuthModule {}
