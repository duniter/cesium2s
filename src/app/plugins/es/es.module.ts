import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountService, CoreModule, LocalSettingsService} from '../../core/core.module';
import {EsOptions} from "./es.constants";
import {EsNetworkService} from "./services/es-network.service";
import {EsProfileService} from "./services/es-profile.service";
import {WotService} from "../../wot/services/wot.service";
import {EsWotMap} from "./map/wot-map.component";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";

export {EsNetworkService, EsProfileService};

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        LeafletModule.forRoot()
    ],
    declarations: [
        EsWotMap
    ],
    exports: [
    ],
    entryComponents: [
        EsWotMap
    ],
    providers: [
        EsNetworkService,
        EsProfileService
    ]
})
export class EsModule {
    constructor(
        esNetwork: EsNetworkService,
        esWotService: EsProfileService,
        accountService: AccountService,
        wotService: WotService,
        settings: LocalSettingsService
    ) {
        console.debug("[es] Starting ES plugin...");

        // Register options in settings
        settings.registerFields(Object.getOwnPropertyNames(EsOptions).map(key => EsOptions[key]));

        // Add profile fields
        this.addProfileFields(wotService);
    }

    /* -- protected methods -- */

    protected addProfileFields(wotService: WotService) {
        // Profile name
        wotService.addAdditionalField({
            key: 'name',
            label: 'PLUGINS.ES.PROFILE.NAME',
            type: 'string',
            extra: {
                registration: {
                    required: false,
                    disable: true
                },

                account: {
                    required: false,
                    disable: false
                }
            }
        });

        // Profile description
        wotService.addAdditionalField({
            key: 'description',
            label: 'PLUGINS.ES.PROFILE.DESCRIPTION',
            type: 'string',
            extra: {
                registration: {
                    required: false,
                    disable: true
                },

                account: {
                    required: false,
                    disable: false
                }
            }
        });

        // profile.address
        // wotService.addAdditionalField({
        //     key: 'address',
        //     label: 'PLUGINS.ES.PROFILE.ADDRESS',
        //     type: 'string',
        //     extra: {
        //         registration: {
        //             required: false,
        //             disable: true
        //         },
        //         account: {
        //             required: false,
        //             disable: false
        //         }
        //     }
        // });
        // profile.city
        wotService.addAdditionalField({
            key: 'city',
            label: 'PLUGINS.ES.PROFILE.CITY',
            type: 'string',
            extra: {
                registration: {
                    required: false,
                    disable: true
                },
                account: {
                    required: false,
                    disable: false
                }
            }
        });
    }
}
