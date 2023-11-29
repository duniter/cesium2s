import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {RegisterForm} from "@app/account/register/register.form";
import {AccountsService} from "@app/account/accounts.service";
import {FormUtils} from "@app/shared/forms";
import {environment} from "@environments/environment";

export interface RegisterModalOptions {
}
@Component({
  selector: 'app-register-modal',
  templateUrl: 'register.modal.html',
  styleUrls: ['./register.modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterModal implements OnInit, RegisterModalOptions {


  get loading() {
    return this.form.loading;
  }

  get mobile() {
    return this.form.mobile;
  }

  @Input() scrollY = false;
  @ViewChild('form', { static: true }) private form: RegisterForm;

  constructor(
    private accountService: AccountsService,
    public viewCtrl: ModalController,
    private _cd: ChangeDetectorRef
    ) {
  }

  async ngOnInit() {
    await this.accountService.ready();
    this.form.markAsReady();
    this.form.markAsLoaded();
    this.form.enable();
    this._cd.markForCheck();

    // DEV
    if (!environment.production) {
      // setTimeout(() => {
      //   this.form.slideTo(REGISTER_FORM_SLIDES.MNEMONIC);
      // });
    }
  }


  cancel() {
    console.debug('[register] cancelled');
    this.viewCtrl.dismiss();
  }

  async doSubmit(event?: any) {
    console.debug('[register-modal] Submit...');
    if (this.form.disabled) return; // Skip

    if (!this.form.valid) {
      await FormUtils.waitWhilePending(this.form);

      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
    }

    const data = this.form.value;

    this.form.disable();
    this.form.markAsLoading();

    try {
      console.debug('[register] Saving new account...');

      const registered = await this.accountService.addAccount(data);

      const address = registered && this.form.form.get('address').value;
      if (address) {
        console.debug('[register] Account registered, with address: ' + address);
        const account = await this.accountService.getByAddress(address);
        await this.viewCtrl.dismiss(account);
      }
    }
    catch (err) {
      this.form.error = err && err.message || err;
      this.form.enable();
      this.form.markAsLoaded();
    }
  }
}
