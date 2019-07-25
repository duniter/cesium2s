import {Injectable} from "@angular/core";
import {WotSearchEvent, WotSearchFilter, WotService} from "../../../wot/services/wot.service";
import {Subscription} from "rxjs";
import {EsNetworkService} from "./es-network.service";
import {isNotNilOrBlank, toBoolean} from "../../../shared/functions";
import {EsSearchHit, EsSearchResult} from "./es.model";
import {LocalSettingsService} from "../../../core/services/local-settings.service";
import {EsOptions} from "../es.constants";
import {NetworkService} from "../../../core/services/network/network.service";
import {parseImageFromHit, parseTagsFromText} from "./es.utils";
import {Pageable, SortDirection, WatchFetchOptions} from "../../../shared/services/data-service.class";
import {FeatureCollection} from "geojson";


@Injectable({providedIn: "root"})
export class EsProfileService  {

  private _debug = false;
  private _subscriptions: Subscription[] = [];
  private _started = false;
  private _enableMixedSearch = false;

  constructor(
    protected esNetwork: EsNetworkService,
    protected network: NetworkService,
    protected wot: WotService,
    protected settings: LocalSettingsService
  ) {

    // Wait ES network to start the service
    esNetwork.onStart.subscribe(() => this.restart());

    settings.onChange.subscribe((_) => {
      this._enableMixedSearch = settings.getPropertyAsBoolean(EsOptions.ENABLE_WOT_MIXED_SEARCH);
      if (this._enableMixedSearch) console.debug("[es-profile] Mixed search enable");

    });
  }

  async getProfilesAsGeoJson(filter: WotSearchFilter, options?: Pageable): Promise<FeatureCollection> {
    // TODO
    return {
      type: "FeatureCollection",
      features: [{
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [10, 10]
        },
        properties: {
          'title': "test"
        }
      }]
    };
  }

  /* -- protected methods  -- */

  async onWotSearch(text: string, datas: any[], opts?: {
    pubkeyAttributeName?: string;
    allowMixedSearch?: boolean;
  }) {
    if (!text && (!datas || !datas.length)) {
      return;
    }

    const avatarFieldName = 'avatar';
    const pubkeyAttributeName = opts && opts.pubkeyAttributeName || 'pubkey';
    text = text ? text.toLowerCase().trim() : text;

    let dataByPubkey;
    let tags = text ? parseTagsFromText(text) : undefined;
    const request: any = {
      query: {},
      highlight: {fields : {title : {}, tags: {}}},
      from: 0,
      size: 100,
      _source: ["title", avatarFieldName + "._content_type", "description", "city"]
    };

    const useMixedSearch = isNotNilOrBlank(text) && toBoolean(opts && opts.allowMixedSearch, this._enableMixedSearch);
    if (useMixedSearch) {
      // Add field from pages and groups
      request._source = request._source.concat(["description", "city", "creationTime", "membersCount", "type"]);
    }

    if (datas.length > 0) {
      // collect pubkeys and fill values map
      dataByPubkey = {};
      datas.forEach((data) => {
        const pubkey = data[pubkeyAttributeName];
        if (pubkey) {
          let values = dataByPubkey[pubkey];
          if (!values) {
            values = [data];
            dataByPubkey[pubkey] = values;
          }
          else {
            values.push(data);
          }
        }
      });
      const pubkeys = Object.getOwnPropertyNames(dataByPubkey);
      // Make sure all results will be return
      request.size = (pubkeys.length <= request.size) ? request.size : pubkeys.length;
      if (!text) {
        delete request.highlight; // highlight not need
        request.query.constant_score = {
          filter: {
            terms : {_id : pubkeys}
          }
        };
      }
      else {
        request.query.bool = {
          should: [
            {terms : {"_id^4" : pubkeys}},
            {match: {title: {query: text, boost: 2}}},
            {prefix: {title: text}}
          ]
        };

        if (tags) {
          request.query.bool.should.push({terms: {tags: tags}});
        }
      }
    }
    else if (text){
      request.query.bool = {
        should: [
          {match: {title: {
                query: text,
                boost: 2
              }}},
          {prefix: {title: text}}
        ]
      };
      if (tags) {
        request.query.bool.should.push({terms: {tags: tags}});
      }
    }

    if (text && useMixedSearch) {
      request.indices_boost = {
        "user" : 100,
        "page" : 1,
        "group" : 0.01
      };
    }

    const uri =  useMixedSearch ? '/user,page,group/profile,record/_search' : '/user/profile/_search';
    let res: EsSearchResult;
    try {
      res = await this.esNetwork.post<EsSearchResult>(uri, request);
    }
    catch (err) {
      if (err && err.ucode && err.ucode === 404) {
        return datas;
      }
      throw err;
    }
    if (res.hits.total > 0) {
      const indices = {};
      let values;

      // For each hit found
      res.hits.hits.forEach(hit => {
        // User profile
        if (hit._index === "user") {
          values = dataByPubkey && dataByPubkey[hit._id];
          if (!values) {
            const value = {};
            value[pubkeyAttributeName] = hit._id;
            values = [value];
            datas.push(value);
          }
        }

        // Page or group
        else {
          if (!indices[hit._index]) {
            indices[hit._index] = true;
            // add a separator
            datas.push({
              id: 'divider-' + hit._index,
              divider: true,
              index: hit._index
            });
          }
          const item = {
            id: hit._index + '-' + hit._id, // unique id in list
            index: hit._index,
            type: hit._source.type,
            //templateUrl: 'plugins/es/templates/wot/lookup_item_{0}.html'.format(hit._index),
            //state: 'app.view_' + hit._index,
            //stateParams: {id: hit._id, title: hit._source.title},
            creationTime: hit._source.creationTime,
            //memberCount: hit._source.memberCount, // For groups
          };
          values = [item];
          datas.push(item);
        }

        const avatar = parseImageFromHit(hit, this.esNetwork.peerUrl, avatarFieldName);
        values.forEach(data => {
          data.avatar = avatar;
          this.fillSearchResultFromHit(data, hit);
        });
      });

      // Add divider (as first element)
      if (Object.getOwnPropertyNames(indices).length) {
        datas.splice(0,0, {
          id: 'divider-identities',
          divider: true,
          index: 'profile'
        });
      }
    }
  }

  protected fillSearchResultFromHit(data: any, hit: EsSearchHit, peerUrl?: string, avatarFieldName?: string) {
    data.avatar = data.avatar || (peerUrl && parseImageFromHit(hit, peerUrl, avatarFieldName || 'avatar'));
    // name (basic or highlighted)
    data.name = hit._source.title;
    // Avoid too long name (workaround for #308)
    if (data.name && data.name.length > 30) {
      data.name = data.name.substr(0, 27) + '...';
    }
    data.description = hit._source.description || data.description;
    data.city = hit._source.city || data.city;

    if (hit.highlight) {
      if (hit.highlight.title) {
        data.name = hit.highlight.title[0];
      }
      if (hit.highlight.tags) {
        data.tags = hit.highlight.tags.map(tag =>
          tag.replace('<em>', '')
              .replace('</em>', '')
        );
      }
    }
  }

  protected async start() {

    await this.esNetwork.ready();

    if (this._debug) console.debug(`[es-profile] Starting service...`);

    // Register to wot extension
    this._subscriptions.push(
      this.wot.onWotSearch.subscribe(async (event: WotSearchEvent) => {
        await this.onWotSearch(event.searchText, event.data.data, {
          pubkeyAttributeName: event.pubkeyAttributeName
        });
        event.done();
      }));

    this._started = true;
  }

  protected stop() {
    this._subscriptions.forEach(s => s.unsubscribe());
    this._subscriptions = [];
    this._started = false;
  }

  protected restart() {
    if (this._started) this.stop();
    this.start();
  }
}
