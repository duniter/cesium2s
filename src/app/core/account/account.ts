import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {AccountService} from '../services/account.service';
import {Account, StatusIds} from '../services/model';
import {UserSettingsValidatorService} from '../services/user-settings.validator';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AccountValidatorService} from '../services/account.validator';
import {AppForm} from '../form/form.class';
import {Moment} from 'moment/moment';
import {DateAdapter} from "@angular/material";
import {AppFormUtils} from '../form/form.utils';
import {LOCALES, LocalSettingsService} from "../services/local-settings.service";
import {FormFieldDefinition} from "../../shared/form/field.model";

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
  uid: any = {
    confirmed: false,
    notConfirmed: false,
    sending: false,
    error: undefined
  };
  additionalFields: FormFieldDefinition[];
  settingsForm: FormGroup;
  locales = LOCALES;
  saving = false;

  constructor(
    protected dateAdapter: DateAdapter<Moment>,
    public formBuilder: FormBuilder,
    public accountService: AccountService,
    protected settings: LocalSettingsService,
    protected validatorService: AccountValidatorService,
    protected settingsValidatorService: UserSettingsValidatorService
  ) {
    super(dateAdapter, validatorService.getFormGroup(accountService.account), settings);

    // Add settings fo form 
    this.settingsForm = settingsValidatorService.getFormGroup(accountService.account && accountService.account.settings);
    this.form.addControl('settings', this.settingsForm);

    // Store additional fields
    this.additionalFields = accountService.additionalFields;

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
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
    this.stopListenChanges();
  }

  onLogin(account: Account) {
    console.debug('[account] Logged account: ', account);
    this.isLogin = true;

    this.setValue(account);

    this.uid.confirmed = account && account.uid && (account.statusId === StatusIds.MEMBER);
    this.uid.notConfirmed = account && account.uid && (!account.statusId || account.statusId === StatusIds.PENDING);

    this.enable();
    this.markAsPristine();

    this.startListenChanges();
  }

  onLogout() {
    this.isLogin = false;
    this.uid.confirmed = false;
    this.uid.notConfirmed = false;
    this.uid.sending = false;
    this.uid.error = undefined;
    this.form.reset();
    this.disable();

    this.stopListenChanges();
  }

  startListenChanges() {
    if (this.changesSubscription) return; // already started
    //this.changesSubscription = this.accountService.listenChanges();
  }

  stopListenChanges() {
    if (!this.changesSubscription) return;
    this.changesSubscription.unsubscribe();
    this.changesSubscription = undefined;
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
    this.form.controls.uid.disable();
    this.form.controls.pubkey.disable();

    // Always disable some additional fields
    this.additionalFields
      .filter(field => field.extra.account && field.extra.account.disable)
      .forEach(field => {
        this.form.controls[field.key].disable();
      });
  }

}
