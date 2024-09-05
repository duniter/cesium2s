import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppForm } from '@app/shared/form.class';
import { SettingsService } from '@app/settings/settings.service';
import { environment } from '@environments/environment';
import { FormUtils } from '@app/shared/forms';
import { isNil } from '@app/shared/functions';
import { setTimeout } from '@rx-angular/cdk/zone-less/browser';
import { AuthData } from '@app/account/auth/auth.model';
import { SharedValidators } from '@app/shared/form/form-validators';
import { APP_WOT_CONTROLLER, IWotController } from '@app/wot/wot.model';

@Component({
  selector: 'app-pubkey-form',
  templateUrl: 'pubkey.form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PubkeyForm extends AppForm<AuthData> implements OnInit {
  constructor(
    settings: SettingsService,
    formBuilder: FormBuilder,
    @Inject(APP_WOT_CONTROLLER) private wotCtrl: IWotController
  ) {
    super(
      formBuilder.group({
        pubkey: [null, Validators.compose([Validators.required, SharedValidators.pubkey])],
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

  async showWotModal(event: Event) {
    event.preventDefault();
    const searchText = this.form.get('pubkey').value;

    setTimeout(async () => {
      console.info('[auth] Searching in wot, on ' + searchText);
      const data = await this.wotCtrl.select({ searchText, showItemActions: false, showFilterButtons: false, showSearchBar: true, autoLoad: true });

      if (!data) return; // User cancelled

      console.info('[auth] Selected account', data);
    }, 200);
  }

  protected markForCheck() {
    this._cd.markForCheck();
  }
}
