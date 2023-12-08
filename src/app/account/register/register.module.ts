import { NgModule } from '@angular/core';
import { RegisterForm } from '@app/account/register/register.form';
import { RegisterModal } from '@app/account/register/register.modal';
import { TranslateModule } from '@ngx-translate/core';
import { AppSharedModule } from '@app/shared/shared.module';
import { AppUnlockModule } from '@app/account/unlock/unlock.module';

@NgModule({
  imports: [AppSharedModule, AppUnlockModule],
  declarations: [RegisterForm, RegisterModal],
  exports: [RegisterForm, RegisterModal, TranslateModule],
})
export class AppRegisterModule {}
