import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'mathAbs'
})
@Injectable({providedIn: 'root'})
export class MathAbsPipe implements PipeTransform {

    transform(val: number): number {
      if (val !== undefined && val !== null) {
        return Math.abs(val);
      } else {
        return val;
      }
    }
}

@Pipe({
  name: 'even'
})
@Injectable({providedIn: 'root'})
export class EvenPipe implements PipeTransform {

  transform(val: number): boolean {
    return val % 2 === 0;
  }
}

@Pipe({
  name: 'odd'
})
@Injectable({providedIn: 'root'})
export class OddPipe implements PipeTransform {

  transform(val: number): boolean {
    return val % 2 !== 0;
  }
}

