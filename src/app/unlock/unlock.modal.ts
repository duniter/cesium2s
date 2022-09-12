import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AccountService} from '@app/wallet/account.service';
import {firstNotNilPromise} from '@app/shared/observables';
import {UnlockForm} from "@app/unlock/unlock.form";

export interface UnlockModalOptions {
  title?: string;
  expectedCode?: string;
  minLength?: number;
  maxLength?: number;
}

@Component({
  selector: 'app-unlock-modal',
  templateUrl: 'unlock.modal.html',
  styleUrls: ['./unlock.modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnlockModal implements OnInit, UnlockModalOptions{

  get loading() {
    return this.form?.loading;
  }

  get mobile(): boolean {
    return this.form?.mobile;
  }

  @Input() title = 'UNLOCK.TITLE';
  @Input() expectedCode: string = null;
  @Input() minLength: number = 5;
  @Input() maxLength: number = 5;

  @ViewChild('form', { static: true }) private form: UnlockForm;

  constructor(private accountService: AccountService,
              private viewCtrl: ModalController,
              private cd: ChangeDetectorRef
              ) {
  }

  ngOnInit() {

    this.form.markAsReady({emitEvent: false});
    this.form.markAsLoaded();
    this.form.enable();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  async doSubmit(data?: string): Promise<any> {
    console.debug('[auth-modal] Submit...');
    if (this.form.disabled) return;
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.markAsLoading();

    try {
      data = data || this.form.value;

      // Disable the form
      this.form.disable();

      return this.viewCtrl.dismiss(data);
    }
    catch (err) {
      this.form.error = err && err.message || err;
      this.markAsLoaded();

      // Enable the form
      this.form.enable();

      // Reset form error on next changes
      firstNotNilPromise(this.form.form.valueChanges).then(() => {
        this.form.error = null;
        this.markForCheck();
      });

      return;
    }
  }

  protected markForCheck() {
    this.cd.markForCheck();
  }

  protected markAsLoading(opts?: {emitEvent?: boolean}) {
    this.form.markAsLoading(opts);
    this.markForCheck();
  }

  protected markAsLoaded(opts?: {emitEvent?: boolean}) {
    this.form.markAsLoaded(opts);
    this.markForCheck();
  }
}