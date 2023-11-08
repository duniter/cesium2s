import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { RegisterModal } from '../register/register.modal';
import { slideUpDownAnimation } from '@app/shared/animations';
import { AppForm } from '@app/shared/form.class';
import { AuthData } from '@app/auth/auth.model';
import { SettingsService } from '@app/settings/settings.service';
import { NetworkService } from '@app/network/network.service';
import { environment } from '@duniter/core-types/environments/environment';
import { FormUtils } from '@app/shared/forms';
import { isNil } from '@app/shared/functions';

@Component({
  selector: 'app-authv2-form',
  templateUrl: 'authv2.form.html',
  animations: [slideUpDownAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthV2Form extends AppForm<AuthData> implements OnInit {
  readonly mobile: boolean;

  @Output() onCancel = new EventEmitter<any>();
  @Output() onSubmit = new EventEmitter<AuthData>();

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

    setTimeout(() => this.onSubmit.emit(data));
  }

  register() {
    this.onCancel.emit();
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

  protected markForCheck() {
    this._cd.markForCheck();
  }
}
