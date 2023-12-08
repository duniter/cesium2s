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

zoneConfig.events.disable.UNPATCHED_EVENTS([
  'mousemove',
  'mouseover',
  // TODO: check if can disabled this events:
  'scroll'
]);

// FIXME disable zone in .then() functions
//zoneConfig.global.disable.ZoneAwarePromise();

// FIXME: need to patch progression toolbar, to call markForCheck()
// Otherwise, the trip editor still show the loading bar
//zoneConfig.global.disable.timers();
