import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { equals } from '../functions';

@Pipe({
  name: 'formGet',
})
export class FormGetPipe implements PipeTransform {
  transform(form: AbstractControl, path: Array<string | number> | string): AbstractControl {
    return form.get(path);
  }
}

@Pipe({
  name: 'formGetControl',
})
export class FormGetControlPipe implements PipeTransform {
  transform(form: AbstractControl, path?: Array<string | number> | string): FormControl {
    return ((form && path && form.get(path)) || form) as FormControl;
  }
}

@Pipe({
  name: 'formGetArray',
})
export class FormGetArrayPipe implements PipeTransform {
  transform(form: AbstractControl, path?: Array<string | number> | string): FormArray {
    return ((form && path && form.get(path)) || form) as FormArray;
  }
}

@Pipe({
  name: 'formGetGroup',
})
export class FormGetGroupPipe implements PipeTransform {
  transform(form: AbstractControl, path?: Array<string | number> | string): FormGroup {
    return ((form && path && form.get(path)) || form) as FormGroup;
  }
}

@Pipe({
  name: 'formGetValue',
  pure: false,
})
export class FormGetValuePipe implements PipeTransform, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any = undefined;

  private _lastControl: AbstractControl | null = null;
  private _lastPath: Array<string | number> | string;
  private _onControlValueChanges: Subscription | undefined;
  private _onControlStatusChanges: Subscription | undefined;

  constructor(private _ref: ChangeDetectorRef) {}

  transform<T>(form: AbstractControl, path?: Array<string | number> | string, listenStatusChanges = false): T {
    if (!form) {
      this._dispose();
      return undefined;
    }

    // if we ask another time for the same form and opts, return the last value
    if (form === this._lastControl && equals(path, this._lastPath)) {
      return this.value;
    }

    // store the query, in case it changes
    this._lastControl = form;

    // store the params, in case they change
    this._lastPath = path;

    // set the value
    const control = path ? form.get(path) : form;
    this.value = control?.value;

    // if there is a subscription to onLangChange, clean it
    this._dispose();

    if (control) {
      // subscribe to valueChanges event
      this._onControlValueChanges = control.valueChanges.subscribe((value) => {
        if (value !== this.value) {
          this.value = value;
          this._ref.markForCheck();
        }
      });

      // subscribe to statusChanges event
      if (listenStatusChanges) {
        this._onControlStatusChanges = control.statusChanges.subscribe(() => {
          const value = control.value;
          if (value !== this.value) {
            this.value = value;
            this._ref.markForCheck();
          }
        });
      }
    }

    return this.value;
  }

  ngOnDestroy(): void {
    this._dispose();
  }

  /**
   * Clean any existing subscription to change events
   */
  private _dispose(): void {
    this._onControlValueChanges?.unsubscribe();
    this._onControlValueChanges = undefined;
    this._onControlStatusChanges?.unsubscribe();
    this._onControlStatusChanges = undefined;
  }
}
