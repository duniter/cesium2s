import { ChangeDetectionStrategy, Component, EventEmitter, inject, Injector, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController, PopoverController, PopoverOptions } from '@ionic/angular';
import { RegisterModal } from '../register/register.modal';
import { slideUpDownAnimation } from '@app/shared/animations';
import { AppForm } from '@app/shared/form.class';
import { SettingsService } from '@app/settings/settings.service';
import { NetworkService } from '@app/network/network.service';
import { environment } from '@environments/environment';
import { FormUtils } from '@app/shared/forms';
import { isNil, isNotNilOrBlank, toBoolean } from '@app/shared/functions';
import { getKeyringPairFromV1 } from '@app/account/crypto.utils';
import { base58Encode } from '@polkadot/util-crypto';
import { Account, LoginMethods } from '@app/account/account.model';
import { RxState } from '@rx-angular/state';
import { RxStateProperty, RxStateRegister } from '@app/shared/decorator/state.decorator';
import { debounceTime, map, mergeMap, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AccountsService } from '@app/account/accounts.service';
import { setTimeout } from '@rx-angular/cdk/zone-less/browser';
import { AuthData } from '@app/account/auth/auth.model';
import { ListPopover, ListPopoverOptions } from '@app/shared/popover/list.popover';

export interface AuthFormState {
  account: Account;
}

@Component({
  selector: 'app-auth-form',
  templateUrl: 'auth.form.html',
  styleUrls: ['./auth.form.scss'],
  animations: [slideUpDownAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class AuthForm extends AppForm<AuthData> implements OnInit {
  protected showSalt = false;
  protected showPwd = false;

  @RxStateRegister() protected state: RxState<AuthFormState> = inject(RxState);
  @RxStateProperty() protected account$: Observable<Account>;

  @Input() canRegister: boolean;

  @Output() valueChanges = new EventEmitter<AuthData>();

  disable(opts?: { onlySelf?: boolean; emitEvent?: boolean }) {
    super.disable(opts);
    this.showPwd = false; // Hide pwd when disable (e.g. when submitted)
  }

  constructor(
    injector: Injector,
    settings: SettingsService,
    formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private accountService: AccountsService,
    private popoverCtrl: PopoverController,
    public network: NetworkService
  ) {
    super(
      injector,
      formBuilder.group({
        salt: [null, Validators.required],
        password: [null, Validators.required],
      })
    );

    this.mobile = settings.mobile;
    this._enable = true;

    this.registerSubscription(this.form.valueChanges.pipe(debounceTime(500)).subscribe(() => this.valueChanges.emit(this.value)));

    this.state.connect(
      'account',
      this.valueChanges.asObservable().pipe(
        filter((data) => isNotNilOrBlank(data.v1.salt) && isNotNilOrBlank(data.v1.password)),
        mergeMap((data) => this.accountService.createAccount(data)),
        map(({ account }) => account)
      )
    );
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

  async doSubmit(event?: Event) {
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
    const data = this.value;
    this.showSalt = false; // Hide salt
    this.showPwd = false; // Hide password
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
      v1: {
        salt: data?.salt,
        password: data?.password,
      },
    };
  }

  get pubkey(): string {
    const data = this.form.value;
    // prevent displaying for empty credentials
    if (isNil(data.salt) || isNil(data.password)) {
      return '';
    }
    const pair = getKeyringPairFromV1(data);
    const pubkey = pair.publicKey;
    return base58Encode(pubkey);
  }

  // get address corresponding to form input
  get address(): string {
    const data = this.form.value;
    // prevent displaying for empty credentials
    if (isNil(data.salt) || isNil(data.password)) {
      return '';
    }
    return getKeyringPairFromV1(data).address;
  }

  /* -- protected functions -- */

  protected toggleShowSalt(event?: Event) {
    event?.preventDefault();
    this.showSalt = !this.showSalt;
    this.markForCheck();

    // Auto hide
    if (this.showSalt) {
      setTimeout(() => {
        if (this.showSalt) {
          this.showSalt = false;
          this.markForCheck();
        }
      }, 2000);
    }
  }

  protected toggleShowPwd(event?: Event) {
    event?.preventDefault();
    this.showPwd = !this.showPwd;
    this.markForCheck();

    // Auto hide
    if (this.showPwd) {
      setTimeout(() => {
        if (this.showPwd) {
          this.showPwd = false;
          this.markForCheck();
        }
      }, 2000);
    }
  }

  protected markForCheck() {
    this._cd.markForCheck();
  }
}
