import { Pipe, Injectable, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlight'
})
@Injectable()
export class HighlightPipe implements PipeTransform {

    transform(value: string | any, args?: any): string | Promise<string> {
        if (value && args && args.search && typeof args.search === 'string') {
            const searchRegexp = args.search.replace(/[.]/g, '[.]').replace(/[*]+/g, '.*');
            if (searchRegexp === '.*') return value; // skip if can match everything
            const regexp = new RegExp('[ ]?' + searchRegexp, 'gi');
            return value.replace(regexp, '<b>$&</b>');
        }
        return value;
    }
}
