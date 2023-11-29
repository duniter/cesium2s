import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Swiper, SwiperOptions} from 'swiper/types';
import {fromEventPattern, Subscription} from "rxjs";

@Directive({
  selector: 'swiper-container',
  standalone: true,
})
export class SwiperDirective implements AfterViewInit, OnDestroy {

  private _subscription = new Subscription();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly swiperElement: any;

  @Input() config?: SwiperOptions;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() modules?: ((opts?: any) => void)[];

  @Output() slideChangeTransitionStart = new EventEmitter<void>();

  constructor(private el: ElementRef) {
    this.swiperElement = el.nativeElement;

    // Avoid swiper to be initialized BEFORE ngAfterViewInit()
    this.swiperElement.setAttribute('init', false);
  }

  ngAfterViewInit() {
    if (this.config) {
      console.debug('[swiper] Applying config', this.config, {modules: this.modules});
      Object.assign(this.swiperElement, this.config);
    }

    this.swiperElement.initialize();

    this._subscription.add(fromEventPattern((handler) => this.swiper.on('slideChangeTransitionStart', handler))
      .subscribe(() => this.slideChangeTransitionStart.emit())
    );
  }

  ngOnDestroy() {
    this._subscription?.unsubscribe();
  }

  get swiper(): Swiper {
    return this.swiperElement.swiper;
  }
}
