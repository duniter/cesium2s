import {Injectable} from "@angular/core";
import {Observable} from 'rxjs';
import {Person} from './model';
import {map} from "rxjs/operators";
import {LoadResult, TableDataService} from "../../shared/services/data-service.class";
import {DuniterService} from "../../core/services/duniter/duniter.service";
import {Identity} from "../../core/services/duniter/duniter.model";


export class WotSearchFilter {
  search?: string;
}

@Injectable()
export class WotService implements TableDataService<Identity, WotSearchFilter> {

  constructor(
    protected duniter: DuniterService
  ) {
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

    return this.duniter.pendingIdentities(filter && filter.search)
      .pipe(
        map(res => {
          return {
            data: res,
            total: res.length
          };
        }
      ));
  }

}
