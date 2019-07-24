import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  ViewChild
} from "@angular/core";
import {ControlValueAccessor, FormControl, FormGroupDirective, NG_VALUE_ACCESSOR} from "@angular/forms";
import {merge, Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil, tap, throttleTime} from "rxjs/operators";
import {SuggestionDataService} from "../services/data-service.class";
import {
  focusInput,
  getPropertyByPath,
  isNil,
  isNotEmptyArray,
  joinProperties,
  selectInputContent,
  setTabIndex,
  suggestFromArray
} from "../functions";
import {InputElement} from "../form/field.model";
import {MatAutocomplete} from "@angular/material";

export const DEFAULT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MatAutocompleteField),
  multi: true
};

export declare type DisplayFn = (obj:any) => string;

export declare interface  MatAutocompleteFieldConfig<T = any> {
  service?: SuggestionDataService<T>;
  filter?: any;
  values?: Observable<T[]> | T[];
  attributes: string[];
  columnSizes?: number[];
  displayWith?: DisplayFn;
}

@Component({
  selector: 'mat-autocomplete-field',
  templateUrl: 'material.autocomplete.html',
  providers: [DEFAULT_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatAutocompleteField implements OnInit, InputElement, OnDestroy, ControlValueAccessor  {

  private _implicitValue: any;
  private _onDestroy = new EventEmitter(true);

  onDropButtonClick = new EventEmitter<UIEvent>(true);


  private _onChangeCallback = (_: any) => {
  };
  private _onTouchedCallback = () => {
  };

  @Input() formControl: FormControl;

  @Input() formControlName: string;

  @Input() floatLabel: string;

  @Input() placeholder: string;

  @Input() service: SuggestionDataService<any>;

  @Input() filter: any = undefined;

  @Input() required = false;

  @Input() readonly = false;

  @Input() clearable = false;

  @Input() values: Observable<any[]> | any[];

  @Input() debounceTime = 250;

  @Input() displayWith: DisplayFn | null;

  @Input() displayAttributes: string[];

  @Input() displayColumnSizes: number[];

  @Input() tabindex: number;

  @Input() appAutofocus: boolean;

  @Input() config: MatAutocompleteFieldConfig;

  @Input('class') classList: string;

  @Output('click') onClick = new EventEmitter<MouseEvent>();

  @Output('blur') onBlur = new EventEmitter<FocusEvent>();

  @Output('focus') onFocus = new EventEmitter<FocusEvent>();

  @ViewChild('matInput') matInput: ElementRef;

  @ViewChild('autoCombo') matAutocomplete: MatAutocomplete;

  get value(): any {
    console.log("TODO: check get value")
    return this.formControl.value;
  }

  constructor(
    protected cd: ChangeDetectorRef,
    @Optional() private formGroupDir: FormGroupDirective
  ) {
  }

  ngOnInit() {
    this.formControl = this.formControl || this.formControlName && this.formGroupDir && this.formGroupDir.form.get(this.formControlName) as FormControl;
    if (!this.formControl) throw new Error("Missing mandatory attribute 'formControl' or 'formControlName' in <mat-autocomplete-field>.");

    // Configuration from config object
    if (this.config) {
      this.service = this.service || this.config.service;
      this.filter = this.filter || this.config.filter;
      this.displayAttributes = this.displayAttributes || this.config.attributes;
      this.displayColumnSizes = this.displayColumnSizes || this.config.columnSizes;
      this.displayWith = this.displayWith || this.config.displayWith;
    }

    // Default values
    this.displayAttributes = this.displayAttributes || (this.filter && this.filter.attributes) || ['label', 'name'];
    this.displayWith = this.displayWith || ((obj) => obj && joinProperties(obj, this.displayAttributes));
    this.displayColumnSizes = isNotEmptyArray(this.displayColumnSizes) ?
      this.displayColumnSizes :
      this.displayAttributes.map(attr => (attr === 'label') ? 2 : (attr === 'rankOrder' ? 1 : undefined));

    const updateEvents$ = merge(
      merge(this.onFocus, this.onClick)
         .pipe(
           map((_) => this.formControl.value),
           filter(value => isNil(value) || typeof value === "string")
         ),
      this.onDropButtonClick
        .pipe(
          filter(event => !event || !event.defaultPrevented),
          map((_) => "*")
        ),
      this.formControl.valueChanges
        .pipe(
          debounceTime(this.debounceTime),
          distinctUntilChanged()
        )
    )
        .pipe(
          takeUntil(this._onDestroy)
        )
    ;

    if (this.service) {
      this.values = updateEvents$
        .pipe(
          throttleTime(100),
          switchMap((value) => this.service.suggest(value, this.filter)),
          // Store implicit value (will use it onBlur if not other value selected)
          tap(res =>  this.updateImplicitValue(res))
        );
    }
    else if (this.values instanceof Array){
      const values = this.values;
      const searchOptions = Object.assign({searchAttributes: this.displayAttributes}, this.filter);
      this.values = updateEvents$
        .pipe(
          map(value => suggestFromArray(values, value, searchOptions)),
          // Store implicit value (will use it onBlur if not other value selected)
          tap(res =>  this.updateImplicitValue(res))
        );
    }

    if (!this.values) {
      console.warn("Missing attribute 'service', 'values' or 'config' in <mat-autocomplete-field>", this);
    }

    this.onBlur.subscribe( (event: FocusEvent) => {
      // When leave component without object, use implicit value if stored
      if (this._implicitValue && typeof this.formControl.value !== "object") {
        this.writeValue(this._implicitValue);
      }
      this._implicitValue = null;
      this.checkIfTouched();
      this.matAutocomplete.showPanel=false;
    });

    // Update tab index
    this.updateTabIndex();
  }

  ngOnDestroy(): void {
    this._onDestroy.emit();
  }

  writeValue(value: any): void {
    if (value !== this.formControl.value) {
      this.formControl.patchValue(value, {emitEvent: false});
      this._onChangeCallback(value);
    }
  }

  registerOnChange(fn: any): void {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  clear() {
    this.formControl.setValue(null);
    this.markForCheck();
  }

  selectInputContent = selectInputContent;

  focus() {
    focusInput(this.matInput);
  }

  getPropertyByPath = getPropertyByPath;

  /* -- protected method -- */

  protected updateImplicitValue(res: any[]) {
    // Store implicit value (will use it onBlur if not other value selected)
    if (res && res.length === 1) {
      this._implicitValue = res[0];
      this.formControl.setErrors(null);
    } else {
      this._implicitValue = undefined;
    }
  }

  protected checkIfTouched() {
    if (this.formControl.touched) {
      this.markForCheck();
      this._onTouchedCallback();
    }
  }

  protected updateTabIndex() {
    if (isNil(this.tabindex) || this.tabindex === -1) return; // skip

    setTimeout(() => {
      setTabIndex(this.matInput, this.tabindex);
      this.markForCheck();
    });
  }

  protected markForCheck() {
    this.cd.markForCheck();
  }
}
