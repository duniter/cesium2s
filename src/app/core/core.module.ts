import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {AccountFieldDef, AccountService} from './services/account.service';
import {AccountValidatorService} from './services/account.validator';
import {UserSettingsValidatorService} from './services/user-settings.validator';
import {AuthGuardService} from './services/auth-guard.service';
import {CryptoService} from './services/crypto.service';
import {BaseDataService} from './services/base.data-service.class';
import {AuthForm} from './auth/form/form-auth';
import {AuthModal} from './auth/modal/modal-auth';
import {AboutModal} from './about/modal-about';

import {RegisterConfirmPage} from "./register/confirm/confirm";
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
import {AppGraphQLModule} from './graphql/graphql.module';
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
    Referential,
    ReferentialRef,
    referentialToString,
    StatusIds
} from './services/model';
// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {SelectPeerModal} from "./peer/select-peer.modal";
import {SettingsPage} from "./settings/settings.page";
import {LocalSettingsValidatorService} from "./services/local-settings.validator";
import {GraphqlService} from "./services/graphql.service";
import {PlatformService} from "./services/platform.service";
import {NetworkService} from "./services/network.service";
import {LocalSettingsService} from "./services/local-settings.service";
import {MatOptionFormField} from "./config/option-field.component";
import {
    fromDateISOString,
    isNil,
    isNotNil,
    LoadResult,
    nullIfUndefined,
    SharedModule,
    TableDataService,
    toDateISOString
} from '../shared/shared.module';

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
    AccountFieldDef,
    BaseDataService,
    AccountValidatorService,
    UserSettingsValidatorService,
    AuthGuardService,
    FormButtonsBarComponent,
    RESERVED_START_COLUMNS,
    RESERVED_END_COLUMNS,
    Entity,
    Cloneable,
    EntityUtils,
    StatusIds,
    GraphqlService,
    Referential,
    ReferentialRef,
    Person,
    TableDataService,
    LoadResult,
    LocalSettingsService,
    toDateISOString,
    fromDateISOString,
    joinProperties,
    isNil,
    isNotNil,
    nullIfUndefined,
    entityToString,
    referentialToString,
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
        AppGraphQLModule,
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
        RegisterConfirmPage,
        AccountPage,
        SettingsPage,

        // Network
        SelectPeerModal,

        // Components
        MenuComponent,
        TableSelectColumnsComponent,
        FormButtonsBarComponent,
        MatOptionFormField
    ],
    exports: [
        CommonModule,
        SharedModule,
        RouterModule,
        AppGraphQLModule,
        HomePage,
        AuthForm,
        AuthModal,
        TableSelectColumnsComponent,
        FormButtonsBarComponent,
        MenuComponent,
        ReactiveFormsModule,
        TranslateModule,
        AboutModal,
        MatOptionFormField
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
        LocalSettingsValidatorService
    ]
})
export class CoreModule {

    constructor(
        translate: TranslateService,
        settings: LocalSettingsService,
        accountService: AccountService,
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

        settings.onChange.subscribe(settings => {
            if (settings && settings.locale && settings.locale !== translate.currentLang) {
                translate.use(settings.locale);
            }
        });

    accountService.onLogin.subscribe(account => {
      if (settings.settings.accountInheritance) {
        if (account.settings && account.settings.locale && account.settings.locale !== translate.currentLang) {
          translate.use(account.settings.locale);
        }
      }
    });
  }

}
