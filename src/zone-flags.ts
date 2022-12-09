/**
 * Prevents Angular change detection from
 * running with certain Web Component callbacks
 */
import {zoneConfig} from "@rx-angular/cdk/zone-configurations";

zoneConfig.global.disable.customElements();
zoneConfig.global.disable.requestAnimationFrame();
//zoneConfig.global.disable.timers();

