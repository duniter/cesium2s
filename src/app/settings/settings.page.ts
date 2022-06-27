import {Component, Inject, Injector, OnInit} from '@angular/core';
import {SettingsService} from "@app/settings/settings.service";
import {APP_LOCALES, LocaleConfig, Settings} from "@app/settings/settings.model";
import {BasePage} from "@app/shared/pages/base.page";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage extends BasePage<Settings> implements OnInit {

  constructor(
    injector: Injector,
    @Inject(APP_LOCALES) public locales: LocaleConfig[]
  ) {
    super(injector, {name: 'settings'});
  }

  ngOnInit() {
    super.ngOnInit()
  }

  protected async ngOnLoad(): Promise<Settings> {

    await this.settings.ready()
    return this.settings.clone();
  }

  cancel() {
    this.data = this.settings.clone();
    this.markForCheck();
  }

  save() {
    this.settings.patchValue(this.data);
  }

  selectPeer() {

  }
}
