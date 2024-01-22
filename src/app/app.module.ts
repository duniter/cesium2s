import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PlatformService } from './shared/services/platform.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage-angular';
import { environment } from '@environments/environment';
import { AppSharedModule } from '@app/shared/shared.module';
import { APP_BASE_HREF } from '@angular/common';
import { JDENTICON_CONFIG } from 'ngx-jdenticon';
import { APP_LOCALES } from '@app/settings/settings.model';
import { APP_STORAGE } from '@app/shared/services/storage/storage.utils';
import { StorageService } from '@app/shared/services/storage/storage.service';
import { AccountsService } from '@app/account/accounts.service';
import { AppAccountModule } from '@app/account/account.module';
import { AppTransferModule } from '@app/transfer/transfer.module';
import { APP_GRAPHQL_TYPE_POLICIES } from '@app/shared/services/network/graphql/graphql.service';
import { INDEXER_GRAPHQL_TYPE_POLICIES } from '@app/network/indexer.config';

export function createTranslateLoader(http: HttpClient) {
  if (environment.production) {
    // This is need to force a reload, after an app update
    return new TranslateHttpLoader(http, './assets/i18n/', `-${environment.version}.json`);
  }
  return new TranslateHttpLoader(http, './assets/i18n/', `.json`);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: environment.name || 'cesium2',
      ...environment.storage,
    }),
    TranslateModule.forRoot({
      defaultLanguage: environment.defaultLocale,

      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),

    AppRoutingModule,
    AppSharedModule,
    AppAccountModule.forRoot(),
    AppTransferModule.forRoot(),
  ],
  providers: [
    PlatformService,
    StorageService,
    AccountsService,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: APP_GRAPHQL_TYPE_POLICIES,
      useValue: {
        ...INDEXER_GRAPHQL_TYPE_POLICIES,
      },
    },
    { provide: APP_STORAGE, useExisting: StorageService },
    { provide: APP_BASE_HREF, useValue: environment.baseUrl || '/' },

    {
      provide: APP_LOCALES,
      useValue: [
        { key: 'en', value: 'English', country: 'us' },
        { key: 'en-GB', value: 'English (UK)', country: 'gb' },
        { key: 'eo-EO', value: 'Esperanto', country: 'eo' },
        { key: 'fr', value: 'Français', country: 'fr' },
        { key: 'nl-NL', value: 'Nederlands', country: 'nl' },
        { key: 'es-ES', value: 'Spanish', country: 'es' },
        { key: 'ca', value: 'Català', country: 'ca' },
        { key: 'it-IT', value: 'Italiano', country: 'it' },
      ],
    },

    // Custom identicon style
    // https://jdenticon.com/icon-designer.html?config=4451860010ff320028501e5a
    {
      provide: JDENTICON_CONFIG,
      useValue: {
        lightness: {
          color: [0.26, 0.8],
          grayscale: [0.3, 0.9],
        },
        saturation: {
          color: 0.5,
          grayscale: 0.46,
        },
        backColor: '#0000',
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
