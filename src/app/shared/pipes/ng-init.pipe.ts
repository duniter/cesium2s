import { Directive, OnInit, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[ngInit]',
})
export class NgInitDirective implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Output() ngInit = new EventEmitter<any>();

  ngOnInit() {
    this.ngInit.emit();
  }
}
