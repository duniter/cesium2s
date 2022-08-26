import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, EventEmitter, forwardRef,
  Injector,
  Input,
  OnInit,
  Optional,
  Output
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl, FormControlName, FormGroup,
  FormGroupDirective, NG_VALUE_ACCESSOR,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {SettingsService} from "@app/settings/settings.service";
import {environment} from "@environments/environment";
import {RegisterData} from "@app/register/register.model";
import {AppForm} from "@app/shared/form.class";
import {isNotNilOrBlank} from "@app/shared/functions";
import {distinctUntilChanged, map, Subject} from "rxjs";

export const REGISTER_FORM_SLIDES = {
  MNEMONIC: 5,
  ASK_WORD: 6,
  CODE: 9
}

@Component({
  selector: 'app-unlock-form',
  templateUrl: 'unlock.form.html',
  styleUrls: ['./unlock.form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnlockForm extends AppForm<string> implements OnInit {

  @Input('class') classList: string = null;

  @Input() expectedCode: string = null;
  @Input() minLength: number = 5;
  @Input() maxLength: number = 5;
  @Input() control: FormControl = null;
  @Input() controlName: string = null;

  @Output() change = new EventEmitter<string>();

  $valid = new Subject<boolean>()

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
    if (!this.control) {
      const formControlName = (this.formGroupDir.directives || []).find(d => this.controlName && d.name === this.controlName);
      this.control = formControlName && formControlName.control;
      if (this.formGroupDir && this.control) {
        this.setForm(this.formGroupDir.form);
      }
    }
    if (!this.form) {
      if (this.control) {
        this.setForm(this.control.parent as FormGroup);
      }
      else {
        this.setForm(this.formBuilder.group({
          code: new FormControl(this.createValidator())
        }));
        this.control = this.form.get('code') as FormControl;
      }
    }
    this.registerSubscription(
      this.control.statusChanges.pipe(
        map(state => state === 'VALID'),
        distinctUntilChanged()
      ).subscribe(valid => this.$valid.next(valid))
    );

    // For DEV only ------------------------
    if (!environment.production) {
      this.control.setValue(this.expectedCode);
    }

  }

  get value(): RegisterData {
    const json = this.form.value;
    return json.code;
  }

  get valid(): boolean {
    return this.form.valid;
  }

  cancel() {
    this.onCancel.emit();
  }

  onChange(event: UIEvent, value?: string) {
    value = this.control?.value;
    value = value && value.toUpperCase() || null;
    if (value && value.length > this.maxLength) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.control.setValue(value || null);
    this.change.emit(value);
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
    return function(c: AbstractControl): ValidationErrors | null {
      if (c.value !== expectedCode) {
        return {
          equals: true
        };
      }
      return null;
    };
  }
}