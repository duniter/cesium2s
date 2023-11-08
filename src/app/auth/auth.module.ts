import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AuthForm } from './auth.form';
import { AuthModal } from './auth.modal';
import { AppSharedModule } from '@app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AuthV2Modal } from './authv2.modal';
import { AuthV2Form } from './authv2.form';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AppSharedModule,
    TranslateModule,
  ],
  exports: [AuthForm, AuthModal, AuthV2Form, AuthV2Modal],
  declarations: [AuthForm, AuthModal, AuthV2Form, AuthV2Modal],
})
export class AppAuthModule {}
