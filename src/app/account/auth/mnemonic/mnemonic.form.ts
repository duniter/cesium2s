import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { slideUpDownAnimation } from '@app/shared/animations';
import { AppForm } from '@app/shared/form.class';
import { SettingsService } from '@app/settings/settings.service';
import { environment } from '@environments/environment';
import { FormUtils } from '@app/shared/forms';
import { setTimeout } from '@rx-angular/cdk/zone-less/browser';
import { AuthData } from '@app/account/auth/auth.model';
import { debounceTime } from 'rxjs/operators';
import { mnemonicValidate } from '@polkadot/util-crypto';
import { AccountsService } from '@app/account/accounts.service';
import { formatAddress } from '@app/shared/currencies';

export function mnemonicValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return { invalidMnemonic: true };
    }

    const [mnemonic] = value.split('//');

    const isValid = mnemonicValidate(mnemonic.trim());
    return isValid ? null : { invalidMnemonic: true };
  };
}

@Component({
  selector: 'app-mnemonic-form',
  templateUrl: 'mnemonic.form.html',
  animations: [slideUpDownAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MmnemonicForm extends AppForm<AuthData> implements OnInit {
  protected showMnemonic = false;
  protected generatedAddress: string = '';

  constructor(
    settings: SettingsService,
    formBuilder: FormBuilder,
    private accountService: AccountsService
  ) {
    super(
      formBuilder.group({
        mnemonic: [null, [Validators.required, mnemonicValidator()]],
      })
    );

    this.mobile = settings.mobile;
    this._enable = true;

    this.form
      .get('mnemonic')
      .valueChanges.pipe(debounceTime(300))
      .subscribe(() => {
        const mnemonicControl = this.form.get('mnemonic');
        if (mnemonicControl.valid) {
          this.generatedAddress = formatAddress(this.accountService.generateAddress(mnemonicControl.value));
        } else {
          this.generatedAddress = '';
        }
        this.markForCheck();
      });
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
    if (!data.mnemonic) {
      return '';
    }
    return formatAddress(this.accountService.generateAddress(data.mnemonic));
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
