import {Component, Injector, Input, OnInit, ViewChild} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {Observable, timer} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {AccountsService} from "@app/account/accounts.service";
import {SettingsService} from "@app/settings/settings.service";
import {environment} from "@environments/environment";
import {RegisterData} from "@app/account/register/register.model";
import {AppForm} from "@app/shared/form.class";
import {IonSlides} from "@ionic/angular";
import {NetworkService} from "@app/network/network.service";
import {Currency} from "@app/network/currency.model";
import {AccountMeta} from "@app/account/account.model";

export const REGISTER_FORM_SLIDES = {
  MNEMONIC: 5,
  ASK_WORD: 6,
  CODE: 9,
  CODE_CONFIRMATION: 10,
  CONGRATULATION: 11
}

@Component({
  selector: 'app-register-form',
  templateUrl: 'register.form.html',
  styleUrls: ['./register.form.scss']
})
export class RegisterForm extends AppForm<RegisterData> implements OnInit {

  private readonly _isDevelopment: boolean;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  slideState = {
    index: this.slideOpts.initialSlide,
    isBeginning: true,
    isEnd: false,
    canNext: true
  };

  @Input('class') classList: string;

  get currency(): Currency {
    return this.networkService.currency;
  }

  @ViewChild('slides') slides: IonSlides;

  constructor(
    injector: Injector,
    private accountService: AccountsService,
    private networkService: NetworkService,
    public formBuilder: FormBuilder,
    protected settings?: SettingsService
  ) {
    super(injector);

    this.setForm(formBuilder.group({
      words: new FormControl(null, Validators.required),
      wordNumber: new FormControl(null, Validators.required),
      code: new FormControl(null, Validators.required),
      codeConfirmation: new FormControl(null, Validators.compose([Validators.required, this.equalsValidator('code')])),
      name: new FormControl(null),
      address: new FormControl(null)
    }));

    this.debug = !environment.production;
    this._isDevelopment = !environment.production;
  }

  ngOnInit() {
    // For DEV only ------------------------
    if (this._isDevelopment) {
      this.form.setValue({
        words: 'search average amateur muffin inspire lake resist width intact viable stone barrel'.split(' '),
        wordNumber: 1,
        code: 'AAAAA',
        codeConfirmation: null,
        name: 'Nouveau portefeuille',
        address: null
      });
    }
  }

  get value(): RegisterData {
    const json = this.form.value;
    const result: RegisterData = {
      mnemonic: json.words.join(' '),
      password: json.code,
      meta: <AccountMeta>{
        name: json.name
      }
    };

    return result;
  }

  get valid(): boolean {
    return this.form.valid;
  }

  async slideNext() {
    console.log("slideNext from slide #" + this.slideState.index);
    return this.slides.slideNext()
      .then(() => this.updateState());
  }

  async slidePrev() {
    return this.slides.slidePrev()
      .then(() => this.updateState());
  }

  async slideTo(index: number) {
    return this.slides.slideTo(index)
      .then(() => this.updateState());
  }

  isBeginning() {
    return this.slideState.isBeginning;
  }

  isEnd() {
    return this.slideState.isEnd;
  }

  canNext() {
    return this.slideState.canNext;
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

  emailAvailability(accountService: AccountsService): AsyncValidatorFn {
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

  protected async updateState(){
    this.slideState.index = await this.slides.getActiveIndex();
    this.slideState.isBeginning = this.slideState.index === 0 || await this.slides.isBeginning();
    this.slideState.isEnd = await this.slides.isEnd();
    this.markForCheck();

    console.debug('[register-form] Slide #' + this.slideState.index);

    switch (this.slideState.index) {
      case REGISTER_FORM_SLIDES.MNEMONIC:
        if (!this.form.get('words').valid) {
          await this.generatePhrase();
        }
        else {
          this.slideState.canNext = false;
        }
        break;
      case REGISTER_FORM_SLIDES.ASK_WORD:
        this.generateWordNumber();
        break;
      case REGISTER_FORM_SLIDES.CODE:
        this.generateCode();
        break;
      case REGISTER_FORM_SLIDES.CODE_CONFIRMATION:
        this.checkCodeConfirmation();
        break;
      case REGISTER_FORM_SLIDES.CONGRATULATION:
        await this.generateAccount();
        break;
      default:
        this.slideState.canNext = true;
    }
  }

  protected async generatePhrase() {
    if (this._isDevelopment) return; // Keep existing mnemonic

    // Clear previous phrase
    this.form.get('words').reset(null);
    this.slideState.canNext = false;
    this.markForCheck();

    setTimeout(async () => {
      const mnemonic = await this.accountService.generateMnemonic();
      this.form.patchValue({
        words: mnemonic.split(' ')
      });
    }, 250 * Math.random());
  }

  protected toggleCanNext() {
    this.slideState.canNext = true;
  }

  protected generateWordNumber() {
    const wordNumber = Math.min(Math.floor(Math.random() * 12 + 0.4) + 1, 12);
    this.form.patchValue({wordNumber});
    if (this.slideState.index === REGISTER_FORM_SLIDES.ASK_WORD) {
      this.slideState.canNext = false;
    }
    this.markForCheck();
  }

  checkWord(word: string) {
    if (!environment.production) {
      this.slideState.canNext = true;
    }
    else {
      const words = this.form.get('words').value;
      const wordNumber = this.form.get('wordNumber').value;
      const expectedWord = words[wordNumber - 1];
      this.slideState.canNext = expectedWord === word;
    }
    this.markForCheck();
  }

  generateCode() {
    let code: string;
    if (!environment.production) {
      code = 'AAAAA';
    }
    else {
      code = Math.random().toString(36)
        .replace(/[^a-z]+/g, '')
        .substring(0, 5)
        .toUpperCase();
    }
    this.form.patchValue({code});
    this.markForCheck();
  }

  checkCodeConfirmation() {
    if (this.slideState.index !== REGISTER_FORM_SLIDES.CODE_CONFIRMATION) return;
    const code = this.form.get('codeConfirmation').value;
    const expectedCode = this.form.get('code').value;
    this.slideState.canNext = expectedCode === code;
    this.markForCheck();
  }

  async generateAccount() {
    if (this.slideState.index !== REGISTER_FORM_SLIDES.CONGRATULATION) return; // Skip

    this.slideState.canNext = false;
    this.markAsLoading();

    setTimeout(async () => {
      const data = this.value;
      const account = await this.accountService.createAddress(data);
      this.form.get('address').setValue(account.address);

      this.slideState.canNext = true;
      this.markAsLoaded();
    }, 250);
  }
}
