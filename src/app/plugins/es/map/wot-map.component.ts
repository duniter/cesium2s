import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  NgZone,
  OnInit,
  ViewChild
} from "@angular/core";
import {EsProfileService} from "../services/es-profile.service";
import {BehaviorSubject, Subject} from "rxjs";
import {
  Color,
  ColorScale,
  ColorScaleLegendItem,
  DateFormatPipe,
  fadeInAnimation,
  fadeInOutAnimation,
  isNil,
  isNotNil
} from "../../../shared/shared.module";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateAdapter, MatExpansionPanel} from "@angular/material";
import * as L from 'leaflet';
import {LayerGroup} from 'leaflet';
import {Feature} from "geojson";
import {throttleTime} from "rxjs/operators";
import {WotSearchFilter} from "../../../wot/wot.module";
import {AccountService, AppForm, LocalSettingsService, PlatformService} from "../../../core/core.module";
import {Moment} from "moment";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-wot-map',
  templateUrl: './wot-map.component.html',
  styleUrls: ['./wot-map.component.scss'],
  animations: [fadeInAnimation, fadeInOutAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EsWotMap extends AppForm<WotSearchFilter> implements OnInit {

  loading = true;
  onRefresh = new EventEmitter();

  // -- Map Layers --
  osmBaseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '<a href=\'https://www.openstreetmap.org\'>Open Street Map</a>'
  });

  ready = false;
  options = {
    layers: [this.osmBaseLayer],
    zoom: 5,
    center: L.latLng(46.879966, -10)
  };
  layersControl = {
    baseLayers: {
      'Open Street Map': this.osmBaseLayer
    },
    overlays: {}
  };
  data = {
    total: 0,
    min: 0,
    max: 0
  };
  legendForm: FormGroup;
  showLegendForm = false;
  columnNames = {};
  showDetails = false;
  map: L.Map;

  $title = new BehaviorSubject<string>(undefined);
  $layers = new BehaviorSubject<L.GeoJSON<L.Polygon>[]>(null);
  $legendItems = new BehaviorSubject<ColorScaleLegendItem[] | undefined>([]);
  $onOverFeature = new Subject<Feature>();
  $selectedFeature = new BehaviorSubject<Feature | undefined>(undefined);

  $details = new Subject<{ title: string; properties: { name: string; value: string }[]; }>();
  $stats = new Subject<{ title: string; properties: { name: string; value: string }[] }>();

  @ViewChild(MatExpansionPanel) filterExpansionPanel: MatExpansionPanel;

  get hasData(): boolean {
    return this.ready && !this.loading && this.data && this.data.total > 0;
  }

  get legendStartColor(): string {
    return this.legendForm.get('startColor').value;
  }

  set legendStartColor(value: string) {
    this.legendForm.get('startColor')
      .patchValue(value, {emitEvent: false});
  }

  get legendEndColor(): string {
    return this.legendForm.get('endColor').value;
  }

  set legendEndColor(value: string) {
    this.legendForm.get('endColor')
      .patchValue(value, {emitEvent: false});
  }


  constructor(
      protected dateAdapter: DateAdapter<Moment>,
      protected formBuilder: FormBuilder,
      protected settings: LocalSettingsService,
      protected translate: TranslateService,
      protected platform: PlatformService,
      protected accountService: AccountService,
      protected esProfile: EsProfileService,
      protected zone: NgZone,
      protected cd: ChangeDetectorRef
  ) {
    super(dateAdapter,
        formBuilder.group({
          'search': [null]
        }),
        settings);

    this._enable = true; // enable the form

    // TODO: get Settings preference ?
    const legendStartColor = new Color([255, 255, 190], 1);
    const legendEndColor = new Color([150, 30, 30], 1);
    this.legendForm = formBuilder.group({
      count: [10, Validators.required],
      min: [0, Validators.required],
      max: [1000, Validators.required],
      startColor: [legendStartColor.rgba(), Validators.required],
      endColor: [legendEndColor.rgba(), Validators.required]
    });

    this.loading = false;

  }

  ngOnInit() {

    super.ngOnInit();

    this.platform.ready().then(() => {
      setTimeout(async () => {
        this.ready = true;
        if (!this.loading) return this.start();
      }, 500);
    });

    this.onRefresh
      .subscribe(() => {
        if (!this.ready || this.loading ) return; // avoid multiple load
        console.debug('[wot-map] Refreshing...');
        return this.load();
      });

    this.registerSubscription(
      this.$onOverFeature
        .pipe(
          throttleTime(200)
        )
        .subscribe((feature) => this.openFeatureDetails(feature)));
  }

  onMapReady(map: L.Map) {
    this.map = map;
    this.zone.run(() => {
      this.start.bind(this);
    });
  }

  protected async start() {
    if (!this.ready || this.loading) return; // skip

    await this.load();
  }

  protected async load() {
    if (!this.ready) return;

    this.loading = true;
    this.$details.next(); // hide details
    this.error = null;

    const filter = this.getFilterValue();
    this.disable();

    const now = Date.now();
    console.debug(`[wot-map] Loading layer`, filter);

    try {
      let hasMore = true;
      let offset = 0;
      const size = 1000;

      const layer = L.geoJSON(null, {
        onEachFeature: this.onEachFeature.bind(this)
      });
      let total = 0;
      let maxValue = 0;

      while (hasMore) {

        // Get geo json using slice
        const geoJson = await this.esProfile.getProfilesAsGeoJson(
            filter,
            {
              page: {offset, size, sortBy: 'time', sortDirection: 'asc'}
            });

        const hasData = isNotNil(geoJson) && geoJson.features && geoJson.features.length || false;

        if (hasData) {
          // Add data to layer
          layer.addData(geoJson);

          // Compute max value (need for legend)
          // maxValue = geoJson.features
          //   .map(feature => feature.properties[''] as number)
          //   .reduce((max, value) => Math.max(max, value), maxValue);

          offset += size;
          total += geoJson.features.length;
        }

        hasMore = hasData && geoJson.features.length >= size;
      }

      this.data.total = total;
      this.data.max = maxValue;

      if (total === 0) {
        console.debug(`[wot-map] No data found, in ${Date.now() - now}ms`);

        // Refresh layer
        this.$layers.next([]);
      } else {

        // Create scale color (max 10 grades
        this.legendForm.get('max').setValue(Math.max(10, Math.round(maxValue + 0.5)), {emitEvent: false});
        const scale = this.createLegendScale();
        layer.setStyle(this.getFeatureStyleFn(scale, null/*techStrata*/));

        const typeName = this.$title.getValue();

        // Remove old data layer
        Object.getOwnPropertyNames(this.layersControl.overlays)
          .forEach((layerName, index) => {
            const existingLayer = this.layersControl.overlays[layerName] as LayerGroup<any>;
            existingLayer.remove();
            delete this.layersControl.overlays[layerName];
          });

        // Add new layer to layers control
        this.layersControl.overlays[typeName] = layer;

        // Refresh layer
        this.$layers.next([layer]);

        console.debug(`[wot-map] ${total} geometries loaded in ${Date.now() - now}ms (${Math.floor(offset / size)} slices)`);

        // TODO fit to scale
        /*map.fitBounds(this.lalayersyer.getBounds(), {
          padding: point(24, 24),
          maxZoom: 12,
          animate: true
        });*/

      }

    } catch (err) {
      console.error(err);
      this.error = err && err.message || err;
    } finally {
      this.loading = false;
      this.enable();
    }

  }

  protected onEachFeature(feature: Feature, layer: L.Layer) {
    layer.on('mouseover', (_) => this.zone.run(() => this.$onOverFeature.next(feature)));
    layer.on('mouseout', (_) => this.zone.run(() => this.closeFeatureDetails(feature)));
  }

  protected openFeatureDetails(feature: Feature) {
    if (this.$selectedFeature.getValue() === feature) return; // skip if already selected
    const properties = Object.getOwnPropertyNames(feature.properties)
      .filter(key => key !== 'title')
      .map(key => {
        return {
          name: this.columnNames[key],
          value: feature.properties[key]
        };
      });
    const title = this.columnNames['name'] || this.columnNames['pubkey'] && this.columnNames['pubkey'].substring(0, 6);

    // Emit events
    this.$details.next({title, properties});
    this.$selectedFeature.next(feature);
  }

  closeFeatureDetails(feature: Feature, force?: boolean) {
    if (this.$selectedFeature.getValue() !== feature) return; // skip is not the selected feature

    // Close now, of forced (already wait 5s)
    if (force) {
      this.$selectedFeature.next(undefined);
      this.$details.next(); // Hide details
      return;
    }

    // Wait 5s before closing
    return setTimeout(() => this.closeFeatureDetails(feature, true), 4000);
  }


  openLegendForm(event: UIEvent) {
    this.showLegendForm = true;
  }

  cancelLegendForm(event: UIEvent) {
    this.showLegendForm = false;

    // Reset legend color
    //const color = this.legendForm.get('color').value;
    //this.legendStartColor = this.scale.endColor;
  }

  applyLegendForm(event: UIEvent) {
    this.showLegendForm = false;
    this.onRefresh.emit();
  }

  getI18nPropertyName(propertyName): string {
    return this.translate.instant('PLUGINS.ES.MAP.' + propertyName.toUpperCase());
  }

  /* -- protected methods -- */

  protected getFeatureStyleFn(scale: ColorScale, propertyName: string): L.StyleFunction<any> | null {
    if (isNil(propertyName)) return;

    return (feature) => {

      const value = feature.properties[propertyName];
      const color = scale.getValueColor(value);

      //console.debug(`${options.propertyName}=${value} | color=${color} | ${feature.properties['square']}`);

      return {
        fillColor: color,
        weight: 0,
        opacity: 0,
        color: color,
        fillOpacity: 1
      };
    };
  }

  protected createLegendScale(): ColorScale {
    const json = this.legendForm.value;
    const min = json.min || 0;
    const max = json.max;
    const startColor = Color.parseRgba(json.startColor);
    const mainColor = Color.parseRgba(json.endColor);
    const endColor = Color.parseRgba('rgb(0,0,0)');

    // Create scale color (max 10 grades
    const scaleCount = Math.max(2, Math.min(max, 10));
    const scale = ColorScale.custom(scaleCount, {
      min: min,
      max: max,
      opacity: mainColor.opacity,
      startColor: startColor.rgb,
      mainColor: mainColor.rgb,
      mainColorIndex: Math.trunc(scaleCount * 0.9),
      endColor: endColor.rgb
    });

    this.$legendItems.next(scale.legend.items);
    this.showLegendForm = false;
    return scale;
  }


  protected getFilterValue(): WotSearchFilter {
    return this.form.value;
  }

  protected markForCheck() {
    this.cd.markForCheck();
  }


}
