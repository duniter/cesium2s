import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { APP_LOCALES, LocaleConfig, Settings } from '@app/settings/settings.model';
import { AppPage, AppPageState } from '@app/shared/pages/base-page.class';
import { RxState } from '@rx-angular/state';
import { RxStateProperty, RxStateSelect } from '@app/shared/decorator/state.decorator';
import { Observable, skip } from 'rxjs';
import { IonModal } from '@ionic/angular';
import { NetworkService } from '@app/network/network.service';

export interface SettingsPageState extends Settings, AppPageState {
  dirty: boolean;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  providers: [RxState],
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
  @RxStateSelect() preferredPeers$: Observable<string[]>;
  @RxStateSelect() peer$: Observable<string>;
  @RxStateSelect() dirty$: Observable<boolean>;

  @RxStateProperty() peer: string;
  @RxStateProperty() locale: string;
  @RxStateProperty() darkMode: boolean;
  @RxStateProperty() unAuthDelayMs: number;
  @RxStateProperty() dirty: boolean;

  @ViewChild('peerModal') peerModal: IonModal;

  constructor(
    protected networkService: NetworkService,
    @Inject(APP_LOCALES) protected locales: LocaleConfig[]
  ) {
    super({ name: 'settings' });

    // Detect changes
    this._state.hold(this._state.select(['peer', 'locale', 'unAuthDelayMs'], (s) => s).pipe(skip(1)), () => {
      if (this.mobile) {
        this.save();
      } else {
        this.markAsDirty();
      }
    });
  }

  protected async ngOnLoad() {
    await this.settings.ready();
    return {
      ...this.settings.clone(),
      dirty: false,
    };
  }

  cancel() {
    this._state.set(this.settings.clone());
    this.markForCheck();
  }

  save() {
    this.settings.patchValue(this.data);
    this.dirty = false;
  }

  selectPeer(peer: string) {
    this.peer = peer;
    this.peerModal.dismiss();
  }

  markAsDirty() {
    this.dirty = true;
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.save();
  }
}
