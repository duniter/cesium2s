import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AppAuthModule } from '@app/account/auth/auth.module';
import { AppUnlockModule } from '@app/account/unlock/unlock.module';
import { AppRegisterModule } from '@app/account/register/register.module';
import { AccountsService } from '@app/account/accounts.service';
import { AuthController } from '@app/account/auth/auth.controller';
import { AccountListModule } from '@app/account/list/account-list.module';
import { APP_AUTH_CONTROLLER } from '@app/account/auth/auth.model';
import { AccountImageModule } from '@app/account/image/account-image.module';
import { DerivationSelectionComponent } from '@app/account/auth/derivation-selection/derivation-selection.component';

@NgModule({
  declarations: [DerivationSelectionComponent],
  imports: [TranslateModule.forChild(), AppSharedModule, AppAuthModule, AppRegisterModule, AppUnlockModule, AccountListModule, AccountImageModule],
  exports: [TranslateModule, AccountListModule, AccountImageModule, DerivationSelectionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppAccountModule {
  static forRoot(): ModuleWithProviders<AppAccountModule> {
    console.info('[account] Creating module (root)');
    return {
      ngModule: AppAccountModule,
      providers: [
        // Modal controllers
        AuthController,

        // Accounts holder
        { provide: APP_AUTH_CONTROLLER, useExisting: AuthController },
        AccountsService,
      ],
    };
  }
}
