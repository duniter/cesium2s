import { Component, OnInit, forwardRef, Optional, Input } from "@angular/core";
import { FormControl, NG_VALUE_ACCESSOR, FormGroupDirective } from "@angular/forms";
import { Observable } from "rxjs";
import { debounceTime, mergeMap, startWith } from "rxjs/operators";

export declare interface MatAutocompleteSearchFilter {
  search?: string;
}

export declare interface MatAutocompleteSearchService<T, F extends MatAutocompleteSearchFilter> {

    search(
        offset: number,
        size: number,
        sortBy?: string,
        sortDirection?: string,
        filter?: F,
        options?: any
    ): Observable<T[]>;

}


export const DEFAULT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MatAutocompleteField),
    multi: true
};

@Component({
    selector: 'mat-autocomplete-field',
    templateUrl: 'material.autocomplete.html',
    providers: [DEFAULT_VALUE_ACCESSOR]
})
export class MatAutocompleteField implements OnInit {

    private _onChange = (_: any) => { };
    private _onTouched = () => { };

    items: Observable<any[]>;

    @Input() formControl: FormControl;

    @Input() formControlName: string;

    @Input() floatLabel: string;

    @Input() placeholder: string;

    @Input() service: MatAutocompleteSearchService<any, any>;

    @Input() serviceOptions: any = undefined;

    @Input() filter: any = undefined;

    @Input() required = false;

    @Input() displayWith = (_: any) => '';

    constructor(
        @Optional() private formGroupDir: FormGroupDirective
    ) {

    }

    ngOnInit() {
        this.formControl = this.formControl || this.formControlName && this.formGroupDir && this.formGroupDir.form.get(this.formControlName) as FormControl;
        if (!this.formControl) throw new Error("Missing mandatory attribute 'formControl' or 'formControlName' in <mat-autocomplete-field>.");

        this.items = this.formControl.valueChanges
            .pipe(
                startWith('*'),
                debounceTime(250),
                mergeMap(value => {
                    if (this.isNotEmpty(value)) return Observable.of([value]);
                    value = (typeof value === "string") && value || undefined;
                    return this.service.search(0, 10, undefined, undefined,
                        Object.assign({
                            search: value as string,
                        }, this.filter || {}),
                        this.serviceOptions);
                })
            );

        //this.formControl.valueChanges.subscribe(value => this._onChange(value));
    }

    writeValue(value: any): void {
        console.debug("writeValue", value);
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        if (isDisabled) {
            //this.formControl.disable({ onlySelf: true, emitEvent: false });
        }
        else {
            //this.formControl.enable({ onlySelf: true, emitEvent: false });
        }
    }

    /* -- protected methods -- */

    protected isNotEmpty(obj: any): boolean {
        return !!obj && obj['id'];
    }

}
