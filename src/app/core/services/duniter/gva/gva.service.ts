import {Injectable} from "@angular/core";
import gql from "graphql-tag";
import {GraphqlService} from "../../network/graphql.service";
import {FetchOptions, IPeerApiService, WatchFetchOptions} from "../duniter.service";
import {GvaPendingIdentity, GvaSource} from "./gva.model";
import {GvaErrorCodes} from "./gva.errors";
import {Observable} from "rxjs";
import {Identity, PendingIdentity, Source} from "../duniter.model";
import {map} from "rxjs/operators";


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
export class GvaService implements IPeerApiService {

  private readonly _debug: boolean;

  protected _lastVariables: {[key: string]: any} = {};

  constructor(
    protected graphql: GraphqlService
  ) {
    this._debug = true; //TODO !environment.production;
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

  sourcesOfPubkey(pubkey: string, options?: WatchFetchOptions): Observable<GvaSource[]> {

    if (this._debug) console.debug(`[gva] Load sources of  {${pubkey.substring(0, 8)}...`);

    return this.graphql.watchQuery<{ sourcesOfPubkey: GvaSource[] }>({
        query: Queries.sourcesByPubkey,
        variables: {
          pubkey: pubkey
        },
        fetchPolicy: options && options.fetchPolicy || undefined
      })
        .pipe(
            map(res => {
              return res && (res.sourcesOfPubkey || []).map(GvaSource.fromObject);
            })
        );
  }

  pendingIdentities(search: string, options?: WatchFetchOptions): Observable<PendingIdentity[]> {
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
            return res && (res.pendingIdentities || []).map(GvaPendingIdentity.fromObject);
          })
        );
  }

  /* -- Protected methods -- */

}
