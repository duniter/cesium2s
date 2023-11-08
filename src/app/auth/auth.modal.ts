import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AccountService} from '@app/wallet/account.service';
import {AuthForm} from './auth.form';
import {firstNotNilPromise} from '@app/shared/observables';
import {AuthData} from "@app/auth/auth.model";

@Component({
  selector: 'app-auth-modal',
  templateUrl: 'auth.modal.html',
  styleUrls: ['./auth.modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthModal implements OnInit {

  title: string = null;
  get loading() {
    return this.form?.loading;
  }

  get mobile(): boolean {
    return this.form?.mobile;
  }

  @Input() auth = false;

  @ViewChild('form', { static: true }) private form: AuthForm;

  constructor(private accountService: AccountService,
              private viewCtrl: ModalController,
              private cd: ChangeDetectorRef
              ) {
  }

  ngOnInit() {

    this.title = this.auth ? 'AUTH.TITLE' : 'LOGIN.TITLE';

    this.form.markAsReady({emitEvent: false});
    this.form.markAsLoaded();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  async doSubmit(data?: AuthData): Promise<any> {
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

      const account = await this.accountService.login(data);

      return this.viewCtrl.dismiss(account);
    }
    catch (err) {
      this.form.error = err && err.message || err;
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

  protected markForCheck() {
    this.cd.markForCheck();
  }

  protected markAsLoading(opts?: {emitEvent?: boolean}) {
    this.form.markAsLoading(opts);
    this.markForCheck();
  }

  protected markAsLoaded(opts?: {emitEvent?: boolean}) {
    this.form.markAsLoaded(opts);
    this.markForCheck();
  }
}