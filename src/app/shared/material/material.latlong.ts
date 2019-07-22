import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Optional,
  Output
} from '@angular/core';
import {Platform} from '@ionic/angular';
import {FloatLabelType} from '@angular/material';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  Validators
} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {SharedValidators} from '../validator/validators';
import {
  DEFAULT_MAX_DECIMALS,
  formatLatitude,
  formatLongitude,
  parseLatitudeOrLongitude
} from '../pipes/latlong-format.pipe';
import {DEFAULT_PLACEHOLDER_CHAR} from '../constants';

const MASKS = {
  'latitude': {
    'DDMMSS': [' ', /\d/, /\d/, '°', ' ', /\d/, /\d/, '\'', ' ', /\d/, /\d/, '"', ' ', /N|S|n|s/],
    'DDMM': [' ', /\d/, /\d/, '°', ' ', /\d/, /\d/, '.', /\d/, /\d/, /\d/, '\'', ' ', /N|S|n|s/],
    'DD': [' ', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '°']
  },
  'longitude': {
    'DDMMSS': [/\d/, /\d/, '°', ' ', /\d/, /\d/, '\'', ' ', /\d/, /\d/, '"', ' ', /E|W|e|w/],
    'DDMM': [/\d/, /\d/, '°', ' ', /\d/, /\d/, '.', /\d/, /\d/, /\d/, '\'', ' ', /E|W|e|w/],
    'DD': [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '°']
  }
};

const noop = () => {
};

@Component({
  selector: 'mat-latlong',
  templateUrl: 'material.latlong.html',
  styleUrls: ['./material.latlong.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => MatLatLong),
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatLatLong implements OnInit, ControlValueAccessor {
  private _onChangeCallback: (_: any) => void = noop;
  private _onTouchedCallback: () => void = noop;
  protected disabling = false;
  protected writing = false;
  protected touchUi = false;

  mobile: boolean;
  textFormControl: FormControl;
  mask: (string | RegExp)[];
  value: number;
  inputPlaceholder: string;

  @Input() disabled: boolean = false

  @Input() formControl: FormControl;

  @Input() formControlName: string;

  @Input("placeholder") labelPlaceholder: string;

  @Input() type: 'latitude' | 'longitude';

  @Input() latLongPattern: 'DDMMSS' | 'DDMM' | 'DD';

  @Input() maxDecimals: number = DEFAULT_MAX_DECIMALS;

  @Input() placeholderChar: string = DEFAULT_PLACEHOLDER_CHAR;

  @Input() floatLabel: FloatLabelType = "auto";

  @Input() readonly = false;

  @Input() required = false;

  @Input() tabindex: number;

  @Output()
  onBlur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

  constructor(
    platform: Platform,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    @Optional() private formGroupDir: FormGroupDirective
  ) {
    this.mobile = this.touchUi && platform.is('mobile');
    this.touchUi = !platform.is('desktop');
  }

  ngOnInit() {

    this.type = this.type || 'latitude';
    this.latLongPattern = this.latLongPattern || 'DDMM';
    this.mask = MASKS[this.type] && MASKS[this.type][this.latLongPattern];
    if (!this.mask) {
      console.error("Invalid attribute value. Expected: type: 'latitude|longitude' and latlongPattern: 'DD|DDMM|DDMMSS'");
      this.type = 'latitude';
      this.latLongPattern = 'DDMM';
      this.mask = MASKS[this.type][this.latLongPattern];
    }
    if (this.maxDecimals) {
      if (this.maxDecimals < 0) {
        console.error("Invalid attribute 'maxDecimals'. Must a positive value.");
        this.maxDecimals = DEFAULT_MAX_DECIMALS;
      } else if (this.maxDecimals !== DEFAULT_MAX_DECIMALS) {
        console.warn("Invalid attribute 'maxDecimals'. Must be equals to " + DEFAULT_MAX_DECIMALS + " ! TODO: manage other value in pattern.");
        this.maxDecimals = DEFAULT_MAX_DECIMALS;
      }
    }

    this.inputPlaceholder = 'COMMON.' + (this.type === 'longitude' && 'D' || '') + this.latLongPattern + '_PLACEHOLDER';

    this.textFormControl = this.formBuilder.control(
      this.required ? ['', Validators.required] : ['']
    );

    this.formControl = this.formControl || this.formControlName && this.formGroupDir && this.formGroupDir.form.get(this.formControlName) as FormControl;
    if (!this.formControl) throw new Error("Missing mandatory attribute 'formControl' or 'formControlName' in <mat-latlong>.");

    this.formControl.setValidators(Validators.compose([
      this.formControl.validator,
      this.type === 'latitude' ? SharedValidators.latitude : SharedValidators.longitude
    ]));

    this.textFormControl.valueChanges
      .subscribe((value) => this.onFormChange(value));
  }

  writeValue(obj: any): void {
    if (this.writing) return;

    this.value = (typeof obj == "string") ? parseFloat(obj.replace(/,/g, '.')) : obj;
    this.writing = true;
    const strValue = (this.type === 'latitude' ? formatLatitude : formatLongitude)(
      this.value,
      {
        pattern: this.latLongPattern,
        maxDecimals: this.maxDecimals,
        placeholderChar: this.placeholderChar
      });
    this.textFormControl.patchValue(strValue, {emitEvent: false});
    this.writing = false;
    this.markForCheck();
  }

  registerOnChange(fn: any): void {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.disabling) return;

    this.disabling = true;
    this.writing = true;
    this.disabled = isDisabled;
    if (isDisabled) {
      this.textFormControl.disable({onlySelf: true, emitEvent: false});
    } else {
      this.textFormControl.enable({onlySelf: true, emitEvent: false});
    }
    this.writing = false;
    this.disabling = false;
    this.markForCheck();
  }

  private onFormChange(strValue): void {
    if (this.writing) return; // Skip if call by self
    this.writing = true;

    if (this.textFormControl.invalid) {
      this.formControl.markAsPending();
      this.formControl.setErrors(Object.assign({}, this.textFormControl.errors));
      this.writing = false;
      return;
    }

    this.value = strValue && parseLatitudeOrLongitude(strValue, this.latLongPattern, 7 /*=precision of the converted double value */, this.placeholderChar);

    if (isNaN(this.value)) {
      this.formControl.markAsPending();
      this.formControl.setErrors(this.type === 'latitude' ? {invalidLatitude: true} : {invalidLongitude: true});
      this.writing = false;
      return;
    }

    // Get the model value
    //console.debug("[mat-latlon] Setting value {" + this.value + "} parsed from {" + strValue + "}");
    this.formControl.patchValue(this.value, {emitEvent: false});
    this.writing = false;
    this.markForCheck();

    this._onChangeCallback(this.value);
  }


  public checkIfTouched() {
    if (this.textFormControl.touched) {
      this.markForCheck();
      this._onTouchedCallback();
    }
  }

  public _onBlur(event: FocusEvent) {
    this.checkIfTouched();
    this.onBlur.emit(event);
  }

  protected markForCheck() {
    this.cd.markForCheck();
  }
}

