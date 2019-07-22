// Import the core angular services.
import {AfterContentInit, Directive, ElementRef, OnChanges, OnDestroy, SimpleChanges} from "@angular/core";
import {Platform} from "@ionic/angular";
import {Keyboard} from "@ionic-native/keyboard/ngx";
import Timeout = NodeJS.Timeout;

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

const BASE_TIMER_DELAY = 100;

@Directive({
  selector: "[autofocus], input[appAutofocus]",
  inputs: [
    "shouldFocusElement: appAutofocus",
    "timerDelay: autofocusDelay"
  ]
})
export class AutofocusDirective implements AfterContentInit, OnChanges, OnDestroy {

  public shouldFocusElement: any;
  public timerDelay: number;

  private elementRef: ElementRef;
  private timer: Timeout = null;
  private touchUi: boolean;

  // I initialize the autofocus directive.
  constructor( elementRef: ElementRef, platform: Platform, protected keyboard: Keyboard ) {

    this.elementRef = elementRef;

    this.shouldFocusElement = "";
    this.timer = null;
    this.timerDelay = BASE_TIMER_DELAY;

    this.touchUi = platform.is('mobile') || platform.is('tablet');
  }

  // ---
  // PUBLIC METHODS.
  // ---

  // I get called once after the contents have been fully initialized.
  public ngAfterContentInit() {

    // Because this directive can act on the stand-only "autofocus" attribute or
    // the more specialized "appAutofocus" property, we need to check to see if the
    // "shouldFocusElement" input property is the empty string. This will signify
    // that the focus it not being data-driven and should be performed automatically.
    if ( this.shouldFocusElement === "" ) {

      this.startFocusWorkflow();

    }

  }


  // I get called every time the input bindings are updated.
  public ngOnChanges( changes: SimpleChanges ) {

    // If the timer delay is being passed-in as a string (ie, someone is using
    // attribute-input syntax, not property-input syntax), let's coalesce the
    // attribute to a numeric value so that our type-annotations are consistent.
    if ( changes.timerDelay && ( typeof( this.timerDelay ) !== "number" ) ) {

      // If the coalesce fails, just fall-back to a sane value.
      if ( isNaN( this.timerDelay = +this.timerDelay ) ) {

        this.timerDelay = BASE_TIMER_DELAY;

      }

    }

    // If the focus input is being data-driven, then we either need to start the
    // focus workflow if focus is required; or, clear any existing workflow if focus
    // is no longer required (so that we don't steal focus from another element).
    if ( changes.shouldFocusElement ) {

      ( this.shouldFocusElement )
        ? this.startFocusWorkflow()
        : this.stopFocusWorkflow()
      ;

    }

  }


  // I get called once when the directive is being unmounted.
  public ngOnDestroy() {

    this.stopFocusWorkflow();

  }

  // ---
  // PRIVATE METHODS.
  // ---

  // I start the timer-based workflow that will focus the current element.
  private startFocusWorkflow() {

    // if touch UI: do NOT focus when keyboard hide
    if (this.touchUi && this.keyboard.isVisible === false) return;

    // If there is already a timer running for this element, just let it play out -
    // resetting it at this point will only push-out the time at which the focus is
    // applied to the element.
    if ( this.timer ) {

      return;

    }

    this.timer = setTimeout(
      () => {
        this.timer = null;
        this.elementRef.nativeElement.focus();
      },
      this.timerDelay
    );

  }


  // I stop the timer-based workflow, preventing focus from taking place.
  private stopFocusWorkflow() {

    clearTimeout( this.timer );
    this.timer = null;

  }

}
