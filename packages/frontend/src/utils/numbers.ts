import {isNil} from 'lodash-es';
import numeral from 'numeral';

numeral.register('locale', 'custom', {
  delimiters: {
    thousands: ' ',
    decimal: '.'
  },
  abbreviations: {
    thousand: 'K',
    million: 'M',
    billion: 'B',
    trillion: 'T'
  },
  ordinal: function(number) {
    return '.';
  },
  currency: {
    symbol: '$'
  }
});
numeral.locale('custom');

export const NUMERAL_FORMAT_NUM = '0[.][00]a';
export const NUMERAL_FORMAT_INTEGER = '0,0';
export const NUMERAL_FORMAT_FLOAT = '0,0[.][0000]';
export const NUMERAL_FORMAT_FLOAT_2_DIGITS = '0,0[.][00]';
export const NUMERAL_FORMAT_FLOAT_3_DIGITS = '0,0[.][000]';
export const NUMERAL_FORMAT_CURRENCY = '$0[.][00]a';
export const NUMERAL_FORMAT_PERCENTAGE = '0[.][00]%';
export const NUMERAL_FORMAT_PERCENTAGE_3_DIGITS = '0[.][000]%';
export const NUMERAL_FORMAT_FILE_SIZE = '0b';

export const validateNumberRegexp = new RegExp(
  /^([-+]?)([0-9]*)((\.[0-9]*)?)$/
);

export function isNumberLike(n: any): boolean {
  return !isNaN(parseFloat(n)) && !!n.toString().match(validateNumberRegexp);
}

export function tryNumberLike<T extends any>(
  value: any,
  defaultValue?: T,
  convertToNumber = false
): T | null {
  if(isNumberLike(value)) {
    return convertToNumber ? +value : value;
  }
  return defaultValue ?? null;
}

export function toFixed<T extends any>(
  value: any,
  digits?: number,
  defaultValue?: T
): T | null {
  if(!isNumberLike(value)) return defaultValue ?? null;
  return !isNil(digits) ? (+value).toFixed(digits) : value;
}

export function formatNumeral(
  value: any,
  formatString: string = NUMERAL_FORMAT_NUM,
  defaultValue?: string | number
): string {
  if(!isNumberLike(value)) return (defaultValue ?? '').toString();
  return numeral(value).format(formatString);
}

export type NumeralFormatType = {
  value: number;
  maxLength?: number;
  type?: 'currency' | 'number';
  hasDigits?: boolean;
  shouldBeShortened?: boolean;
};

export const chooseNumeralFormat = ({
                                      value,
                                      maxLength = 6,
                                      type = 'number',
                                      hasDigits = true,
                                      shouldBeShortened = true
                                    }: NumeralFormatType): string => {
  const val = tryNumberLike<any>(value, null, true);
  if(!val) return '';
  const isCurrency = type === 'currency';
  const shouldBeShort =
    shouldBeShortened && (val ? val.toFixed().length > maxLength : false);

  return `${isCurrency ? '$' : ''}0,0${hasDigits ? '[.][00]' : ''}${
    shouldBeShort ? 'a' : ''
  }`;
};
