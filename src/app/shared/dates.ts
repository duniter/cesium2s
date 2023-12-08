import * as momentImported from 'moment';
import { Duration, isMoment, Moment, unitOfTime } from 'moment';

const moment = momentImported;

export const DATE_ISO_PATTERN = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
export const DATE_UNIX_TIMESTAMP = 'X';
export const DATE_UNIX_MS_TIMESTAMP = 'x';

export class DateUtils {
  static toDateISOString = toDateISOString;
  static fromDateISOString = fromDateISOString;
  static toDuration = toDuration;

  static min(date1: Moment, date2: Moment): Moment {
    return date1 && (!date2 || date1.isSameOrBefore(date2)) ? date1 : date2;
  }

  static max(date1: Moment, date2: Moment): Moment {
    return date1 && (!date2 || date1.isSameOrAfter(date2)) ? date1 : date2;
  }

  static equals(date1: Moment | string, date2: Moment | string): boolean {
    return DateUtils.isSame(date1, date2);
  }

  static isSame(date1: Moment | string, date2: Moment | string, granularity?: unitOfTime.StartOf): boolean {
    const d1 = fromDateISOString(date1);
    const d2 = fromDateISOString(date2);
    return (!d1 && !d2) || d1.isSame(d2, granularity);
  }

  /**
   * Create a copy of a date, without time fields (always return a new Moment object, or undefined).
   * Same implementation as the Java class Dates.resetTime() (see any SUMARiS like Pod)
   * @param value
   * @param timezone a timezone (see https://momentjs.com/timezone/)
   * @param keepLocalTime if true, only the timezone (and offset) is updated, keeping the local time same. Consequently, it will now point to a different point in time if the offset has changed.
   */
  static resetTime(value: Moment | string, timezone?: string, keepLocalTime?: boolean): Moment | undefined {
    if (!value) return undefined;
    const date = fromDateISOString(value);
    // No timezone
    if (!timezone) {
      return date.clone().startOf('day');
    }
    // Use timezone
    return date
      .clone() // clone the original date
      .tz(timezone, keepLocalTime)
      .startOf('day');
  }

  /**
   * Test if a date is on the given day of week
   * @param date
   * @param weekday
   * @param timezone
   */
  static isAtDay(date: string | Moment, weekday: number, timezone?: string): boolean {
    date = date && fromDateISOString(date);
    if (!date) return null;
    if (timezone) date = date.clone().tz(timezone).startOf('day');
    return date.day() === weekday;
  }
}

export function toDateISOString(value: any): string | undefined {
  if (!value) return undefined;

  // Already a valid ISO date time string (without timezone): use it
  if (typeof value === 'string' && value.indexOf('+') === -1 && value.lastIndexOf('Z') === value.length - 1) {
    return value;
  }
  // Make sure to have a Moment object
  value = fromDateISOString(value);
  return (value && value.toISOString()) || undefined;
}

export function fromDateISOString(value: any): Moment | undefined {
  // Already a moment object: use it
  if (!value || isMoment(value)) return value;

  // Parse the input value, as a ISO date time
  const date: Moment = moment(value, DATE_ISO_PATTERN);
  if (date.isValid()) return date;

  // Not valid: trying to convert from unix timestamp
  if (typeof value === 'string') {
    console.warn('Wrong date format - Trying to convert from local time: ' + value);
    if (value.length === 10) {
      return moment(value, DATE_UNIX_TIMESTAMP);
    } else if (value.length === 13) {
      return moment(value, DATE_UNIX_MS_TIMESTAMP);
    }
  }

  console.warn('Unable to parse date: ' + value);
  return undefined;
}

export function fromUnixTimestamp(timeInSec: number) {
  return moment(timeInSec, DATE_UNIX_TIMESTAMP);
}
export function fromUnixMsTimestamp(timeInMs: number) {
  return moment(timeInMs, DATE_UNIX_MS_TIMESTAMP);
}

export function fromDateString(value: string, pattern: any): Moment {
  if (!value) return undefined;
  return isMoment(value) ? value : moment(value, pattern || DATE_ISO_PATTERN);
}

export function toDuration(value: number, unit?: moment.unitOfTime.DurationConstructor): Duration {
  if (!value) return undefined;

  const duration = moment.duration(value, unit);

  // fix 990+ ms
  if (duration.milliseconds() >= 990) {
    duration.add(1000 - duration.milliseconds(), 'ms');
  }
  // fix 59 s
  if (duration.seconds() >= 59) {
    duration.add(60 - duration.seconds(), 's');
  }

  return duration;
}
