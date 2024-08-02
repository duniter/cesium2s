import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';

export interface FormErrors {
  [key: string]: ValidationErrors;
}

export abstract class FormErrorUtils {
  static getFormErrors(
    control: AbstractControl,
    opts?: {
      controlName?: string;
      result?: FormErrors;
      recursive?: boolean;
    }
  ): FormErrors {
    if (!control || control.valid) return undefined;

    opts = opts || {};
    opts.result = opts.result || {};

    // Form group
    if (control instanceof FormGroup) {
      // Copy errors
      if (control.errors) {
        if (opts.controlName) {
          opts.result[opts.controlName] = {
            ...control.errors,
          };
        } else {
          opts.result = {
            ...opts.result,
            ...control.errors,
          };
        }
      }

      if (!opts || opts.recursive !== false) {
        // Loop on children controls
        for (const key in control.controls) {
          const child = control.controls[key];
          if (child?.enabled) {
            this.getFormErrors(child, {
              ...opts,
              controlName: opts.controlName ? [opts.controlName, key].join('.') : key,
              result: opts.result, // Make sure to keep the same result object
            });
          }
        }
      }
    }

    // Form array
    else if (control instanceof FormArray) {
      control.controls.forEach((child, index) => {
        this.getFormErrors(child, {
          ...opts,
          controlName: (opts.controlName || '') + '.' + index,
          result: opts.result, // Make sure to keep the same result object
        });
      });
    }

    // Other type of control (e.g. simple control)
    else if (control.errors) {
      if (opts.controlName) {
        opts.result[opts.controlName] = {
          ...control.errors,
        };
      } else {
        opts.result = {
          ...opts.result,
          ...control.errors,
        };
      }
    }
    return opts.result;
  }
}
