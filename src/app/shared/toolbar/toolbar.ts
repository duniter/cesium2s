import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ProgressBarService } from '../../core/services/progress-bar.service';
import { Subject, BehaviorSubject } from "rxjs";

@Component({
  selector: 'app-toolbar',
  templateUrl: 'toolbar.html',
  styleUrls: ['./toolbar.scss'],
})
export class ToolbarComponent implements OnInit {

  @Input()
  title: string = '';

  @Input()
  color: string = 'primary';

  @Input()
  class: string = '';

  @Input()
  hasValidate: boolean = false;

  @Input()
  hasSearch: boolean = false;

  @Output()
  onValidate: EventEmitter<any> = new EventEmitter<any>();

  progressBarMode: BehaviorSubject<string> = new BehaviorSubject('none');

  constructor(
    private progressBarService: ProgressBarService
  ) {
  }

  ngOnInit() {
    this.hasValidate = this.hasValidate && this.onValidate.observers.length > 0;
    this.progressBarService.updateProgressBar$.subscribe((mode: string) => {
      if (mode != this.progressBarMode.getValue()) {
        setTimeout(() => {
          this.progressBarMode.next(mode);
        });
      }
    });
  }

  enableSearchBar() {
    console.warn('[app-toolbar] TODO: implement enableSearchBar()');
  }

}
