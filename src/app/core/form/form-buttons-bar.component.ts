import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'form-buttons-bar',
    templateUrl: './form-buttons-bar.component.html',
    host: { '(window:keydown)': 'hotkeys($event)' },
    styleUrls: ['./form-buttons-bar.component.scss']
})
export class FormButtonsBarComponent {

    @Input()
    disabled = false;

    @Input()
    disabledCancel = false;

    @Output()
    onCancel: EventEmitter<Event> = new EventEmitter<Event>();

    @Output()
    onSave: EventEmitter<Event> = new EventEmitter<Event>();

    @Output()
    onNext: EventEmitter<Event> = new EventEmitter<Event>();

    @Output()
    onBack: EventEmitter<Event> = new EventEmitter<Event>();

    hotkeys(event: Event) {

      if (event instanceof KeyboardEvent) {
        if (event.repeat || event.defaultPrevented) return; // skip

        // Ctrl+S
        if (event.ctrlKey && event.key == 's') {
            if (!this.disabled) this.onSave.emit(event);
            event.preventDefault();
        }
        // Ctrl+Z
        else if (event.ctrlKey && event.key == 'z') {
            if (!this.disabled && !this.disabledCancel) this.onCancel.emit(event);
            event.preventDefault();
        }
        // esc
        else if (event.key == 'Escape') {
          this.onBack.emit(event);
          event.preventDefault();
        }
      }
    }
}
