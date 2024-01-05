import { ModuleWithProviders, NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AppAuthModule } from '@app/account/auth/auth.module';
import { AppUnlockModule } from '@app/account/unlock/unlock.module';
import { AppRegisterModule } from '@app/account/register/register.module';
import { AccountsService } from '@app/account/accounts.service';
import { AuthController } from '@app/account/auth.controller';
import { APP_AUTH_CONTROLLER } from '@app/account/account.model';
import { AccountListModule } from '@app/account/list/account-list.module';

@NgModule({
  imports: [TranslateModule.forChild(), AppSharedModule, AppAuthModule, AppRegisterModule, AppUnlockModule, AccountListModule],
  exports: [TranslateModule, AccountListModule],
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
