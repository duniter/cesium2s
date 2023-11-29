import {Component, ElementRef, Injector, Input, OnInit, ViewChild} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {fromEventPattern, Observable, Subscription, timer} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {AccountsService} from "@app/account/accounts.service";
import {SettingsService} from "@app/settings/settings.service";
import {environment} from "@environments/environment";
import {AppForm} from "@app/shared/form.class";
import {NetworkService} from "@app/network/network.service";
import {Currency} from "@app/network/currency.model";
import {AccountMeta, AuthData} from "@app/account/account.model";
import {Swiper, SwiperOptions} from 'swiper/types';
import {IonicSlides} from "@ionic/angular";
import {SwiperDirective} from "@app/shared/swiper/app-swiper.directive";
import {isNilOrBlank, isNotNilOrBlank} from "@app/shared/functions";
import {formatAddress} from "@app/shared/currencies";

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
export class RegisterForm extends AppForm<AuthData> implements OnInit {

  protected swiperModules = [IonicSlides];

  @Input() swiperOptions: SwiperOptions = {
    initialSlide: 0,
    speed: 400,
    navigation: false,
    allowTouchMove: false,
    pagination: {clickable: false, dynamicBullets: true},
  };

  slideState = {
    index: this.swiperOptions.initialSlide,
    isBeginning: true,
    isEnd: false,
    canNext: true
  };

  @Input('class') classList: string;

  get currency(): Currency {
    return this.networkService.currency;
  }

  @ViewChild(SwiperDirective) swiperDir: SwiperDirective;

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
  }

  ngOnInit() {
    // For DEV only ------------------------
    if (!environment.production) {
      this.form.setValue({
        words: 'search average amateur muffin inspire lake resist width intact viable stone barrel'.split(' '),
        wordNumber: 1,
        code: 'AAAAA',
        codeConfirmation: null,
        name: null,
        address: null
      });
    }
  }

  protected get swiper(): Swiper {
    return this.swiperDir.swiper;
  }

  get value(): AuthData {
    const json = this.form.value;
    return {
      password: json.code,
      v2: {
        mnemonic: json.words.join(' '),
      },
      meta: <AccountMeta>{
        name: json.name
      }
    };
  }

  get valid(): boolean {
    return this.form.valid;
  }

  slideNext() {
    console.log("slideNext from slide #" + this.slideState.index);
    this.swiper.slideNext();
  }

  async slidePrev() {
    this.swiper.slidePrev()
    setTimeout(() => this.updateState());
  }

  async slideTo(index: number) {
    this.swiper.slideTo(index);
    setTimeout(() => this.updateState());
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

  cancel() {
    this.onCancel.emit();
  }

  protected async updateState(){
    this.slideState.index = this.swiper.activeIndex;
    this.slideState.isBeginning = this.slideState.index === 0 || this.swiper.isBeginning;
    this.slideState.isEnd = this.swiper.isEnd;
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
    if (!environment.production) return; // Keep existing mnemonic

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
    if (this.slideState.index !== REGISTER_FORM_SLIDES.ASK_WORD) return;
    if (!environment.production) {
      this.slideState.canNext = true;
    }
    else {
      const wordNumber = Math.min(Math.floor(Math.random() * 12 + 0.4) + 1, 12);
      this.form.patchValue({wordNumber});
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

  generateCode(force?: boolean) {
    if (this.slideState.index !== REGISTER_FORM_SLIDES.CODE) return;
    if (!environment.production) {
      this.slideState.canNext = true;
    }
    else if (force === true || isNilOrBlank(this.form.get('code').value)) {
      const code = Math.random().toString(36)
        .replace(/[^a-z]+/g, '')
        .substring(0, 5)
        .toUpperCase();
      this.form.patchValue({code});
    }
    this.slideState.canNext = true;
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
      const {account} = await this.accountService.createAccount(this.value);

      // Set address
      this.form.get('address').setValue(account.address);

      // Set default name
      if (!data.meta.name) {
        const name = formatAddress(account.address);
        this.form.get('name').setValue(name);
      }

      this.slideState.canNext = true;
      this.markAsLoaded();
    }, 250);
  }
}
