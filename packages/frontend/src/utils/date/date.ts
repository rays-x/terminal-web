import { isNil } from 'lodash-es';
import { format, isValid, parseISO } from 'date-fns';
import { EMDASH } from '../data/utf';
import { joinNonEmpty } from '../arrays';
import {formatDate} from '../../hooks/useFormatDate';

export const DATE_FORMAT_FULL = 'dd MMMM yyyy';
export const DATE_FORMAT_DAY_MONTH = 'dd MMMM';
export const DATETIME_FORMAT_FULL = 'dd MMMM yyyy, HH:mm';
export const DATE_FORMAT_SHORT = 'MM/dd/yy';
export const DATE_FORMAT_SHORT_FULL_YEAR = 'MM/dd/yyyy';
export const DATE_FORMAT_CHART_SHORT = 'd LLL';
export const MONTH_FORMAT_FULL = 'MMMM';
export const MONTH_FORMAT_SHORT = 'MMM';
export const DAY_FORMAT_FULL = 'EEEE';
export const DAY_FORMAT_SHORT = 'EEEEEE';

export function addZero(value: number): number | string {
  return !isNaN(value) && !isNil(value)
    ? (value < 10 ? '0' : '') + value
    : value;
}

/**
 * Достаёт дату из ISO-строки и возвращает объект Date который в локальном
 * часовом поясе указывает на начало дня этой даты
 *
 * @param dateString - строка в формате ISO
 */
export function getDateUtc<T extends string | undefined | null>(
  dateString: T
): T | string {
  return dateString && dateString.slice(0, 4 + 2 + 2 + 2) + 'T00:00:00';
}

export function convertToUtcStr(date?: Date): string;
export function convertToUtcStr(
  date?: Date | number | string | null
): string | undefined;
export function convertToUtcStr(date?: Date | number | string | null) {
  const d = date && new Date(date);
  const dateString = d ? format(d, 'yyyy-MM-dd') + 'T00:00:00Z' : undefined;

  return dateString && isValid(new Date(dateString)) ? dateString : undefined;
}

/**
 * Пробует распарсить строку в формате ISO.
 * Если получается, то возвращает получившийся объект даты.
 * Иначе возвращает null
 *
 * @param string - строка, содержащая дату в формате ISO
 */
export function tryParseIso(string?: string) {
  if (!string) return null;
  const date = parseISO(string);
  if (isValid(date)) {
    return date;
  }
  return null;
}

/**
 * Смещает ISO-строку из UTC в локальный часовой пояс с сохранением
 * времени
 *
 * @param date - строка в формате ISO
 */
export function parseIsoToLocal(date?: string): string {
  if (!date) return '';
  if (date[date.length - 1] !== 'Z') return date;
  return date.slice(0, date.length - 1);
}

export function isoStringWithoutTime(isoString?: string) {
  if (!isoString) return undefined;
  const tIndex = isoString.indexOf('T');
  return tIndex > -1 ? isoString.slice(0, tIndex) : isoString;
}

export function setIsoStartOfDay(isoString?: string) {
  if (!isoString) return undefined;
  return isoStringWithoutTime(isoString) + 'T00:00:00Z';
}

export function setIsoEndOfDay(isoString?: string) {
  if (!isoString) return undefined;
  return isoStringWithoutTime(isoString) + 'T23:59:59Z';
}

export function getFormattedDateStr(
  date: Date | string | number,
  formatString: string = DATE_FORMAT_SHORT
): string | null {
  if (!date) return null;

  return formatDate(convertToUtcStr(date), formatString) ?? null;
}

export function getDateRangeStr(
  dates: Date[] | string[] | number[],
  formatString: string = DATE_FORMAT_SHORT
): string {
  if (!dates?.length) return '';

  // const d1 = convertToUtcStr(dates[0]);
  // const d2 = convertToUtcStr(dates[1]);
  // const dStr1 = formatDate(d1, formatString) || null;
  // const dStr2 = formatDate(d2, formatString) || null;
  const dStr1 = getFormattedDateStr(dates[0], formatString);
  const dStr2 = getFormattedDateStr(dates[1], formatString);

  return joinNonEmpty([dStr1, dStr2], ` ${EMDASH} `);
}
