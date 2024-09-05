import { NgModule } from '@angular/core';
import { AuthForm } from './auth.form';
import { AuthModal } from './auth.modal';
import { AppSharedModule } from '@app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { MmnemonicForm } from './mnemonic/mnemonic.form';
import { AppRegisterModule } from '@app/account/register/register.module';
import { PubkeyForm } from '@app/account/auth/pubkey/pubkey.form';
import { AddressForm } from '@app/account/auth/address/address.form';

@NgModule({
  imports: [
    // App modules
    AppSharedModule,
    AppRegisterModule,
  ],
  declarations: [AuthForm, AuthModal, MmnemonicForm, PubkeyForm, AddressForm],
  exports: [AuthForm, AuthModal, MmnemonicForm, PubkeyForm, AddressForm, TranslateModule],
})
export class AppAuthModule {}
