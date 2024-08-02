import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Account } from '@app/account/account.model';
import { IdentityConfirmForm } from '@app/account/confirm/identity-confirm.form';
import { SettingsService } from '@app/settings/settings.service';

export interface IdentityConfirmModalOptions {
  account: Account;
}

export declare type IdentityConfirmModalRole = 'CANCEL' | 'VALIDATE';
@Component({
  selector: 'app-identity-confirm-modal',
  templateUrl: 'identity-confirm.modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentityConfirmModal implements IdentityConfirmModalOptions, OnInit {
  protected readonly mobile = inject(SettingsService).mobile;

  @Input() account: Account;

  get pending() {
    return this.form.pending;
  }

  get invalid() {
    return this.form.invalid;
  }

  get valid() {
    return this.form.valid;
  }

  @ViewChild('form', { static: true }) form: IdentityConfirmForm;

  constructor(
    private viewCtrl: ModalController,
    private _cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.form.markAsReady({ emitEvent: false });
    this.form.markAsLoaded();
    this.form.enable();
  }

  cancel() {
    this.viewCtrl.dismiss(null, <IdentityConfirmModalRole>'CANCEL');
  }

  doSubmit() {
    this.viewCtrl.dismiss(this.form.value, <IdentityConfirmModalRole>'VALIDATE');
  }
}
