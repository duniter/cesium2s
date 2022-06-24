import {Directive, OnInit, Output, EventEmitter} from '@angular/core';

@Directive({
  selector: '[ngInit]'
})
export class NgInitDirective implements OnInit {

  @Output()
  ngInit = new EventEmitter<any>();

  ngOnInit() {
    this.ngInit.emit();
  }
}
