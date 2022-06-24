import {ChangeDetectorRef, OnDestroy, Pipe, PipeTransform} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {equals} from '../functions';

@Pipe({
  name: 'addressFormat'
})
export class AddressFormatPipe implements PipeTransform {

  transform(value: string, withChecksum?: boolean ): string {
    if (value.length < 12) return '?';
    return value.substring(0,6) + '...' + value.substring(value.length - 6);
  }
}
