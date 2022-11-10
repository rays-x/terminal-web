import React, {useMemo} from 'react';
import {XAxis, YAxis, CartesianGrid, XAxisProps, YAxisProps} from 'recharts';
import {
  chooseNumeralFormat,
  formatNumeral,
  NumeralFormatType
} from '../../../../../../utils/numbers';

export interface AxesProps {
  data?: any[];
  dataValueKey?: string | string[];
  xAxisProps?: XAxisProps & {
    tickFormat?: Partial<NumeralFormatType> & { formatString?: string };
  };
  yAxisProps?: YAxisProps & {
    tickFormat?: Partial<NumeralFormatType> & { formatString?: string };
  };
}

export const Axes = ({
                       data,
                       dataValueKey = 'value',
                       xAxisProps,
                       yAxisProps
                     }: AxesProps = {}) => {
  const maxDataValue = useMemo(() => {
    if (!data?.length) return 0;
    const valueKeys = Array.isArray(dataValueKey)
      ? dataValueKey
      : [dataValueKey];

    return (
      Math.max.apply(
        null,
        valueKeys.map((key) => {
          return Math.max.apply(
            null,
            data.map((item) => item[key] || 0)
          );
        })
      ) || 0
    );
  }, [data, dataValueKey]);

  const yAxisWidth = maxDataValue >= 1e12 ? 75 : 55;

  return (
    <>
      <CartesianGrid stroke="rgba(255, 255, 255, 0.06)" vertical={false}/>
      <XAxis
        dataKey="date"
        tickMargin={10}
        axisLine={false}
        tickLine={false}
        interval={'preserveStartEnd'}
        tick={({x, y, payload: {value}}) => {
          const tickValue = formatNumeral(
            value,
            xAxisProps?.tickFormat?.formatString ||
            chooseNumeralFormat({
              value,
              ...xAxisProps?.tickFormat
            }),
            value
          );
          return (
            <g transform={`translate(${x},${y})`}>
              <text
                x={25}
                y={10}
                textAnchor="end"
                fill="#8E91A5"
                fontSize="11"
                fontWeight={500}
              >
                {tickValue}
              </text>
            </g>
          );
        }}
        {...xAxisProps}
      />
      <YAxis
        tickCount={4}
        tickMargin={25}
        axisLine={false}
        width={yAxisWidth}
        tickLine={false}
        tick={({x, y, payload: {value}}) => {
          const tickValue = formatNumeral(
            value,
            yAxisProps?.tickFormat?.formatString ||
            chooseNumeralFormat({
              value,
              maxLength: 5,
              type: 'currency',
              ...yAxisProps?.tickFormat
            })
          );
          return (
            <g transform={`translate(${x},${y})`}>
              <text
                x={15}
                y={0}
                dy={0}
                textAnchor="end"
                fill="#8E91A5"
                fontSize="11"
                fontWeight={500}
              >
                {tickValue}
              </text>
            </g>
          );
        }}
        {...yAxisProps}
      />
    </>
  );
};
