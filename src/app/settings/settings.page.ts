import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { APP_LOCALES, LocaleConfig, Settings } from '@app/settings/settings.model';
import { AppPage, AppPageState } from '@app/shared/pages/base-page.class';
import { RxState } from '@rx-angular/state';
import { RxStateProperty, RxStateSelect } from '@app/shared/decorator/state.decorator';
import { Observable, skip } from 'rxjs';
import { IonModal } from '@ionic/angular';
import { NetworkService } from '@app/network/network.service';
import { map } from 'rxjs/operators';

export interface SettingsPageState extends Settings, AppPageState {
  useRelativeUnit: boolean;
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
    {
      label: 'SETTINGS.KEEP_AUTH_OPTION.MINUTES',
      labelParam: 30,
      value: 30 * 60_000,
    },
    {
      label: 'SETTINGS.KEEP_AUTH_OPTION.ALWAYS',
      value: 9999 * 60_000,
    },
  ];
  @RxStateSelect() preferredPeers$: Observable<string[]>;
  @RxStateSelect() peer$: Observable<string>;
  @RxStateSelect() preferredIndexers$: Observable<string[]>;
  @RxStateSelect() indexer$: Observable<string>;
  @RxStateSelect() dirty$: Observable<boolean>;

  @RxStateProperty() darkMode: boolean;
  @RxStateProperty() locale: string;
  @RxStateProperty() useRelativeUnit: boolean;
  @RxStateProperty() peer: string;
  @RxStateProperty() indexer: string;
  @RxStateProperty() unAuthDelayMs: number;
  @RxStateProperty() dirty: boolean;

  @ViewChild('selectPeerModal') selectPeerModal: IonModal;
  @ViewChild('selectIndexerModal') selectIndexerModal: IonModal;

  constructor(
    protected networkService: NetworkService,
    @Inject(APP_LOCALES) protected locales: LocaleConfig[]
  ) {
    super({ name: 'settings' });

    // Conversion displayUnit <--> useRelativeUnit
    this._state.connect('displayUnit', this._state.select('useRelativeUnit').pipe(map((useRelativeUnit) => (useRelativeUnit ? 'du' : 'base'))));
    this._state.connect('useRelativeUnit', this._state.select('displayUnit').pipe(map((unit) => unit === 'du')));

    // Detect changes
    this._state.hold(this._state.select(['locale', 'peer', 'indexer', 'unAuthDelayMs', 'displayUnit'], (s) => s).pipe(skip(1)), () => {
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
    this.selectPeerModal.dismiss();
  }

  selectIndexer(peer: string) {
    this.indexer = peer;
    this.selectIndexerModal.dismiss();
  }

  markAsDirty() {
    this.dirty = true;
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.save();
  }
}
