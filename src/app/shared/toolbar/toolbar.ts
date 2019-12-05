import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {ProgressBarService} from '../services/progress-bar.service';
import {Router} from "@angular/router";
import {IonBackButton, IonRouterOutlet, IonSearchbar, Platform} from "@ionic/angular";
import {isNotNil, toBoolean} from "../functions";
import {distinctUntilChanged} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-toolbar',
  templateUrl: 'toolbar.html',
  styleUrls: ['./toolbar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit, OnDestroy {

  private _subscription = new Subscription();

  @Input()
  title = '';

  @Input()
  color = 'primary';

  @Input()
  class = '';

  @Input()
  mobile = false;

  @Input()
  defaultBackHref: string;

  @Input()
  hasValidate = false;

  @Input()
  hasSearch: boolean;

  @Input()
  canGoBack: boolean;

  @Output()
  onValidate = new EventEmitter<Event>();

  @Output()
  onBackClick = new EventEmitter<Event>();

  @Output()
  onSearch = new EventEmitter<CustomEvent>();

  progressBarMode = 'none';

  showSearchBar: boolean;

  @ViewChild("backButton") backButton: IonBackButton;

  @ViewChild('searchbar') searchbar: IonSearchbar;

  constructor(
      private progressBarService: ProgressBarService,
      private router: Router,
      private routerOutlet: IonRouterOutlet,
      private cd: ChangeDetectorRef,
      private platform: Platform
  ) {
  }

  ngOnInit() {
    this.mobile = toBoolean(this.mobile, this.platform.is('mobile'));
    this.hasValidate = toBoolean(this.hasValidate, this.onValidate.observers.length > 0 && this.mobile);
    this.canGoBack = toBoolean(this.canGoBack, this.routerOutlet.canGoBack() || isNotNil(this.defaultBackHref));

    this.hasSearch = toBoolean(this.hasSearch, this.onSearch.observers.length > 0);
    this.showSearchBar = false;

    // Listen progress bar service mode
    this._subscription.add(this.progressBarService.onProgressChanged
        .pipe(
            distinctUntilChanged()
        )
        .subscribe((mode) => {
          if (this.progressBarMode !== mode) {
            this.progressBarMode = mode;
            this.cd.detectChanges();
          }
        }));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  async toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
    if (this.showSearchBar && this.searchbar) {
      setTimeout(async () => {
        await this.searchbar.setFocus();
      }, 300);
    }
  }

  doBackClick(event: Event) {

    this.onBackClick.emit(event);

    // Stop propagation, if need (can be cancelled by onBackClick observers)
    if (event.defaultPrevented) return;

    // Execute the back action
    this.goBack();
  }

  async goBack(): Promise<void> {
    if (this.routerOutlet.canGoBack()) {
      await this.routerOutlet.pop();
    }
    else {
      await this.router.navigateByUrl(this.defaultBackHref);
    }
  }

}
