import {DATE_FORMAT_CHART_SHORT} from '../../utils/date/date';
import {formatNumeral, NUMERAL_FORMAT_PERCENTAGE} from '../../utils/numbers';
import {ValueChangeDirection} from '../../pages/Token/components/SubChart/SubChartValue/SubChartValue';
import {formatDate} from '../../hooks/useFormatDate';

export function dateMapF(v) {
  return {
    ...v,
    date: v.date ? formatDate(v.date, DATE_FORMAT_CHART_SHORT) : ''
  };
}

export function timeToDateMapF(v) {
  return {
    ...v,
    date: v.time ? formatDate(v.time, DATE_FORMAT_CHART_SHORT) : ''
  };
}

export function getValueAspectDiff(
  valueNew: number,
  valueCompareTo: number
): number {
  const vOne = valueNew || 0;
  const vTwo = valueCompareTo || 0;
  return (vOne - vTwo) / vTwo || 0;
}

export type ValueChangeType = {
  value: number;
  valuePercent: string;
  direction: ValueChangeDirection;
};

export function getValueChange(
  data?: any[],
  valueKey: string = 'value'
): ValueChangeType | null {
  if(!data?.length) return null;
  const itemLast = data[data.length - 1];
  const itemPreLast = data[data.length - 2];
  const value = getValueAspectDiff(
    itemLast?.[valueKey],
    itemPreLast?.[valueKey]
  );
  return {
    value,
    valuePercent: formatNumeral(Math.abs(value), NUMERAL_FORMAT_PERCENTAGE),
    direction:
      value >= 0 ? ValueChangeDirection.positive : ValueChangeDirection.negative
  };
}
