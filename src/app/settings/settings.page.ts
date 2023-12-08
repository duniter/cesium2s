import { Component, Inject, OnInit } from '@angular/core';
import { APP_LOCALES, LocaleConfig, Settings } from '@app/settings/settings.model';
import { AppPage, AppPageState } from '@app/shared/pages/base-page.class';
import {RxState} from "@rx-angular/state";

export interface SettingsPageState extends Settings, AppPageState {}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  providers: [RxState]
})
export class SettingsPage extends AppPage<SettingsPageState> implements OnInit {
  unauthOptions = [
    {
      label: 'SETTINGS.KEEP_AUTH_OPTION.SECONDS',
      labelParam: 10,
      value: 10_000,
    },
    {
      label: 'SETTINGS.KEEP_AUTH_OPTION.SECONDS',
      labelParam: 30,
      value: 30_000,
    },
    {
      label: 'SETTINGS.KEEP_AUTH_OPTION.MINUTE',
      labelParam: 1,
      value: 60_000,
    },
    {
      label: 'SETTINGS.KEEP_AUTH_OPTION.MINUTES',
      labelParam: 15,
      value: 15 * 60_000,
    },
  ];

  constructor(@Inject(APP_LOCALES) public locales: LocaleConfig[]) {
    super({ name: 'settings' });
  }

  protected async ngOnLoad() {
    await this.settings.ready();
    return this.settings.clone();
  }

  cancel() {
    this._state.set(this.settings.clone());
    this.markForCheck();
  }

  save() {
    this.settings.patchValue(this.data);
  }

  selectPeer() {}
}
