import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AccountService, AccountFieldDef } from './services/account.service';
import { AccountValidatorService } from './services/account.validator';
import { UserSettingsValidatorService } from './services/user-settings.validator';
import { AuthGuardService } from './services/auth-guard.service';
import { CryptoService } from './services/crypto.service';
import { DataService } from './services/data-service.class';
import { AuthForm } from './auth/form/form-auth';
import { AuthModal } from './auth/modal/modal-auth';
import { AboutModal } from './about/modal-about';

import { RegisterConfirmPage } from "./register/confirm/confirm";
import { AccountPage } from "./account/account";
import { SharedModule } from '../shared/shared.module';
import { AppForm } from './form/form.class';
import { AppTabPage } from './form/page.class';
import { FormMetadataComponent } from './form/form-metadata.component';
import { FormButtonsBarComponent } from './form/form-buttons-bar.component';
import { AppTable, RESERVED_START_COLUMNS, RESERVED_END_COLUMNS } from './table/table.class';
import { AppTableDataSource } from './table/table-datasource.class';
import { TableSelectColumnsComponent } from './table/table-select-columns.component';
import { MenuComponent } from './menu/menu.component';
import { ReactiveFormsModule } from "@angular/forms";
import { IonicStorageModule } from '@ionic/storage';
import { HomePage } from './home/home';
import { RegisterForm } from './register/form/form-register';
import { RegisterModal } from './register/modal/modal-register';
import { AppGraphQLModule } from './graphql/graphql.module';
import { DateAdapter } from "@angular/material";
import * as moment from "moment/moment";
import { AppFormUtils } from './form/form.utils';

import { ProgressBarService } from './services/progress-bar.service';
import { ProgressInterceptor } from '../shared/interceptors/progess.interceptor';

import { environment } from '../../environments/environment';

// import ngx-translate and the http loader
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

export {
    environment, AppForm, AppFormUtils, AppTable, AppTabPage, AppTableDataSource, TableSelectColumnsComponent,
    AccountService, AccountFieldDef, DataService, AccountValidatorService, UserSettingsValidatorService,
    AuthGuardService, FormMetadataComponent, FormButtonsBarComponent,
    RESERVED_START_COLUMNS, RESERVED_END_COLUMNS
}

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
        MenuComponent,
        HomePage,
        // Auth & Register
        AuthForm,
        AuthModal,
        RegisterForm,
        RegisterModal,
        RegisterConfirmPage,
        AccountPage,

        // Components
        TableSelectColumnsComponent,
        AboutModal,
        FormMetadataComponent,
        FormButtonsBarComponent
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
        FormMetadataComponent,
        FormButtonsBarComponent,
        MenuComponent,
        ReactiveFormsModule,
        TranslateModule,
        AboutModal
    ],
    entryComponents: [
        RegisterModal,
        AuthModal,
        TableSelectColumnsComponent,
        FormMetadataComponent,
        FormButtonsBarComponent,
        AboutModal
    ],
    providers: [
        AccountService,
        AuthGuardService,
        CryptoService,
        ProgressBarService,
        AccountValidatorService,
        UserSettingsValidatorService,
        { provide: HTTP_INTERCEPTORS, useClass: ProgressInterceptor, multi: true, deps: [ProgressBarService] }
    ]
})
export class CoreModule {

    constructor(
        translate: TranslateService,
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

        accountService.onLogin.subscribe(account => {
            if (account.settings && account.settings.locale && account.settings.locale != translate.currentLang) {
                translate.use(account.settings.locale);
            }
        });
    }

}
