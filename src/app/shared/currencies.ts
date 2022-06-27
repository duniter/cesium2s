import {isNilOrBlank} from "@app/shared/functions";

export function abbreviate(currency: string): string {
  if (isNilOrBlank(currency)) return '';

  if (currency.length > 3) {
    const sepChars = ['-', '_', ' '];
    let unit = '';
    for (let i = 0; i < currency.length; i++) {
      var c = currency[i];
      if (i === 0) {
        unit = (c === 'g' || c === 'G') ? 'Ğ' : c ;
      }
      else if (i > 0 && sepChars.indexOf(currency[i-1]) != -1) {
        unit += c;
      }
    }
    return unit.toUpperCase();
  }

  // Less than 3 characters
  currency = currency.toUpperCase();
  if (currency.charAt(0) === 'G') {
    currency = 'Ğ' + (currency.length > 1 ? currency.substring(1) : '');
  }

  return currency;
}
