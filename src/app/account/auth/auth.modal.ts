import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AccountsService } from '@app/account/accounts.service';
import { firstNotNilPromise } from '@app/shared/observables';

import { APP_AUTH_CONTROLLER, AuthData, IAuthController } from '@app/account/auth/auth.model';
import { AppEvent } from '@app/shared/types';
import { LoginMethodType } from '@app/account/account.model';
import { SettingsService } from '@app/settings/settings.service';
import { AppForm } from '@app/shared/form.class';
import { toBoolean } from '@app/shared/functions';
import { DerivationSelectionComponent } from '@app/account/auth/derivation-selection/derivation-selection.component';

export interface AuthModalOptions {
  auth?: boolean;
  title?: string;
  loginMethod?: LoginMethodType;
}

export declare type AuthModalRole = 'CANCEL' | 'VALIDATE';

@Component({
  selector: 'app-auth-modal',
  templateUrl: 'auth.modal.html',
  styleUrls: ['./auth.modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthModal implements OnInit, AuthModalOptions {
  protected mobile = this.settingsService.mobile;
  protected form: AppForm<AuthData>;

  get loading() {
    return this.form?.loading;
  }

  get invalid() {
    return this.form?.invalid;
  }

  @Input() auth = false; // false for login, true for auth
  @Input() title: string = null;
  @Input() canRegister: boolean;
  @Input() loginMethod: LoginMethodType;

  constructor(
    private modalCtrl: ModalController,
    private settingsService: SettingsService,
    private accountService: AccountsService,
    private cd: ChangeDetectorRef,
    @Inject(APP_AUTH_CONTROLLER) private authController: IAuthController
  ) {}

  ngOnInit() {
    this.title = this.title || (this.auth ? 'AUTH.TITLE' : 'LOGIN.TITLE');
    this.loginMethod = this.loginMethod || 'v1';

    this.canRegister = toBoolean(this.canRegister, true);
  }

  setForm(form: AppForm<AuthData>) {
    this.form = form;
    this.form.markAsReady({ emitEvent: false });
    this.form.markAsLoaded();
  }

  cancel() {
    this.modalCtrl.dismiss(null, <AuthModalRole>'CANCEL');
  }

  async doSubmit(data?: AuthData): Promise<boolean | undefined> {
    if (this.form.disabled) return;
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.markAsLoading();

    try {
      data = data || this.form.value;

      // Disable the form
      this.form.disable();

      if (data.v2.mnemonic.includes('//')) {
        const account = await this.accountService.addAccount(data);

        return this.modalCtrl.dismiss(account, <AuthModalRole>'VALIDATE');
      } else {
        // Scan derivations to import one with a balance
        await this.showDerivationSelection(data.v2.mnemonic);
        return;
      }
    } catch (err) {
      this.form.error = (err && err.message) || err;
      this.markAsLoaded();

      // Enable the form
      this.form.enable();

      // Reset form error on next changes
      firstNotNilPromise(this.form.form.valueChanges).then(() => {
        this.form.error = null;
        this.markForCheck();
      });

      return;
    }
  }

  get value(): AuthData {
    return this.form.value;
  }

  protected async showDerivationSelection(mnemonic: string) {
    const modal = await this.modalCtrl.create({
      component: DerivationSelectionComponent,
      componentProps: { mnemonic },
    });

    await modal.present();

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.importWithDerivation(result.data);
      } else {
        this.markAsLoaded();
        this.form.enable();
        this.cd.detectChanges();
      }
    });
  }

  protected async importWithDerivation(derivation: string) {
    const data = this.value;

    if (derivation !== 'root') {
      data.v2.mnemonic += derivation;
    }

    try {
      const account = await this.accountService.addAccount(data);
      return this.modalCtrl.dismiss(account, <AuthModalRole>'VALIDATE');
    } catch (err) {
      this.form.error = (err && err.message) || err;
      this.markAsLoaded();

      // Enable the form
      this.form.enable();

      // Reset form error on next changes
      firstNotNilPromise(this.form.form.valueChanges).then(() => {
        this.form.error = null;
        this.markForCheck();
      });
    }
  }

  async changeAuthMethod(event: AppEvent) {
    const loginMethod = await this.authController.selectLoginMethod(event, { auth: this.auth });
    if (!loginMethod) return; // Cancelled

    this.loginMethod = loginMethod;
    this.markForCheck();
  }

  showHelpModal(anchor?: string) {
    console.info('TODO Opening help modal to anchor: ' + anchor);
  }

  protected markForCheck() {
    this.cd.markForCheck();
  }

  protected markAsLoading(opts?: { emitEvent?: boolean }) {
    this.form.markAsLoading(opts);
    this.markForCheck();
  }

  protected markAsLoaded(opts?: { emitEvent?: boolean }) {
    this.form.markAsLoaded(opts);
    this.markForCheck();
  }

  private handleError(err: any) {
    this.form.error = (err && err.message) || err;

    // Reset form error on next changes
    firstNotNilPromise(this.form.form.valueChanges).then(() => {
      this.form.error = null;
      this.markForCheck();
    });
  }
}
