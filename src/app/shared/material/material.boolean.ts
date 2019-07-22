import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Optional,
  Output,
  ViewChild
} from '@angular/core';
import {FloatLabelType, MatCheckbox, MatCheckboxChange, MatRadioButton, MatRadioChange} from '@angular/material';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroupDirective, NG_VALUE_ACCESSOR} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {isNil, isNotNil} from '../functions';
import {InputElement} from "./focusable";

const noop = () => {
};

@Component({
  selector: 'mat-boolean-field',
  templateUrl: 'material.boolean.html',
  styleUrls: ['./material.boolean.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => MatBooleanField),
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatBooleanField implements OnInit, ControlValueAccessor, InputElement {
  private _onChangeCallback: (_: any) => void = noop;
  private _onTouchedCallback: () => void = noop;
  private _value: boolean;
  protected disabling = false;
  protected writing = false;

  showRadio = false;

  @Input() disabled = false;

  @Input() formControl: FormControl;

  @Input() formControlName: string;

  @Input() placeholder: string;

  @Input() floatLabel: FloatLabelType = "auto";

  @Input() readonly = false;

  @Input() required = false;

  @Input() compact = false;

  @Input() tabindex: number;

  @Output()
  onBlur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

  get value(): any {
    return this._value;
  }

  @Input()
  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this._onChangeCallback(v);
    }
  }

  @ViewChild('yesButton') yesButton: MatRadioButton;

  @ViewChild('checkboxButton') checkboxButton: MatCheckbox;

  @ViewChild('fakeInput') fakeInput: ElementRef;

  constructor(
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    @Optional() private formGroupDir: FormGroupDirective
  ) { }

  ngOnInit() {
    this.formControl = this.formControl || this.formControlName && this.formGroupDir && this.formGroupDir.form.get(this.formControlName) as FormControl;
    if (!this.formControl) throw new Error("Missing mandatory attribute 'formControl' or 'formControlName' in <mat-boolean-field>.");
  }

  writeValue(value: any): void {
    if (this.writing) return;

    this.writing = true;
    if (value !== this._value) {
      this._value = value;
      console.log("TODO: update showRadio")
      this.showRadio = isNotNil(this._value);
      setTimeout(() => this.updateTabIndex());
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
    this.disabled = isDisabled;
  }

  checkIfTouched() {
    if (this.formControl.touched) {
      this.markForCheck();
      this._onTouchedCallback();
    }
  }

  _onBlur(event: FocusEvent) {
    this.checkIfTouched();
    this.onBlur.emit(event);
  }

  _onFocusFakeInput(event: FocusEvent) {
    event.preventDefault();

    // Hide the fake input
    this.fakeInput.nativeElement.classList.add('hidden');
    this.fakeInput.nativeElement.tabIndex = -1;

    // Focus on first button
    this.focus();
  }

  focus() {
    this.showRadio = true;
    setTimeout(() => {
      if (this.yesButton) {
        this.yesButton.focus();
      }
      else if (this.checkboxButton) {
        this.checkboxButton.focus();
      }
      this.updateTabIndex();
    });
  }
  /* -- protected method -- */


  private updateTabIndex() {
    if (isNil(this.tabindex) || this.tabindex === -1) return;

    if (this.fakeInput) {
      if (this.showRadio) {
        this.fakeInput.nativeElement.classList.add('hidden');
        this.fakeInput.nativeElement.tabIndex = -1;
      } else {
        this.fakeInput.nativeElement.classList.remove('hidden');
        this.fakeInput.nativeElement.tabIndex = this.tabindex;
      }
    }
    if (this.yesButton) {
      this.yesButton._inputElement.nativeElement.tabIndex = this.showRadio ? this.tabindex : -1;
    } else if (this.checkboxButton) {
      this.checkboxButton._inputElement.nativeElement.tabIndex = this.showRadio ? this.tabindex : -1;
    }
    this.markForCheck();

  }

  private onRadioValueChanged(event: MatRadioChange): void {
    if (this.writing) return; // Skip if call by self
    this.writing = true;
    this._value = event.value;
    this.checkIfTouched();
    this._onChangeCallback(event.value);
    this.writing = false;
  }

  private onCheckboxValueChanged(event: MatCheckboxChange): void {
    if (this.writing) return; // Skip if call by self
    this.writing = true;
    this._value = event.checked;
    this.checkIfTouched();
    this._onChangeCallback(event.checked);
    this.writing = false;
  }

  private markForCheck() {
    this.cd.markForCheck();
  }
}

