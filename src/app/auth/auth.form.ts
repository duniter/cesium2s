import {ChangeDetectionStrategy, Component, EventEmitter, Injector, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {RegisterModal} from '../register/register.modal';
import {slideUpDownAnimation} from "@app/shared/animations";
import {AppForm} from "@app/shared/form.class";
import {AuthData} from "@app/auth/auth.model";
import {SettingsService} from "@app/settings/settings.service";
import {NetworkService} from "@app/network/network.service";
import {environment} from "@duniter/core-types/environments/environment";
import {FormUtils} from "@app/shared/forms";


@Component({
  selector: 'app-auth-form',
  templateUrl: 'auth.form.html',
  styleUrls: ['./auth.form.scss'],
  animations: [slideUpDownAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthForm extends AppForm<AuthData> implements OnInit {

  readonly mobile: boolean;
  showPwd = false;
  canRegister: boolean;

  @Output() onCancel = new EventEmitter<any>();
  @Output() onSubmit = new EventEmitter<AuthData>();

  disable(opts?: { onlySelf?: boolean; emitEvent?: boolean }) {
    super.disable(opts);
    this.showPwd = false; // Hide pwd when disable (e.g. when submitted)
  }

  constructor(
    injector: Injector,
    settings: SettingsService,
    formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    public network: NetworkService
  ) {
    super(injector,
      formBuilder.group({
        username: [null, Validators.required],
        password: [null, Validators.required]
      }));

    this.mobile = settings.mobile;
    this._enable = true;

  }

  ngOnInit() {
    super.ngOnInit();

    // For DEV only: set the default user, for testing
    if (!environment.production && environment.dev?.auth) {
      this.form.patchValue(environment.dev.auth);
    }
  }

  cancel() {
    this.onCancel.emit();
  }

  async doSubmit(event?: UIEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.loading) return;

    if (!this.form.valid) {
      await FormUtils.waitWhilePending(this.form);
      if (this.form.invalid) {
        FormUtils.logErrors(this.form);
        return; // Skip if invalid
      }
    }

    this.markAsLoading();
    const data = this.form.value;
    this.showPwd = false; // Hide password
    this.error = null; // Reset error

    setTimeout(() => this.onSubmit.emit({
      username: data.username,
      password: data.password
    }));
  }

  register() {
    this.onCancel.emit();
    setTimeout(async () => {
      const modal = await this.modalCtrl.create({
        component: RegisterModal,
        backdropDismiss: false
      });
      return modal.present();
    }, 200);
  }

  /* -- protected functions -- */

  protected markForCheck() {
    this._cd.markForCheck();
  }
}
