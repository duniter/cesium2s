import { Component, Optional, Input, Output, EventEmitter, OnInit, forwardRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { MatRadioButton, MatRadioChange, MatCheckbox, MatCheckboxChange, FloatLabelType } from '@angular/material';
import { FormControl, FormBuilder, FormGroupDirective, NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { isNotNil } from '../../core/services/model';

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
    ]
})
export class MatBooleanField implements OnInit, ControlValueAccessor {
    private _onChange: (_: any) => void = noop;
    private _onTouched: () => void = noop;
    protected disabling: boolean = false;
    protected writing: boolean = false;
    protected touchUi: boolean = false;

    mobile: boolean;
    _value: boolean;
    showInput: boolean = true;
    showRadio: boolean = false;

    @Input() disabled: boolean = false

    @Input() formControl: FormControl;

    @Input() formControlName: string;

    @Input() placeholder: string;

    @Input() floatLabel: FloatLabelType = "auto";

    @Input() readonly: boolean = false;

    @Input() required: boolean = false;

    @Input() compact: boolean = false;

    @Output()
    onBlur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    @ViewChild('yesButton') yesButton: MatRadioButton;

    @ViewChild('checkboxButton') checkboxButton: MatCheckbox;

    //get accessor
    get value(): any {
        return this._value;
    };

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this._value) {
            this._value = v;
            this._onChange(v);
        }
    }

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
        this.formControl = this.formControl || this.formControlName && this.formGroupDir && this.formGroupDir.form.get(this.formControlName) as FormControl;
        if (!this.formControl) throw new Error("Missing mandatory attribute 'formControl' or 'formControlName' in <mat-boolean-field>.");
    }

    writeValue(value: any): void {
        if (this.writing) return;

        this.writing = true;
        if (value !== this._value) {
            this._value = value;
            this.showRadio = isNotNil(this._value);
        }
        this.writing = false;
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        if (this.disabling) return;

        this.disabling = true;
        this.disabled = isDisabled;
        if (isDisabled) {
            //this.formControl.disable({ onlySelf: true, emitEvent: false });
        }
        else {
            //this.formControl.enable({ onlySelf: true, emitEvent: false });
        }
        this.disabling = false;
    }

    private onRadioValueChanged(event: MatRadioChange): void {
        if (this.writing) return; // Skip if call by self
        this.writing = true;
        this._value = event.value;
        this.markAsTouched();
        this._onChange(event.value);
        this.writing = false;
    }

    private onCheckboxValueChanged(event: MatCheckboxChange): void {
        if (this.writing) return; // Skip if call by self
        this.writing = true;
        this._value = event.checked;
        this.markAsTouched();
        this._onChange(event.checked);
        this.writing = false;
    }


    public markAsTouched() {
        if (this.formControl.touched) {
            this._onTouched();
        }
    }

    public _onBlur(event: FocusEvent) {
        this.markAsTouched();
        this.onBlur.emit(event);
    }


    public _onFocus(event) {
        event.preventDefault();
        event.target.classList.add('hidden');
        this.showRadio = true;
        setTimeout(() => {
            this.yesButton && this.yesButton.focus();
            this.checkboxButton && this.checkboxButton.focus();
        });
    }
}

