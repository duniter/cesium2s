import { Component, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AccountService } from "../../services/account.service";
import { RegisterForm } from '../form/form-register';

@Component({
  selector: 'modal-register',
  templateUrl: 'modal-register.html',
})
export class RegisterModal {

  sending: boolean = false;

  @ViewChild('form') private form: RegisterForm;

  constructor(private accountService: AccountService,
    public viewCtrl: ModalController) {
  }

  cancel() {
    console.debug('[register] cancelled');
    this.viewCtrl.dismiss();
  }

  async doSubmit(event?: any) {
    if (!this.form.valid || !this.form.isEnd()) {
      this.form.markAsTouched();
      return;
    }

    this.sending = true;
    let data = this.form.value;

    this.form.disable();

    try {
      console.debug('[register] Sending registration to server...', data);
      const res = await this.accountService.register(data);

      console.debug('[register] Account registered ! Closing modal...');
      await this.viewCtrl.dismiss();
    }
    catch (err) {
      this.form.error = err && err.message || err;
    }
    finally {
      this.form.enable();
      this.sending = false;
    };
  }
}
