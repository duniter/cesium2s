import {Component, Inject, Injector, OnInit} from '@angular/core';
import {SettingsService} from "@app/settings/settings.service";
import {APP_LOCALES, LocaleConfig, Settings} from "@app/settings/settings.model";
import {BasePage} from "@app/shared/page/base.page";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage extends BasePage<Settings> implements OnInit {

  loading = true;

  constructor(
    injector: Injector,
    @Inject(APP_LOCALES) public locales: LocaleConfig[]
  ) {
    super(injector, {name: 'home'})

  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected async ngOnLoad(): Promise<Settings> {
    await this.settings.ready();
    return this.settings.clone();
  }


  changeLocale(locale: string) {
    this.settings.patchValue({locale});
    this.data.locale = locale;
    this.markForCheck();
  }
}
