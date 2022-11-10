import {useMemo} from 'react';
import {format} from 'date-fns';
import usLocale from 'date-fns/locale/en-US';
import {DATETIME_FORMAT_FULL, tryParseIso} from '../utils/date/date';

export function formatDate(
  dateIso: Date | string,
  formatString: string,
  options?: any
): string;
export function formatDate(
  dateIso: Date | string | undefined | null,
  formatString: string,
  options?: any
): string | null;
export function formatDate(
  dateIso: Date | string | undefined | null,
  formatString: string = DATETIME_FORMAT_FULL,
  options?: any
) {
  const date =
    typeof dateIso === 'string' ? tryParseIso(dateIso) : dateIso || null;
  return (
    (date && format(date, formatString, {locale: usLocale, ...options})) ||
    null
  );
}

export const useFormatDate = (
  dateIso: Date | string | undefined | null,
  formatString: string = DATETIME_FORMAT_FULL
) => {
  return useMemo(() => {
    return formatDate(dateIso, formatString);
  }, [dateIso, formatString]);
};
