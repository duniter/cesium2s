import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input, OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {ProgressBarService} from '../services/progress-bar.service';
import {Router} from "@angular/router";
import {IonBackButton, IonRouterOutlet, Platform} from "@ionic/angular";
import {isNil, isNotNil, toBoolean} from "../functions";
import {distinctUntilChanged} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-toolbar',
  templateUrl: 'toolbar.html',
  styleUrls: ['./toolbar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;

  @Input()
  title = '';

  @Input()
  color = 'primary';

  @Input()
  class = '';

  @Input()
  hasValidate = false;

  @Input()
  mobile= false;

  @Input()
  defaultBackHref: string;

  @Input()
  hasSearch = false;

  @Input()
  canGoBack = false;

  @Output()
  onValidate: EventEmitter<Event> = new EventEmitter<Event>();

  @Output()
  onBackClick: EventEmitter<Event> = new EventEmitter<Event>();

  progressBarMode = 'none';


  @ViewChild("backButton") backButton: IonBackButton;

  constructor(
    private progressBarService: ProgressBarService,
    protected router: Router,
    public routerOutlet: IonRouterOutlet,
    private cd: ChangeDetectorRef,
    private platform: Platform
  ) {
  }

  ngOnInit() {
    this.mobile = toBoolean(this.mobile, this.platform.is('mobile'));
    this.hasValidate = toBoolean(this.hasValidate, this.onValidate.observers.length > 0) && this.mobile;
    this._subscription = this.progressBarService.onProgressChanged
      .pipe(
        //debounceTime(100),
        distinctUntilChanged()
      )
      .subscribe((mode) => {
        if (this.progressBarMode !== mode) {
          this.progressBarMode = mode;
          this.cd.detectChanges();
        }
      });
    if (isNil(this.canGoBack)) {
      this.canGoBack = this.routerOutlet.canGoBack() || isNotNil(this.defaultBackHref);
    }
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  enableSearchBar() {
    console.warn('[app-toolbar] TODO: implement enableSearchBar()');
  }

  doBackClick(event: Event) {

    this.onBackClick.emit(event);

    // Stop propagation, if need
    if (event.defaultPrevented) return;

    this.goBack();
  }

  goBack() {
    if (this.routerOutlet.canGoBack()) {
      this.routerOutlet.pop();
    }
    else {
      this.router.navigateByUrl(this.defaultBackHref);
    }
  }

}
