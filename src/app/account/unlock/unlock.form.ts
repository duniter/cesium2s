import { ChangeDetectionStrategy, Component, EventEmitter, Injector, Input, OnInit, Optional, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { SettingsService } from '@app/settings/settings.service';
import { environment } from '@environments/environment';
import { AppForm } from '@app/shared/form.class';
import { isNotNilOrBlank } from '@app/shared/functions';
import { distinctUntilChanged, map, Subject } from 'rxjs';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';

@Component({
  selector: 'app-unlock-form',
  templateUrl: 'unlock.form.html',
  styleUrls: ['./unlock.form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnlockForm extends AppForm<string> implements OnInit {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('class') classList: string = null;

  @Input() helpMessage = 'AUTH.PASSPHRASE_HELP';
  @Input() expectedCode: string = null;
  @Input() minLength: number = 5;
  @Input() maxLength: number = 5;
  @Input() control: FormControl = null;
  @Input() controlName: string = null;

  @Output() codeChange = new EventEmitter<string>();

  $valid = new Subject<boolean>();

  readonly codeMask: MaskitoOptions = {
    mask: [/[A-Z]/, /[A-Z]/, /[A-Z]/, /[A-Z]/, /[A-Z]/, /[A-Z]/],
  };

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  constructor(
    injector: Injector,
    public formBuilder: FormBuilder,
    protected settings?: SettingsService,
    @Optional() protected formGroupDir?: FormGroupDirective
  ) {
    super(injector);

    this.debug = !environment.production;
  }

  ngOnInit() {
    if (!this.control && this.formGroupDir && this.controlName) {
      const formControlName = (this.formGroupDir.directives || []).find((d) => this.controlName && d.name === this.controlName);
      this.control = formControlName && formControlName.control;
      if (this.formGroupDir && this.control) {
        this.setForm(this.formGroupDir.form);
      }
    }
    if (!this.form) {
      if (this.control) {
        this.setForm(this.control.parent as FormGroup);
      } else {
        this.setForm(
          this.formBuilder.group({
            code: new FormControl(null, this.createValidator()),
          })
        );
        this.control = this.form.get('code') as FormControl;
      }
    }
    this.registerSubscription(
      this.control.statusChanges
        .pipe(
          map((state) => state === 'VALID'),
          distinctUntilChanged()
        )
        .subscribe((valid) => this.$valid.next(valid))
    );

    // For DEV only ------------------------
    if (!environment.production) {
      this.control.setValue(this.expectedCode);
    }
  }

  get value(): string {
    return this.control.value;
  }

  get valid(): boolean {
    return this.control.valid;
  }

  doCancel() {
    this.cancel.emit();
  }

  onInput(event: Event) {
    console.log(event);
    let value = event.target['value'] || '';

    // Removes non alphanumeric characters
    value = value.toUpperCase().replace(/[^A-Z]+/g, '');

    if (value.length > this.maxLength) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.control.setValue(value || null);
    this.codeChange.emit(value);
  }

  private createValidator(): ValidatorFn {
    const validators = [Validators.required, Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)];

    // Add equals to expected code
    if (isNotNilOrBlank(this.expectedCode)) {
      return Validators.compose([...validators, this.equalsValidator(this.expectedCode)]);
    }

    return Validators.compose(validators);
  }

  private equalsValidator(expectedCode: string): ValidatorFn {
    return function (c: AbstractControl): ValidationErrors | null {
      if (c.value !== expectedCode) {
        return {
          equals: true,
        };
      }
      return null;
    };
  }
}
