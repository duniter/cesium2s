import {Injectable} from "@angular/core";
import gql from "graphql-tag";
import {GraphqlService} from "../../network/graphql.service";
import {IDuniterService} from "../duniter.service";
import {GvaPendingIdentity, GvaSource} from "./gva.model";
import {GvaErrorCodes} from "./gva.errors";
import {Observable} from "rxjs";
import {BlockchainParameters, NodeSummary, PendingIdentity, Source} from "../duniter.model";
import {map} from "rxjs/operators";
import {LoadResult, WatchFetchOptions} from "../../../../shared/shared.module";
import {sliceResult} from "../../../../shared/services/data-service.class";
import {Peer} from "../../network/network.model";
import {NetworkService} from "../../network/network.service";


/* ------------------------------------
 * GraphQL fragments
 * ------------------------------------*/
export const fragments = {
  source: gql`fragment SourceFragment on Source {
    type
    noffset
    identifier
    amount
    base
    conditions
    consumed
  }
  `,
  pendingIdentity: gql`fragment PendingIdentityFragment on PendingIdentity {
    revoked
    buid
    member
    kick
    leaving
    wasMember
    pubkey
    uid
    sig
    revocation_sig
    hash
    written
    revoked_on
    expires_on
  }
  `
};

/* ------------------------------------
 * GraphQL queries
 * ------------------------------------*/

export const Queries = {
  // Get node currency
  currency: gql`query Currency{
    currency
  }`,
  // Get node summary
  nodeSummary: gql`query NodeSummary{
    nodeSummary {
      duniter {
        software
        version
        forkWindowSize
      } 
    }
  }
  `,
  // Get parameters
  blockchainParameters: gql`query BlockchainParameters{
    blockchainParameters {
      currency c dt ud0 sigPeriod sigReplay sigStock sigWindow sigValidity sigQty
      idtyWindow msWindow msPeriod xpercent msValidity stepMax medianTimeBlocks
      avgGenTime dtDiffEval percentRot udTime0 udReevalTime0 dtReeval
    }
  }`,
  // Check uid query
  isUidExists: gql`
    query IsUidExists($uid: String){
      member(uid: $uid){
        pub
        member
        wasMember
      }
    }
  `,

  // Get sources by pubkey
  sourcesByPubkey: gql`
    query SourcesByPubkey($pubkey: String){
      sourcesOfPubkey(pub: $pubkey){
        ...SourceFragment
        __typename
      }
    }
    ${fragments.source}
  `,

  // Get pending identities
  pendingIdentities: gql`
    query PendingIdentities($search: String){
      pendingIdentities(search: $search){
        uid
        pubkey
      }
    }`
};


@Injectable({providedIn: 'root'})
export class GvaService implements IDuniterService {

  private readonly _debug: boolean;

  protected _lastVariables: {[key: string]: any} = {};

  constructor(
    protected graphql: GraphqlService
  ) {
    this._debug = true; //TODO !environment.production;
  }

  currency(): Observable<string> {
      return this.graphql.watchQuery<{currency: string}>({
          query: Queries.currency,
          fetchPolicy: "cache-first"
      }).pipe(map(res => res.currency));
  }

  async nodeSummary(peer?: Peer): Promise<NodeSummary> {
    const res = await this.graphql.peerQuery<{nodeSummary: NodeSummary}>(peer,
      {
        query: Queries.nodeSummary
      });
    return res && res.nodeSummary;
  }

  blockchainParameters(): Observable<BlockchainParameters> {
        return this.graphql.watchQuery<{blockchainParameters: BlockchainParameters}>({
            query: Queries.currency,
            fetchPolicy: "cache-first"
        }).pipe(map(res => res.blockchainParameters));
  }

  /**
   * Check if uid is exists in network.
   * @param uid
   */
  async isUidExists(uid: string): Promise<boolean> {

    if (this._debug) console.debug(`[gva] Checking if ${uid} exists...`);

    let data: { member: any };
    try {
      data = await this.graphql.query<{ member: any }>({
        query: Queries.isUidExists,
        variables: {
          uid: uid
        }
      });
    }
    catch (err) {
      if ((err && err.code || err.message || err) === GvaErrorCodes.IDENTITY_UID_NOT_FOUND) {
        data = undefined;
      }
      else {
        throw err;
      }
    }

    const exists = data && data.member && (data.member.member || data.member.wasMember) || false;
    if (this._debug) console.debug(`[gva] Uid {${uid}} exists? ${exists}`);

    return exists;
  }

  sourcesOfPubkey(pubkey: string, options?: WatchFetchOptions): Observable<LoadResult<Source>> {

    if (this._debug) console.debug(`[gva] Load sources of  {${pubkey.substring(0, 8)}...`);

    return this.graphql.watchQuery<{ sourcesOfPubkey: Source[] }>({
        query: Queries.sourcesByPubkey,
        variables: {
          pubkey: pubkey
        },
        fetchPolicy: options && options.fetchPolicy || undefined
      })
        .pipe(
            map(res => {
                const loadRes = sliceResult(res && res.sourcesOfPubkey || [], options);
                return {
                  total: loadRes.total,
                  data: loadRes.data.map(GvaSource.fromObject)
                };
            })
        );
  }

  pendingIdentities(search: string, options?: WatchFetchOptions): Observable<LoadResult<PendingIdentity>> {
    if (this._debug) console.debug(`[gva] Loading pending identities (search={${search}})...`);

    return this.graphql.watchQuery<{ pendingIdentities: PendingIdentity[] }>({
        query: Queries.pendingIdentities,
        variables: {
          search: search
        },
        fetchPolicy: options && options.fetchPolicy || undefined
      })
        .pipe(
            map(res => {
                const loadRes = sliceResult(res && res.pendingIdentities || [], options);
                return {
                    total: loadRes.total,
                    data: loadRes.data.map(GvaPendingIdentity.fromObject)
                };
            })
        );
  }

  /* -- Protected methods -- */

}
