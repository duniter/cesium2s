import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {AccountService} from './services/account.service';
import {AccountValidatorService} from './services/account.validator';
import {UserSettingsValidatorService} from './services/user-settings.validator';
import {AuthGuardService} from './services/auth-guard.service';
import {CryptoService} from './services/crypto.service';
import {AuthForm} from './auth/form/form-auth';
import {AuthModal} from './auth/modal/modal-auth';
import {AboutModal} from './about/modal-about';

import {AccountPage} from "./account/account";
import {AppForm} from './form/form.class';
import {AppTabPage} from './form/page.class';
import {FormButtonsBarComponent} from './form/form-buttons-bar.component';
import {AppTable, RESERVED_END_COLUMNS, RESERVED_START_COLUMNS} from './table/table.class';
import {AppTableDataSource} from './table/table-datasource.class';
import {TableSelectColumnsComponent} from './table/table-select-columns.component';
import {MenuComponent} from './menu/menu.component';
import {ReactiveFormsModule} from "@angular/forms";
import {IonicStorageModule} from '@ionic/storage';
import {HomePage} from './home/home';
import {RegisterForm} from './register/form/form-register';
import {RegisterModal} from './register/modal/modal-register';
import {DateAdapter} from "@angular/material";
import * as moment from "moment/moment";
import {AppFormUtils, FormArrayHelper} from './form/form.utils';

import {environment} from '../../environments/environment';
import {
    Cloneable,
    Entity,
    entityToString,
    EntityUtils,
    joinProperties,
    Person,
    personsToString,
    personToString,
    StatusIds
} from './services/model';
// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {SelectPeerModal} from "./peer/select-peer.modal";
import {SettingsPage} from "./settings/settings.page";
import {LocalSettingsValidatorService} from "./services/local-settings.validator";
import {GraphqlService} from "./services/network/graphql.service";
import {PlatformService} from "./services/platform.service";
import {NetworkService} from "./services/network/network.service";
import {LocalSettingsService} from "./services/local-settings.service";

import {
    fromDateISOString,
    isNil,
    isNotNil,
    LoadResult,
    nullIfUndefined,
    SharedModule,
    TableDataService,
    toBoolean,
    toDateISOString
} from '../shared/shared.module';
import {ModalController} from "@ionic/angular";
import {ApolloModule} from "apollo-angular";
import {HttpLinkModule} from "apollo-angular-link-http";
import {DuniterService} from "./services/duniter/duniter.service";
import {GvaService} from "./services/duniter/gva/gva.service";
import {BmaService} from "./services/duniter/bma/bma.service";
import {Ws2pService} from "./services/duniter/ws2p/ws2p.service";
import {Peer} from "./services/network/network.model";
import {AppFormField} from "../shared/form/field.component";

export {
    environment,
    AppForm,
    AppFormUtils,
    AppTable,
    AppTabPage,
    AppTableDataSource,
    TableSelectColumnsComponent,
    PlatformService,
    AccountService,
    NetworkService,
    AccountValidatorService,
    UserSettingsValidatorService,
    AuthGuardService,
    FormButtonsBarComponent,
    RESERVED_START_COLUMNS,
    RESERVED_END_COLUMNS,
    Entity,
    Peer,
    Cloneable,
    EntityUtils,
    StatusIds,
    GraphqlService,
    Person,
    TableDataService,
    LoadResult,
    LocalSettingsService,
    CryptoService,
    toDateISOString,
    fromDateISOString,
    joinProperties,
    isNil,
    isNotNil,
    nullIfUndefined,
    entityToString,
    personToString,
    personsToString,
    FormArrayHelper
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        HttpClientModule,
        ApolloModule,
        HttpLinkModule,
        SharedModule,
        ReactiveFormsModule,
        IonicStorageModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],

    declarations: [
        HomePage,
        AboutModal,

        // Auth & Register
        AuthForm,
        AuthModal,
        RegisterForm,
        RegisterModal,
        AccountPage,
        SettingsPage,

        // Network
        SelectPeerModal,

        // Components
        MenuComponent,
        TableSelectColumnsComponent,
        FormButtonsBarComponent,
        AppFormField
    ],
    exports: [
        CommonModule,
        SharedModule,
        RouterModule,
        ApolloModule,
        HttpLinkModule,
        HomePage,
        AuthForm,
        AuthModal,
        TableSelectColumnsComponent,
        FormButtonsBarComponent,
        MenuComponent,
        ReactiveFormsModule,
        TranslateModule,
        AboutModal,
        AppFormField
    ],
    entryComponents: [
        AboutModal,

        // Auth & Register
        RegisterModal,
        AuthModal,

        // Network
        SelectPeerModal,

        // Components
        TableSelectColumnsComponent,
        FormButtonsBarComponent
    ],
    providers: [
        LocalSettingsService,
        NetworkService,
        PlatformService,
        GraphqlService,
        AccountService,
        AuthGuardService,
        CryptoService,
        AccountValidatorService,
        UserSettingsValidatorService,
        LocalSettingsValidatorService,
        GvaService,
        BmaService,
        Ws2pService,
        DuniterService
    ]
})
export class CoreModule {

  constructor(
    translate: TranslateService,
    settingsService: LocalSettingsService,
    accountService: AccountService,
    private modalCtrl: ModalController,
    networkService: NetworkService,
    dateAdapter: DateAdapter<any>) {

    console.info("[core] Starting module...");

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(environment.defaultLocale);

    // When locale changes, apply to date adapter
    translate.onLangChange.subscribe(event => {
        if (event && event.lang) {

            // Config date adapter
            dateAdapter.setLocale(event.lang);

            // config moment lib
            try {
                const momentLocale: string = event.lang.substr(0, 2);
                moment.locale(momentLocale);
                console.debug('[app] Use locale {' + event.lang + '}');
            }
            // If error, fallback to en
            catch (err) {
                dateAdapter.setLocale('en');
                moment.locale('en');
                console.warn('[app] Unknown local for moment lib. Using default [en]');
            }
        }
    });

    settingsService.onChange.subscribe(settings => {
        if (settings && settings.locale && settings.locale !== translate.currentLang) {
            translate.use(settings.locale);
        }
    });

    accountService.onLogin.subscribe(account => {
      if (settingsService.settings.accountInheritance) {
        if (account.settings && account.settings.locale && account.settings.locale !== translate.currentLang) {
          translate.use(account.settings.locale);
        }
      }
    });

    networkService.setSelectPeerCallback((peers, opts) => this.showSelectPeerModal(peers, opts));
  }

    public async showSelectPeerModal(peers: Peer[], opts?: { allowSelectDownPeer?: boolean; }): Promise<Peer | undefined> {

        opts = opts || {};

        const modal = await this.modalCtrl.create({
            component: SelectPeerModal,
            componentProps: {
                peers: peers,
                canCancel: false,
                allowSelectDownPeer: toBoolean(opts.allowSelectDownPeer, true)
            },
            keyboardClose: true,
            showBackdrop: true
        });
        await modal.present();

        return modal.onDidDismiss()
            .then((res) => {
                return res && res.data && (res.data as Peer) || undefined;
            });
    }

}
