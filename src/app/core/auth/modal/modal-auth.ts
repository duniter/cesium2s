import { Component, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AccountService } from "../../services/account.service";
import { AuthForm } from '../form/form-auth';

@Component({
  selector: 'modal-auth',
  templateUrl: 'modal-auth.html',
  styleUrls: ['./modal-auth.scss']
})
export class AuthModal {

  loading: boolean = false;
  error: string;

  @ViewChild('form') private form: AuthForm;

  constructor(private accountService: AccountService,
    public viewCtrl: ModalController) {
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  async doSubmit(): Promise<any> {
    if (!this.form.valid) return;
    this.loading = true;

    try {
      const account = await this.accountService.login(this.form.value);
      return this.viewCtrl.dismiss(account);
    }
    catch (err) {
      this.loading = false;
      this.form.error = err && err.message || err;
      return;
    }
  }
}
