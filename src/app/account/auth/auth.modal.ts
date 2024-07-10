import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AccountsService } from '@app/account/accounts.service';
import { AuthForm } from './auth.form';
import { firstNotNilPromise } from '@app/shared/observables';

import { APP_AUTH_CONTROLLER, AuthData, IAuthController } from '@app/account/auth/auth.model';
import { AppEvent } from '@app/shared/types';
import { LoginMethodType } from '@app/account/account.model';
import { SettingsService } from '@app/settings/settings.service';

export interface AuthModalOptions {
  auth?: boolean;
  title?: string;
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
  protected form: AuthForm;

  get loading() {
    return this.form?.loading;
  }

  get invalid() {
    return this.form?.invalid;
  }

  @Input() auth = false; // false for login, true for auth
  @Input() title: string = null;
  @Input() loginMethod: LoginMethodType = 'v1';

  constructor(
    private settingsService: SettingsService,
    private accountService: AccountsService,
    private viewCtrl: ModalController,
    private cd: ChangeDetectorRef,
    @Inject(APP_AUTH_CONTROLLER) private authController: IAuthController
  ) {}

  ngOnInit() {
    this.title = this.title || (this.auth ? 'AUTH.TITLE' : 'LOGIN.TITLE');
  }

  setForm(form: AuthForm) {
    this.form = form;
    this.form.markAsReady({ emitEvent: false });
    this.form.markAsLoaded();
  }

  cancel() {
    this.viewCtrl.dismiss(null, <AuthModalRole>'CANCEL');
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

      const account = await this.accountService.addAccount(data);

      return this.viewCtrl.dismiss(account, <AuthModalRole>'VALIDATE');
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
}
