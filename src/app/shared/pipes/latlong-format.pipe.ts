import { Pipe, Injectable, PipeTransform } from '@angular/core';
import { DEFAULT_PLACEHOLDER_CHAR } from '../constants';

const DEFAULT_MAX_DECIMALS = 3;

declare class LatLongFormatOptions {
    pattern: 'DDMMSS' | 'DDMM' | 'DD'
    maxDecimals?: number
    placeholderChar?: string
}

function formatLatitude(value: number | null, opts?: LatLongFormatOptions): string {
    opts = opts || { pattern: 'DDMM' };
    if (value === undefined || value === null) return "";
    if (opts.pattern === 'DDMMSS') return formatToDDMMSS(value, true, opts.maxDecimals || DEFAULT_MAX_DECIMALS, opts.placeholderChar);
    if (opts.pattern == 'DDMM') return formatToDDMM(value, true, opts.maxDecimals || DEFAULT_MAX_DECIMALS, opts.placeholderChar);
    return roundFloat(value, opts.maxDecimals || DEFAULT_MAX_DECIMALS).toString();
}

function formatLongitude(value: number | null, opts?: LatLongFormatOptions): string {
    opts = opts || { pattern: 'DDMM' };
    if (value === undefined || value === null) return "";
    if (opts.pattern === 'DDMMSS') return formatToDDMMSS(value, false, opts.maxDecimals || DEFAULT_MAX_DECIMALS, opts.placeholderChar);
    if (opts.pattern === 'DDMM') return formatToDDMM(value, false, opts.maxDecimals || DEFAULT_MAX_DECIMALS, opts.placeholderChar);
    return roundFloat(value, opts.maxDecimals || DEFAULT_MAX_DECIMALS).toString();
}

function formatToDDMMSS(value: number, isLatitude: boolean, maxDecimals: number, placeholderChar?: string): string {
    const negative = value < 0;
    if (negative) value *= -1;

    let degrees: number | string = Math.trunc(value);
    let minutes: number | string = Math.trunc((value - degrees) * 60);
    let seconds = roundFloat(((value - degrees) * 60 - minutes) * 60, maxDecimals);
    if (seconds >= 60) {
        seconds -= 60;
        minutes += 1;
    }
    const direction = isLatitude ? (negative ? 'S' : 'N') : (negative ? 'W' : 'E');

    // Force spacer
    if (placeholderChar) {
        if (degrees < 10) {
            degrees = placeholderChar + degrees;
        }
        if (minutes < 10) {
            minutes = placeholderChar + minutes;
        }
        else {
            minutes = minutes.toString(); // convert to string (need by  the while)
        }
        if (maxDecimals > 0) {
            // Add decimal separator
            if (minutes.length === 2) {
                minutes += '.';
            }
            // Add trailing placeholder chars
            while ((minutes.length < maxDecimals + 3)) {
                minutes += placeholderChar;
            }
        }
    }

    const output = degrees + '° ' + minutes + '\' ' + seconds + '" ' + direction;
    //console.debug("formatToDDMMSS: " + value + " -> " + output);
    return output;
}

function formatToDDMM(value: number, isLatitude: boolean, maxDecimals: number, placeholderChar?: string): string {
    const negative = value < 0;
    if (negative) value *= -1;

    let degrees: number | string = Math.trunc(value);
    let minutes: number | string = roundFloat((value - degrees) * 60, maxDecimals);
    if (minutes >= 60) {
        minutes -= 60;
        degrees += 1;
    }
    const direction = isLatitude ? (negative ? 'S' : 'N') : (negative ? 'W' : 'E');

    // Add placeholderChar
    if (placeholderChar) {
        if (degrees < 10) {
            degrees = placeholderChar + degrees;
        }
        if (minutes < 10) {
            minutes = placeholderChar + minutes;
        }
        else {
            // convert to string (need by  the while)
            minutes = minutes.toString();
        }
        if (maxDecimals > 0) {
            // Add decimal separator
            if (minutes.length === 2) {
                minutes += '.';
            }
            // Add trailing placeholder chars
            while ((minutes.length < maxDecimals + 3)) {
                minutes += placeholderChar;
            }
        }
    }

    const output = degrees + '° ' + minutes + '\' ' + direction;
    //console.debug("formatToDDMM: " + (negative ? '-' : '') + value + " -> " + output);
    return output;
}

// 36°57'9" N  = 36.9525000
// 10°4'21" W = -10.0725000
function parseLatitudeOrLongitude(input: string, pattern: string, maxDecimals?: number, placeholderChar?: string): number | null {
    // Remove all placeholder (= trim on each parts)
    const inputFix = input.trim().replace(new RegExp("^[\s]+|[" + (placeholderChar || DEFAULT_PLACEHOLDER_CHAR) + ']+|[\s]+$', "g"), '');

    const parts = inputFix.split(/[^\d\w-.,]+/);
    const degrees = parseFloat(parts[0].replace(/,/g, '.'));
    if (isNaN(degrees)) {
        console.debug("parseLatitudeOrLongitude " + input + " -> Invalid degress (NaN). parts was:", parts);
        return NaN;
    }
    const minutes = (pattern === 'DDMMSS' || pattern === 'DDMM') && parts[1] && parseFloat(parts[1].replace(/,/g, '.')) || 0;
    const seconds = (pattern === 'DDMMSS') && parts[2] && parseFloat(parts[2].replace(/,/g, '.')) || 0;
    const direction = ((pattern === 'DDMMSS') && parts[3]) || ((pattern === 'DDMM') && parts[2]) || undefined;

    var dd = degrees + minutes / 60 + seconds / (60 * 60);

    if (direction && (direction === "s" || direction === "S" || direction === "w" || direction === "W")) {
        dd = dd * -1;
    }
    dd = roundFloat(dd, maxDecimals);
    //console.debug("parseLatitudeOrLongitude " + input + " -> " + dd);
    return dd;
}

function roundFloat(input: number, maxDecimals: number): number {
    if (maxDecimals > 0) {
        const powDecimal = Math.pow(10, maxDecimals);
        return Math.trunc(input * powDecimal + 0.5) / powDecimal;
    }
    return input;
}

function truncFloat(input: number, maxDecimals: number): number {
    if (maxDecimals > 0) {
        const powDecimal = Math.pow(10, maxDecimals);
        return Math.trunc(input * powDecimal) / powDecimal;
    }
    return input;
}

export { DEFAULT_PLACEHOLDER_CHAR, DEFAULT_MAX_DECIMALS, parseLatitudeOrLongitude, formatLatitude, formatLongitude };

@Pipe({
    name: 'latLongFormat'
})
@Injectable()
export class LatLongFormatPipe implements PipeTransform {

    transform(value: number, args?: any): string | Promise<string> {
        args = args || {};
        return ((!args.type || args.type !== 'latitude') ? formatLongitude : formatLatitude)
            (value, { pattern: args.pattern, maxDecimals: args.maxDecimals, placeholderChar: args.placeholderChar });
    }


}
