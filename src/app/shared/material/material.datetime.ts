import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnInit,
  Optional,
  ViewChild
} from '@angular/core';
import {Platform} from '@ionic/angular';
import {DateAdapter, FloatLabelType, MatDatepicker, MatDatepickerInputEvent} from '@angular/material';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  Validators
} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {Moment} from "moment/moment";
import {DATE_ISO_PATTERN, DEFAULT_PLACEHOLDER_CHAR} from '../constants';
import {SharedValidators} from '../validator/validators';
import {isNilOrBlank} from "../functions";
import {Keyboard} from "@ionic-native/keyboard/ngx";
import {first} from "rxjs/operators";
import {fadeInAnimation} from "./material.animations";

export const DEFAULT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MatDateTime),
  multi: true
};

const DAY_MASK = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

const HOUR_TIME_PATTERN = /[0-2]\d:[0-5]\d/;
const HOUR_MASK = [/[0-2]/, /\d/, ':', /[0-5]/, /\d/];
;

const noop = () => {
};

declare interface NgxTimePicker {
  selectedHour: { time: number };
  selectedMinute: { time: number };

  open();

  close();
}

@Component({
  selector: 'mat-date-time',
  templateUrl: 'material.datetime.html',
  styleUrls: ['./material.datetime.scss'],
  providers: [
    DEFAULT_VALUE_ACCESSOR,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInAnimation
  ]
})
export class MatDateTime implements OnInit, ControlValueAccessor {
  private _onChangeCallback: (_: any) => void = noop;
  private _onTouchedCallback: () => void = noop;
  protected writing = true;
  protected disabling = false;

  mobile = false;
  form: FormGroup;
  displayPattern: string;
  dayPattern: string;
  date: Moment;
  locale: string;
  dayMask = DAY_MASK;
  hourMask = HOUR_MASK;

  @Input() disabled = false;

  @Input() formControl: FormControl;

  @Input() formControlName: string;

  @Input() displayTime = true;

  @Input() placeholder: string;

  @Input() floatLabel: FloatLabelType = "auto";

  @Input() readonly = false;

  @Input() required = false;

  @Input() compact = false;

  @Input() placeholderChar: string = DEFAULT_PLACEHOLDER_CHAR;

  @Input() tabindex: number;

  @ViewChild('datePicker1') datePicker1: MatDatepicker<Moment>;
  @ViewChild('datePicker2') datePicker2: MatDatepicker<Moment>;
  @ViewChild('timePicker') timePicker: NgxTimePicker;

  constructor(
    platform: Platform,
    private dateAdapter: DateAdapter<Moment>,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private keyboard: Keyboard,
    private cd: ChangeDetectorRef,
    @Optional() private formGroupDir: FormGroupDirective,
  ) {
    // Workaround because ion-datetime has issue (do not returned a ISO date)
    this.mobile = platform.is('mobile');

    this.locale = (translate.currentLang || translate.defaultLang).substr(0, 2);
  }

  ngOnInit() {

    this.formControl = this.formControl || this.formControlName && this.formGroupDir && this.formGroupDir.form.get(this.formControlName) as FormControl;
    if (!this.formControl) throw new Error("Missing mandatory attribute 'formControl' or 'formControlName' in <mat-date-time>.");

    const isRequired = this.required || this.formControl.validator === Validators.required;
    if (this.displayTime) {
      this.form = this.formBuilder.group({
        day: (isRequired ? ['', Validators.required] : ['']),
        hour: ['', isRequired ? Validators.compose([Validators.required, Validators.pattern(HOUR_TIME_PATTERN)]) : Validators.pattern(HOUR_TIME_PATTERN)]
      });
    } else {
      this.form = this.formBuilder.group({
        day: (isRequired ? ['', Validators.required] : [''])
      });
    }

    // Add custom 'validDate' validator
    this.formControl.setValidators(isRequired ? Validators.compose([Validators.required, SharedValidators.validDate]) : SharedValidators.validDate);
    //this.formControl.updateValueAndValidity({ emitEvent: false, onlySelf: true });

    // Get patterns to display date and date+time
    const patterns = this.translate.instant(['COMMON.DATE_PATTERN', 'COMMON.DATE_TIME_PATTERN']);
    this.updatePattern(patterns);

    this.form.valueChanges
      .subscribe((value) => this.onFormChange(value));

    // Listen status changes outside the component (e.g. when setErrors() is calling on the formControl)
    this.formControl.statusChanges
      .subscribe((status) => {
        if (this.readonly || this.writing || this.disabling) return; // Skip
        this.markForCheck();
      });

    this.writing = false;
  }

  writeValue(obj: any): void {
    if (this.writing) return;

    if (isNilOrBlank(obj)) {
      this.writing = true;
      if (this.displayTime) {
        this.form.patchValue({day: null, hour: null}, {emitEvent: false});
      } else {
        this.form.patchValue({day: null}, {emitEvent: false});
      }
      this.date = undefined;
      this.writing = false;
      this.markForCheck();
      return;
    }

    this.date = this.dateAdapter.parse(obj, DATE_ISO_PATTERN);
    if (!this.date) return; // invalid date

    this.writing = true;

    // With time
    if (this.displayTime) {

      // Format hh
      let hour: number | string = this.date.hour();
      hour = hour < 10 ? ('0' + hour) : hour;
      // Format mm
      let minutes: number | string = this.date.minutes();
      minutes = minutes < 10 ? ('0' + minutes) : minutes;
      // Set form value
      this.form.patchValue({
        day: this.date.clone().startOf('day').format(this.dayPattern),
        hour: `${hour}:${minutes}`
      }, {emitEvent: false});
    }

    // Without time
    else {
      //console.log("call writeValue()", this.date, this.formControl);
      // Set form value
      this.form.patchValue({
        day: this.date.clone().startOf('day').format(this.dayPattern)
      }, {emitEvent: false});
    }
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
    this.disabled = isDisabled;
    if (isDisabled) {
      this.form.disable({onlySelf: true, emitEvent: false});
    } else {
      this.form.enable({onlySelf: true, emitEvent: false});
    }
    this.disabling = false;

    this.markForCheck();
  }

  private updatePattern(patterns: string[]) {
    this.displayPattern = (this.displayTime) ?
      (patterns['COMMON.DATE_TIME_PATTERN'] !== 'COMMON.DATE_TIME_PATTERN' ? patterns['COMMON.DATE_TIME_PATTERN'] : 'L LT') :
      (this.displayPattern = patterns['COMMON.DATE_PATTERN'] !== 'COMMON.DATE_PATTERN' ? patterns['COMMON.DATE_PATTERN'] : 'L');
    this.dayPattern = (patterns['COMMON.DATE_PATTERN'] !== 'COMMON.DATE_PATTERN' ? patterns['COMMON.DATE_PATTERN'] : 'L');
  }

  private onFormChange(json): void {
    if (this.writing) return; // Skip if call by self
    this.writing = true;

    if (this.form.invalid) {
      this.formControl.markAsPending();
      const errors = {};

      if (!this.displayTime) {
        Object.assign(errors, this.form.controls.day.errors);
      } else {
        Object.assign(errors, this.form.controls.day.errors, this.form.controls.hour.errors);
      }
      this.formControl.setErrors(errors);
      this.writing = false;
      return;
    }

    // Make to remove placeholder chars
    while (json.day && json.day.indexOf(this.placeholderChar) !== -1) {
      json.day = json.day.replace(this.placeholderChar, '');
    }

    let date: Moment;

    // Parse day string
    date = json.day && this.dateAdapter.parse(json.day, this.dayPattern) || null;

    // If time
    if (this.displayTime) {

      const hourParts = (json.hour || '').split(':');
      date = date && date
      // set as time as locale time
        .locale(this.locale)
        .hour(parseInt(hourParts[0] || 0))
        .minute(parseInt(hourParts[1] || 0))
        .seconds(0).millisecond(0)
        // then change in UTC, to avoid TZ offset in final string
        .utc();
    } else {
      // Reset time
      date = date && date.utc(true).hour(0).minute(0).seconds(0).millisecond(0);
    }

    // update date picker
    this.date = date && this.dateAdapter.parse(date.clone(), DATE_ISO_PATTERN);

    // Get the model value
    const dateStr = date && date.isValid() && date.format(DATE_ISO_PATTERN).replace('+00:00', 'Z') || date;
    //console.debug("[mat-date-time] Setting date: ", dateStr);
    this.formControl.patchValue(dateStr, {emitEvent: false});
    //this.formControl.updateValueAndValidity();
    this.writing = false;
    this.markForCheck();

    this._onChangeCallback(dateStr);
  }

  private onDatePickerChange(event: MatDatepickerInputEvent<Moment>): void {
    if (this.writing || !(event && event.value)) return; // Skip if call by self
    this.writing = true;

    let date = event.value;
    date = typeof date === 'string' && this.dateAdapter.parse(date, DATE_ISO_PATTERN) || date;
    let day;
    if (this.displayTime) {
      // Keep original day (to avoid to have a offset of 1 day - fix #33)
      day = date && date.clone().locale(this.locale).hour(0).minute(0).seconds(0).millisecond(0).utc(true);
      const hourParts = (this.form.controls.hour.value || '').split(':');
      date = date && date
      // set as time as locale time
        .locale(this.locale)
        .hour(parseInt(hourParts[0] || 0))
        .minute(parseInt(hourParts[1] || 0))
        .seconds(0).millisecond(0)
        // then change in UTC, to avoid TZ offset in final string
        .utc();
    } else {
      // avoid to have TZ offset
      date = date && date.utc(true).hour(0).minute(0).seconds(0).millisecond(0);
      day = date && date.clone().startOf('day');
    }

    // update day value
    this.form.controls.day.setValue(day && day.format(this.dayPattern), {emitEvent: false});

    // Get the model value
    const dateStr = date && date.format(DATE_ISO_PATTERN).replace('+00:00', 'Z');
    this.formControl.patchValue(dateStr, {emitEvent: false});
    this.writing = false;
    this.markForCheck();

    this._onChangeCallback(dateStr);
  }

  public checkIfTouched() {
    if (this.form.touched) {
      this.markForCheck();
      this._onTouchedCallback();
    }
  }

  public openDatePickerIfMobile(event: UIEvent, datePicker?: MatDatepicker<Moment>) {
    if (!this.mobile || event.defaultPrevented) return;

    this.preventEvent(event);

    if (this.keyboard.isVisible) {
      this.keyboard.hide();
      this.keyboard.onKeyboardHide().pipe(first()).subscribe(() => {
        this.openDatePicker(event, datePicker);
      });
      return;
    }

    // Open the picker
    this.openDatePicker(event, datePicker);
  }

  public openDatePicker(event: UIEvent, datePicker?: MatDatepicker<Moment>) {
    datePicker = datePicker || this.datePicker1 || this.datePicker2;
    if (datePicker) {
      this.preventEvent(event);
      if (!datePicker.opened) {
        datePicker.open();
      }
    }
  }

  public openTimePickerIfMobile(event: UIEvent) {
    if (!this.mobile || event.defaultPrevented) return;

    this.preventEvent(event);

    if (this.keyboard.isVisible) {
      this.keyboard.hide();
      this.keyboard.onKeyboardHide().pipe(first()).subscribe(() => {
        this.openTimePicker(event);
      });
      return;
    }

    // Open the picker
    this.openTimePicker(event);
  }

  public openTimePicker(event: UIEvent) {
    if (this.timePicker) {
      this.preventEvent(event);
      this.timePicker.open();
    }
  }

  public onTimePickerChange(value: string) {
    if (this.form.controls['hour'].value !== value) {
      this.form.controls['hour'].patchValue(value, {emitEvent: false});
      this.markForCheck();
    }
  }

  onTimePickerKeyup(event: KeyboardEvent) {
    if (!this.timePicker) return;
    if (event.key === 'Enter') {
      // Format hour
      let hour: number | string = this.timePicker.selectedHour.time;
      hour = hour < 10 ? ('0' + hour) : hour;
      // Format minutes
      let minutes: number | string = this.timePicker.selectedMinute.time;
      minutes = minutes < 10 ? ('0' + minutes) : minutes;
      // Notify the changes (will update the value)
      this.onTimePickerChange(`${hour}:${minutes}`);
      event.preventDefault();
      event.stopPropagation();
      // Close the picker
      this.timePicker.close();
    } else if (event.key === 'Escape') {
      // Close the picker
      event.preventDefault();
      event.stopPropagation();
      this.timePicker.close();
    }
  }

  preventEvent(event: UIEvent) {
    if (!event) return;
    event.preventDefault();
    if (event.stopPropagation) event.stopPropagation();
    event.returnValue = false;
  }

  /* -- protected method -- */

  protected markForCheck() {
    this.cd.markForCheck();
  }
}

