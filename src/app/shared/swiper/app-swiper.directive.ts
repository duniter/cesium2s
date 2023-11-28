import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {Swiper, SwiperOptions} from 'swiper/types';

@Directive({
  selector: 'swiper-container',
  standalone: true,
})
export class SwiperDirective implements AfterViewInit {

  private readonly swiperElement: any;

  @Input('config') config?: SwiperOptions;
  @Input('modules') modules?: ((opts?: any) => void)[];

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
  }

  get swiper(): Swiper {
    return this.swiperElement.swiper;
  }
}
