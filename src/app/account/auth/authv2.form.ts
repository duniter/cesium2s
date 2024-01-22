import { ChangeDetectionStrategy, Component, Injector, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { RegisterModal } from '../register/register.modal';
import { slideUpDownAnimation } from '@app/shared/animations';
import { AppForm } from '@app/shared/form.class';
import { SettingsService } from '@app/settings/settings.service';
import { NetworkService } from '@app/network/network.service';
import { environment } from '@environments/environment';
import { FormUtils } from '@app/shared/forms';
import { isNil, toBoolean } from '@app/shared/functions';
import { setTimeout } from '@rx-angular/cdk/zone-less/browser';
import { AuthData } from '@app/account/auth/auth.model';

@Component({
  selector: 'app-authv2-form',
  templateUrl: 'authv2.form.html',
  animations: [slideUpDownAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthV2Form extends AppForm<AuthData> implements OnInit {
  readonly mobile: boolean;
  protected showMnemonic = false;

  @Input() canRegister: boolean;

  constructor(
    injector: Injector,
    settings: SettingsService,
    formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    public network: NetworkService
  ) {
    super(
      injector,
      formBuilder.group({
        mnemonic: [null, Validators.required],
      })
    );

    this.mobile = settings.mobile;
    this._enable = true;
  }

  disable(opts?: { onlySelf?: boolean; emitEvent?: boolean }) {
    super.disable(opts);
  }

  ngOnInit() {
    super.ngOnInit();

    this.canRegister = toBoolean(this.canRegister, true);

    // For DEV only: set the default user, for testing
    if (!environment.production && environment.dev?.auth) {
      this.form.patchValue(environment.dev.auth);
    }
  }

  doCancel() {
    this.cancel.emit();
  }

  async doSubmit(event?: UIEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.loading) {
      return;
    }

    if (!this.form.valid) {
      await FormUtils.waitWhilePending(this.form);
      if (this.form.invalid) {
        FormUtils.logErrors(this.form);
        return; // Skip if invalid
      }
    }

    this.markAsLoading();
    const data = this.value;
    this.error = null; // Reset error

    setTimeout(() => this.validate.emit(data));
  }

  register() {
    this.cancel.emit();
    setTimeout(async () => {
      const modal = await this.modalCtrl.create({
        component: RegisterModal,
        backdropDismiss: false,
      });
      return modal.present();
    }, 200);
  }

  get value(): AuthData {
    const data = this.form.value;
    return {
      v2: {
        mnemonic: data.mnemonic,
      },
    };
  }

  // get address corresponding to form input
  get address(): string {
    const data = this.form.value;
    // prevent displaying for empty credentials
    if (isNil(data.mnemonic)) {
      return '';
    }
    return '';
  }

  /* -- protected functions -- */

  protected toggleShowMnemonic(event?: Event) {
    event?.preventDefault();
    this.showMnemonic = !this.showMnemonic;
    this.markForCheck();

    // Auto hide
    if (this.showMnemonic) {
      setTimeout(() => {
        if (this.showMnemonic) {
          this.showMnemonic = false;
          this.markForCheck();
        }
      }, 2000);
    }
  }

  protected markForCheck() {
    this._cd.markForCheck();
  }
}
