import {Component, Inject, Injector, OnInit} from '@angular/core';
import {SettingsService} from "@app/settings/settings.service";
import {APP_LOCALES, LocaleConfig, Settings} from "@app/settings/settings.model";
import {BasePage} from "@app/shared/pages/base.page";
import {RxState} from "@rx-angular/state";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  providers: [RxState]
})
export class SettingsPage extends BasePage<Settings> implements OnInit {

  unauthOptions = [
    {
      label: 'SETTINGS.KEEP_AUTH_OPTION.SECONDS',
      labelParam: 10,
      value: 10_000
    },
    {
      label: 'SETTINGS.KEEP_AUTH_OPTION.SECONDS',
      labelParam: 30,
      value: 30_000
    },
    {
      label: 'SETTINGS.KEEP_AUTH_OPTION.MINUTE',
      labelParam: 1,
      value: 60_000
    },
    {
      label: 'SETTINGS.KEEP_AUTH_OPTION.MINUTES',
      labelParam: 15,
      value: 15*60_000
    }
  ];

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
