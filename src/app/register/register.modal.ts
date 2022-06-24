import {Component, ViewChild} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {RegisterForm} from "@app/register/register.form";
import {AccountService} from "@app/wallet/account.service";
import {FormUtils} from "@app/shared/forms";
import {RegisterData} from "@app/register/register.model";

@Component({
  selector: 'app-register-modal',
  templateUrl: 'register.modal.html',
  styleUrls: ['./register.modal.scss']
})
export class RegisterModal {


  @ViewChild('form', { static: true }) private form: RegisterForm;

  constructor(
    private accountService: AccountService,
    public viewCtrl: ModalController) {
  }

  cancel() {
    console.debug('[register] cancelled');
    this.viewCtrl.dismiss();
  }

  async doSubmit(event?: any) {
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

    try {
      console.debug('[register] Sending registration to server...', data);
      await this.accountService.register(data as RegisterData);

      console.debug('[register] Account registered!');
      await this.viewCtrl.dismiss();
    }
    catch (err) {
      this.form.error = err && err.message || err;
      this.form.enable();
    }
  }
}
