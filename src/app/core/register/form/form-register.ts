import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {AccountFieldDef, AccountService, RegisterData} from "../../services/account.service";
import {Account, REGEXP} from "../../services/model";
import {MatHorizontalStepper} from "@angular/material";
import {Subscription} from "rxjs";
import {AccountValidatorService} from "../../services/account.validator";
import {environment} from "../../../../environments/environment";
import {isNotNilOrBlank} from "../../../shared/functions";
import {SharedValidators} from "../../../shared/validator/validators";
import {DuniterService} from "../../services/duniter/duniter.service";


@Component({
  selector: 'form-register',
  templateUrl: 'form-register.html',
  styleUrls: ['./form-register.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterForm implements OnInit {

  protected debug = false;

  additionalFields: AccountFieldDef[];
  form: FormGroup;
  forms: FormGroup[];
  subscriptions: Subscription[] = [];
  error: string;
  sending: boolean = false;

  @ViewChild('stepper') private stepper: MatHorizontalStepper;

  @Output()
  onCancel: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onSubmit: EventEmitter<RegisterData> = new EventEmitter<RegisterData>();

  constructor(
      private accountService: AccountService,
      private duniter: DuniterService,
    private accountValidatorService: AccountValidatorService,
    public formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) {


    this.forms = [];

    // Uid
    this.forms.push(formBuilder.group({
      uid: [null, Validators.compose([Validators.required, Validators.pattern(REGEXP.UID), this.uidAvailability(this.duniter)])]
    }));

    // Salt
    this.forms.push(formBuilder.group({
      salt: [null, Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmSalt: [null, Validators.compose([Validators.required, this.equalsValidator('salt')])]
    }));

    // Password form
    this.forms.push(formBuilder.group({
      password: [null, Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmPassword: [null, Validators.compose([Validators.required, this.equalsValidator('password')])]
    }));

    // Detail form
    const formDetailDef = {
      lastName: [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      firstName: [null, Validators.compose([Validators.required, Validators.minLength(2)])]
    };

    // Add additional fields to details form
    this.additionalFields = this.accountService.additionalAccountFields.filter(field => field.updatable.registration);
    this.additionalFields.forEach(field => {
      //if (this.debug) console.debug("[register-form] Add additional field {" + field.name + "} to form", field);
      formDetailDef[field.name] = new FormControl(null, this.accountValidatorService.getValidators(field));
    });

    this.forms.push(formBuilder.group(formDetailDef));

    this.form = formBuilder.group({
      uidStep: this.forms[0],
      saltStep: this.forms[1],
      passwordStep: this.forms[2],
      detailsStep: this.forms[3]
    });
  }

  ngOnInit() {
    // For DEV only ------------------------
    if (!environment.production) {
      this.form.setValue({
        uidStep: {
          uid: 'abc'
        },
        saltStep: {
          salt: 'abc',
          confirmSalt: 'abc'
        },
        passwordStep: {
          password: 'def',
          confirmPassword: 'def'
        },
        detailsStep: {
          lastName: 'Test',
          firstName: 'User'
          //email: 'contact@e-is.pro'
        }
      });
    }
  }

  public get value(): RegisterData {
    const value = this.form.value;
    const result: RegisterData = {
      uid: value.uidStep.uid,
      salt: value.saltStep.salt,
      password: value.passwordStep.password,
      account: new Account()
    };
    result.account.fromObject(this.form.value.detailsStep);
    //result.account.email = result.email;

    return result;
  }

  public get valid(): boolean {
    return this.form.valid;
  }

  public isEnd(): boolean {
    return this.stepper.selectedIndex == 2;
  }

  public isBeginning(): boolean {
    return this.stepper.selectedIndex == 0;
  }

  public slidePrev() {
    return this.stepper.previous();
  }

  public slideNext() {
    return this.stepper.next();
  }

  equalsValidator(otherControlName: string): ValidatorFn {
    return function (c: AbstractControl): ValidationErrors | null {
      if (c.parent && c.value != c.parent.value[otherControlName]) {
        return {
          "equals": true
        };
      }
      return null;
    }
  }

  uidAvailability(duniter: DuniterService): AsyncValidatorFn {
    return async(control) => {
      const uid = control.value;
      if (isNotNilOrBlank(uid)) {
        try {
            await duniter.checkUidAvailable(control.value);
        } catch (err) {
          console.error(err);
          SharedValidators.addError(control, 'availability');
          return {availability: true};
        }
      }
      SharedValidators.clearError(control, 'availability');
      control.updateValueAndValidity();
      this.markForCheck();
    };
  }

  cancel() {
    this.onCancel.emit();
  }

  doSubmit(event?: any) {
    if (this.form.invalid) return;
    this.sending = true;
    this.onSubmit.emit(this.value);
  }

  markAsTouched() {
    this.form.markAsTouched();
  }

  disable() {
    this.form.disable();
  }

  enable() {
    this.form.enable();
  }

  markForCheck() {
    this.cd.markForCheck();
  }
}
