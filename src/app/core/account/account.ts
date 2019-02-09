import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService, AccountFieldDef } from '../services/account.service';
import { Account, referentialToString } from '../services/model';
import { UserSettingsValidatorService } from '../services/user-settings.validator';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AccountValidatorService } from '../services/account.validator';
import { AppForm } from '../form/form.class';
import { Moment } from 'moment/moment';
import { DateAdapter } from "@angular/material";
import { Platform } from '@ionic/angular';
import { AppFormUtils } from '../form/form.utils';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss']
})
export class AccountPage extends AppForm<Account> implements OnDestroy {

  isLogin: boolean;
  subscriptions: Subscription[] = [];
  changesSubscription: Subscription;
  account: Account;
  email: any = {
    confirmed: false,
    notConfirmed: false,
    sending: false,
    error: undefined
  }
  additionalFields: AccountFieldDef[];
  settingsForm: FormGroup;
  localeMap = {
    'fr': 'Français',
    'en': 'English'
  };
  locales: String[] = [];
  latLongFormats = ['DDMMSS', 'DDMM', 'DD'];
  saving: boolean = false;

  constructor(
    protected dateAdapter: DateAdapter<Moment>,
    protected platform: Platform,
    public formBuilder: FormBuilder,
    public accountService: AccountService,
    public activatedRoute: ActivatedRoute,
    protected validatorService: AccountValidatorService,
    protected settingsValidatorService: UserSettingsValidatorService
  ) {
    super(dateAdapter, platform, validatorService.getFormGroup(accountService.account));

    // Add settings fo form 
    this.settingsForm = settingsValidatorService.getFormGroup(accountService.account && accountService.account.settings);
    this.form.addControl('settings', this.settingsForm);

    // Store additional fields
    this.additionalFields = accountService.additionalAccountFields;

    // Fill locales
    for (let locale in this.localeMap) {
      this.locales.push(locale);
    }

    // By default, disable the form
    this.disable();

    // Observed some events
    this.subscriptions.push(this.accountService.onLogin.subscribe(account => this.onLogin(account)));
    this.subscriptions.push(this.accountService.onLogout.subscribe(() => this.onLogout()));
    this.subscriptions.push(this.onCancel.subscribe(() => {
      this.setValue(this.accountService.account);
      this.markAsPristine();
    }));
    if (accountService.isLogin()) {
      this.onLogin(this.accountService.account);
    }
  };

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
    this.stopListenChanges();
  }

  onLogin(account: Account) {
    console.debug('[account] Logged account: ', account);
    this.isLogin = true;

    this.setValue(account);

    this.email.confirmed = account && account.email && (account.statusId != 2);
    this.email.notConfirmed = account && account.email && (!account.statusId || account.statusId == 2);

    this.enable();
    this.markAsPristine();

    this.startListenChanges();
  }

  onLogout() {
    this.isLogin = false;
    this.email.confirmed = false;
    this.email.notConfirmed = false;
    this.email.sending = false;
    this.email.error = undefined;
    this.form.reset();
    this.disable();

    this.stopListenChanges();
  }

  startListenChanges() {
    if (this.changesSubscription) return; // already started
    this.changesSubscription = this.accountService.listenChanges();
  }

  stopListenChanges() {
    if (!this.changesSubscription) return;
    this.changesSubscription.unsubscribe();
    this.changesSubscription = undefined;
  }

  sendConfirmationEmail(event: MouseEvent) {
    if (!this.account.email || !this.email.notConfirmed) {
      event.preventDefault();
      return false;
    }

    this.email.sending = true;
    console.debug("[account] Sending confirmation email...");
    this.accountService.sendConfirmationEmail(
      this.account.email,
      this.account.settings.locale
    )
      .then((res) => {
        console.debug("[account] Confirmation email sent.");
        this.email.sending = false;
      })
      .catch(err => {
        this.email.sending = false;
        this.email.error = err && err.message || err;
      });
  }

  async save(event: MouseEvent) {
    if (this.form.invalid) {
      AppFormUtils.logFormErrors(this.form);
      return;
    }

    this.saving = true;
    this.error = undefined;

    let json = Object.assign(this.accountService.account.asObject(), this.form.value);
    let newAccount = Account.fromObject(json);

    console.debug("[account] Saving account...", newAccount);
    try {
      this.disable();

      await this.accountService.saveRemotely(newAccount);

      this.markAsPristine();
    }
    catch (err) {
      console.error(err);
      this.error = err && err.message || err;
    }
    finally {
      this.saving = false;
      this.enable();
    }
  }

  enable() {
    super.enable();

    // Some fields are always disable
    this.form.controls.email.disable();
    this.form.controls.mainProfile.disable();
    this.form.controls.pubkey.disable();

    // Always disable some additional fields
    this.additionalFields
      .filter(field => !field.updatable.account)
      .forEach(field => {
        this.form.controls[field.name].disable();
      });
  }

  referentialToString = referentialToString;
}
