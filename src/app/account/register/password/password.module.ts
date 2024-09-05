import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AppSharedModule } from '@app/shared/shared.module';
import { PasswordForm } from '@app/account/register/password/password.form';
import { PasswordModal } from '@app/account/register/password/password.modal';
import { CodeInputModule } from 'angular-code-input';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TranslateModule, AppSharedModule, CodeInputModule],
  declarations: [PasswordForm, PasswordModal],
  exports: [PasswordForm, PasswordModal],
})
export class AppRegisterPasswordModule {}
