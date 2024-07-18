import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppForm } from '@app/shared/form.class';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IdentityConfirmValidators } from '@app/account/confirm/identity-confirm.validator';
import { IndexerService } from '@app/network/indexer/indexer.service';
import { SharedValidators } from '@app/shared/form/form-validators';
import { filter, first } from 'rxjs/operators';
import { debounceTime } from 'rxjs';

export interface IdentityConfirmData {
  pseudo: string;
}
@Component({
  selector: 'app-identity-confirm-form',
  templateUrl: 'identity-confirm.form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentityConfirmForm extends AppForm<IdentityConfirmData> implements OnInit {
  constructor(formBuilder: FormBuilder, indexerService: IndexerService) {
    super();

    this.setForm(
      formBuilder.group({
        pseudo: new FormControl<string>(
          null,
          // Validators
          [Validators.required, Validators.minLength(3), SharedValidators.uid],
          // Async validators
          IdentityConfirmValidators.availableUid(indexerService)
        ),
      })
    );

    this._i18nPrefix = 'ACCOUNT.NEW.';
  }

  ngOnInit() {
    console.debug(`${this._logPrefix} Init`);
    super.ngOnInit();

    // Force control to be touched, if invalid and more than 3 characters
    const pseudoControl = this.form.get('pseudo');
    this.registerSubscription(
      pseudoControl.statusChanges
        .pipe(
          debounceTime(450),
          filter(() => !pseudoControl.touched && pseudoControl.invalid),
          first()
        )
        .subscribe(() => {
          pseudoControl.markAsTouched({ onlySelf: true });
          this.markForCheck();
        })
    );
  }
}
