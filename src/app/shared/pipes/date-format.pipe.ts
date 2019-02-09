import { Pipe, Injectable, PipeTransform } from '@angular/core';
import { Moment } from "moment/moment";
import { DateAdapter } from "@angular/material";
import { DATE_ISO_PATTERN } from '../constants';

@Pipe({
    name: 'dateFormat'
})
@Injectable()
export class DateFormatPipe implements PipeTransform {

    constructor(
        private dateAdapter: DateAdapter<Moment>) {
    }

    transform(value: string | Moment, args?: any): string | Promise<string> {
        args = args || {};
        args.pattern = args.pattern || (args.time ? 'L LT' : 'L');
        let date = this.dateAdapter.parse(value, DATE_ISO_PATTERN);
        return date ? date.format(args.pattern) : '';
    }
}