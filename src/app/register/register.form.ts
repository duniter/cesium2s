import {Component, EventEmitter, Injector, OnInit, Output} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {Observable, of, Subscription, timer} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {AccountService} from "@app/wallet/account.service";
import {SettingsService} from "@app/settings/settings.service";
import {environment} from "@environments/environment";
import {RegisterData} from "@app/register/register.model";
import {AccountExtendedMeta} from "@app/wallet/account.model";
import {AppForm} from "@app/shared/form.class";


@Component({
  selector: 'form-register',
  templateUrl: 'form-register.html',
  styleUrls: ['./form-register.scss']
})
export class RegisterForm extends AppForm<RegisterData> implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  forms: FormGroup[];


  constructor(
    injector: Injector,
    private accountService: AccountService,
    public formBuilder: FormBuilder,
    protected settings?: SettingsService
  ) {
    super(injector)

    this.forms = [];
    // Email form
    this.forms.push(formBuilder.group({
      email: new FormControl(null, Validators.compose([Validators.required, Validators.email]), this.emailAvailability(this.accountService)),
      confirmEmail: new FormControl(null, Validators.compose([Validators.required, this.equalsValidator('email')]))
    }));

    // Password form
    this.forms.push(formBuilder.group({
      password: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(8)])),
      confirmPassword: new FormControl(null, Validators.compose([Validators.required, this.equalsValidator('password')]))
    }));

    // Detail form
    const formDetailDef = {
      lastName: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(2)])),
      firstName: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(2)]))
    };

    this.forms.push(formBuilder.group(formDetailDef));

    this.setForm(formBuilder.group({
      emailStep: this.forms[0],
      passwordStep: this.forms[1],
      detailsStep: this.forms[2]
    }));
  }

  ngOnInit() {
    // For DEV only ------------------------
    if (!environment.production) {
      this.form.setValue({
        emailStep: {
          email: 'contact@e-is.pro',
          confirmEmail: 'contact@e-is.pro'
        },
        passwordStep: {
          password: 'contactera',
          confirmPassword: 'contactera'
        },
        detailsStep: {
          lastName: 'Lavenier 2',
          firstName: 'Benoit'
        }
      });
    }
  }

  get value(): RegisterData {
    const result: RegisterData = {
      phrase: this.form.value.emailStep.email,
      meta: <AccountExtendedMeta>{}
    };
    result.meta.name = this.form.value.detailsStep;
    //result.meta.name = this.form.value.detailsSte;

    return result;
  }

  get valid(): boolean {
    return this.form.valid;
  }


  equalsValidator(otherControlName: string): ValidatorFn {
    return function(c: AbstractControl): ValidationErrors | null {
      if (c.parent && c.value !== c.parent.value[otherControlName]) {
        return {
          equals: true
        };
      }
      return null;
    };
  }

  emailAvailability(accountService: AccountService): AsyncValidatorFn {
    return function(control: AbstractControl): Observable<ValidationErrors | null> {

      return timer(500).pipe(mergeMap(() => Promise.resolve(true)/* accountService.checkEmailAvailable(control.value)*/
          .then(res => null)
          .catch(err => {
            console.error(err);
            return { availability: true };
          })));
    };
  }

  cancel() {
    this.onCancel.emit();
  }

}
