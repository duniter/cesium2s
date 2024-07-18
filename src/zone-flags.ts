/**
 * Prevents Angular change detection from
 * running with certain Web Component callbacks
 */
// eslint-disable-next-line no-underscore-dangle
import { zoneConfig } from '@rx-angular/cdk/zone-configurations';

zoneConfig.global.disable.customElements();
zoneConfig.global.disable.requestAnimationFrame();
zoneConfig.global.disable.geolocation();
zoneConfig.global.disable.canvas();
zoneConfig.global.disable.XHR();
zoneConfig.global.disable.ZoneAwarePromise();

zoneConfig.events.disable.UNPATCHED_EVENTS([
  //'mousemove',
  //'mouseover',
  //'scroll',
]);

// FIXME: cannot disable timers for now (execution error at startup)
//zoneConfig.global.disable.timers();
