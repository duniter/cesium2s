import { Pipe, Injectable, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlight'
})
@Injectable()
export class HighlightPipe implements PipeTransform {

    transform(value: string | any, args?: any): string | Promise<string> {
        args = args || {};
        if (value && args && args.search && typeof args.search === 'string') {
            const searchRegexp = args.search.replace(/[*]+/g, '.*');
            if (searchRegexp === '.*') return value; // skip hight light if '*'
            const regexp = new RegExp(searchRegexp, 'gi');
            return value.replace(regexp, '<b>$&</b>');
        }
        return value;
    }
}