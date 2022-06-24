import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { removeDiacritics, toBoolean } from '../functions';

@Pipe({
    name: 'highlight'
})
@Injectable({providedIn: 'root'})
export class HighlightPipe implements PipeTransform {

      // Replace search text by bold representation
    transform(value: any, args?: string | { search: string; withAccent?: boolean } ): string {
      if (typeof value !== 'string' || !args) return value;
      const searchText = (typeof args === 'string' ? args : args.search);
      const withAccent = (typeof args !== 'string') ? toBoolean(args?.withAccent, false) : false;
      if (typeof searchText !== 'string') return value;
      const searchRegexp = searchText
        .replace(/[.]/g, '[.]')
        .replace(/[*]+/g, '.*');
      if (searchRegexp === '.*') return value; // skip if can match everything

      if (withAccent) {
        // Remove all accent characters to allow versatile comparison
        const cleanedSearchText = removeDiacritics(searchRegexp).toUpperCase();
        const index = removeDiacritics(value.toUpperCase()).indexOf(cleanedSearchText);
        if (index !== -1) {
          return value.substring(0, index - 1) +
            '<b>' + value.substring(index, cleanedSearchText.length) + '</b>' +
            value.substring(index + cleanedSearchText.length);
        }
        return value;
      } else {
        // Default behaviour
        const regexp = new RegExp('[ ]?' + searchRegexp, 'gi');
        return ('' + value).replace(regexp, '<b>$&</b>');
      }
    }
}
