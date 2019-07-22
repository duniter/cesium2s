import {Injectable} from "@angular/core";
import gql from "graphql-tag";
import {Observable} from 'rxjs';
import {Person} from './model';
import {BaseDataService} from "../../core/services/base.data-service.class";
import {ErrorCodes} from "./errors";
import {map} from "rxjs/operators";
import {Entity} from "src/app/core/services/model";
import {LoadResult, TableDataService} from "../../shared/services/data-service.class";
import {GraphqlService} from "../../core/services/graphql.service";


// Load persons query
const WotSearchQuery = gql`
  query WotSearch($pendingIdentities: Int, $size: Int, $sortBy: String, $sortDirection: String, $filter: PersonFilterVOInput){
    pendingIdentities(search: $search){
      uid
      pub

    }
  }
`;

export class WotSearchFilter {
  search?: string;
}
export class Identity extends Entity<Identity> {
  uid: string;
  pub: string;

  public static fromObject(source: any): Identity {
    const entity = new Identity();
    Object.assign(entity, source);
    return entity;
  }

  public fromObject(source: any): Identity {
    super.fromObject(source);

    this.uid = source.uid;
    this.pub = source.pub;

    return this;
  }

  public clone(): Identity {
    const target = new Identity();
    Object.assign(target, this);
    return target;
  }
} 

@Injectable()
export class WotService extends BaseDataService implements TableDataService<Identity, WotSearchFilter> {

  constructor(
    protected graphql: GraphqlService
  ) {
    super(graphql);
  }

  /**
   * Load identities
   * @param offset 
   * @param size 
   * @param sortBy 
   * @param sortDirection 
   * @param filter 
   * @param options 
   */
  public watchAll(
    offset: number,
    size: number,
    sortBy?: string,
    sortDirection?: string,
    filter?: WotSearchFilter,
    options?: any
  ): Observable<LoadResult<Identity>> {

    const variables = {
      search: filter && filter.search
    };

    this._lastVariables.search = variables;

    const now = Date.now();
    console.debug("[wot-service] Loading persons... using filter: ", variables);
    return this.graphql.watchQuery<{ pendingIdentities: Identity[] }>({
      query: WotSearchQuery,
      variables: variables,
      error: { code: ErrorCodes.WOT_SEARCH_ERROR, message: "ERROR.WOT_SEARCH_ERROR" },
      fetchPolicy: 'network-only'
    })
      .pipe(
        map(data => {
          const res = (data && data.pendingIdentities || []).map(Identity.fromObject);
          console.debug(`[wot-service] Loaded identities in ${Date.now() - now}:`, res);
          return {
            data: res,
            total: res.length
          };
        }
      ));
  }

  /* -- protected methods -- */

  protected asObject(source: Person): any {
    if (!source) return undefined;

    const target = source.asObject();

    return target;
  }

  protected copyIdAndUpdateDate(source: Person | undefined, target: Person) {
    if (!source) return;

    // Update (id and updateDate)
    target.id = source.id || target.id;
    target.updateDate = source.updateDate || target.updateDate;
    target.creationDate = source.creationDate || target.creationDate;
  }
}
