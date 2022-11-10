import React, {useContext, useMemo} from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from 'recharts';
import {throttle} from 'lodash-es';
import {useParams} from 'react-router';
import {dateMapF} from '../../../../../../presets/helpers/charts';

import {
  chooseNumeralFormat,
  formatNumeral,
  NUMERAL_FORMAT_FLOAT
} from '../../../../../../utils/numbers';
import {CustomTooltip} from '../../../TradingStats/components/CustomTooltip/CustomTooltip';
import {CurrentCoinData} from '../../../../CoinPage';
import {EMDASH} from '../../../../../../utils/data/utf';
import {StackedAreaChartStyled} from './StackedAreaChart-styled';

function getLineDefaults(fillColor, strokeColor) {
  return {
    stroke: strokeColor,
    fill: fillColor,
    fillOpacity: 0.2,
    strokeWidth: 2,
    dot: false,
    activeDot: {
      r: 6,
      fill: '#fff',
      stroke: strokeColor,
      strokeWidth: 3
    }
  };
}

export const StackedAreaChart = () => {
  const currentCoinData = useContext(CurrentCoinData);
  const coinIndex = currentCoinData?.index?.toUpperCase();

  const {token: input} = useParams();

  const mergedData = {
    transfersStats: {
      chartData: [],
      overAllData: undefined
    }
  }/*useMerge(
    TRANSFER_STATS_CHARTS_QUERY,
    TRANSFER_STATS_CHARTS,
    {
      variables: {input}
    }
  )*/;

  const chartData = useMemo(() => {
    return mergedData?.transfersStats?.chartData.map(dateMapF) || [];
  }, [mergedData?.transfersStats?.chartData]);

  const mergedFields = {
    transfersStats: {
      overAllData: undefined
    }
  } /*useMerge(
    TRANSFER_STATS_FIELDS_QUERY,
    TRANSFER_STATS_FIELDS,
    {
      variables: {input}
    }
  )*/;

  const fields = mergedFields?.transfersStats?.overAllData;

  const headerValues = useMemo(() => {
    return [
      {
        title: 'Total Amount:',
        value: formatNumeral(
          fields?.total_amount,
          chooseNumeralFormat({
            value: fields?.total_amount,
            maxLength: 7,
            hasDigits: false
          })
        )
      },
      {
        title: 'Median Transfer Amount:',
        value: formatNumeral(
          fields?.median_transfer_amount,
          NUMERAL_FORMAT_FLOAT
        )
      },
      {
        title: 'Average Transfer Amount:',
        value: formatNumeral(
          fields?.average_transfer_amount,
          NUMERAL_FORMAT_FLOAT
        )
      }
    ];
  }, [fields]);

  return (
    <StackedAreaChartStyled.Component>
      <StackedAreaChartStyled.Header>
        {headerValues.map((item, iItem) => (
          <StackedAreaChartStyled.HeaderItem key={iItem}>
            <span>{item.title}</span>
            <span>
              {item.value || EMDASH} {coinIndex}
            </span>
          </StackedAreaChartStyled.HeaderItem>
        ))}
      </StackedAreaChartStyled.Header>

      <StackedAreaChartStyled.Body>
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient
                id="totalAmountGradient"
                x1="0"
                y1="1"
                x2="1"
                y2="0"
              >
                <stop offset="0.5%" stopColor="#27E65C"/>
                <stop offset="50.22%" stopColor="#587BFF"/>
                <stop offset="97.9%" stopColor="#B518FF"/>
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="rgba(255, 255, 255, 0.06)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tickMargin={10}
              axisLine={false}
              tickLine={false}
              // tickCount={5}
              interval={'preserveStartEnd'}
              tick={({x, y, payload}) => {
                return (
                  <g transform={`translate(${x},${y})`}>
                    <text
                      x={25}
                      y={10}
                      // dx={10}
                      textAnchor="end"
                      fill="#8E91A5"
                      fontSize="11"
                      fontWeight={500}
                    >
                      {payload.value}
                    </text>
                  </g>
                );
              }}
            />
            <YAxis
              tickCount={4}
              tickMargin={25}
              width={55}
              axisLine={false}
              tickLine={false}
              tick={({x, y, payload: {value}}) => (
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
                    {formatNumeral(
                      value,
                      chooseNumeralFormat({
                        value,
                        maxLength: 4,
                        type: 'currency'
                      })
                    )}
                  </text>
                </g>
              )}
            />
            <Legend
              content={throttle(
                ({key, payload}) => (
                  <StackedAreaChartStyled.Legend key={key}>
                    {payload?.map((entry, i) => (
                      <StackedAreaChartStyled.LegendItem key={i}>
                        {entry.value}
                      </StackedAreaChartStyled.LegendItem>
                    ))}
                  </StackedAreaChartStyled.Legend>
                ),
                100
              )}
            />
            <Tooltip
              content={CustomTooltip({
                showLegendDot: true,
                shouldBeShortened: false
              })}
            />
            <Area
              name="Total Amount"
              type="monotone"
              dataKey="total_amount"
              // stackId="1"
              {...getLineDefaults(
                'url(#totalAmountGradient)',
                'url(#totalAmountGradient)'
              )}
            />
            <Area
              name="Median Transfer Amount"
              type="monotone"
              dataKey="median_transfer_amount"
              // stackId="2"
              {...getLineDefaults('#0AEE21', '#05E700')}
            />
            <Area
              name="Average Transfer Amount"
              type="monotone"
              dataKey="average_transfer_amount"
              // stackId="3"
              {...getLineDefaults('#0A21EE', '#4255FF')}
            />
          </AreaChart>
        </ResponsiveContainer>
      </StackedAreaChartStyled.Body>
    </StackedAreaChartStyled.Component>
  );
};
