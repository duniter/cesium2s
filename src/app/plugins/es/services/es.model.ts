import {NodeSummary} from "../../../core/services/duniter/duniter.model";

export interface EsNodeSummary {
  duniter: NodeSummary;
}

export interface EsSocial {
  type: string;
  url: string;
}
export interface EsGeoPoint {
  lat: number;
  lon: number;
}
export interface EsAttachment {
  _content_type: string;
  _content?: string;
  _title?: string;
  _name?: string;
}

export interface EsImageAttachment extends EsAttachment{
  src: string;
  title?: string;
  name?: string;
}
export interface EsUserProfile {
  version: number;
  issuer: string;
  time: number;
  hash: string;
  signature: string;

  title: string;
  description?: string;
  avatar: EsAttachment;

  address?: string;
  city?: string;
  geoPoint?: EsGeoPoint;
  socials?: EsSocial[];

  tags?: string[];
}

export interface EsHit<T = any> {
  _index: string;
  _type: string;
  _id: string;
  _source: T;
}
export interface EsIdHit<T = any> extends EsHit<T> {
  _version: number;
  found: boolean;
}
export interface EsSearchHit<T = any> extends EsHit<T> {
  _score?: number;
  highlight: {
    [key: string]: string[];
  };
}
export interface EsSearchResult<T = any> {
  took: number;
  time_out: boolean;
  _shards: {
    total: number;
    successful: number;
    failed: number;
  };
  hits: {
    total: number;
    hits: EsSearchHit<T>[]
  };
}

