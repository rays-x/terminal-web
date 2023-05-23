import React, {useMemo} from 'react';
import {Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {throttle} from 'lodash-es';
import {dateMapF} from '../../../../../../presets/helpers/charts';

import {chooseNumeralFormat, formatNumeral, NUMERAL_FORMAT_FLOAT} from '../../../../../../utils/numbers';
import {CustomTooltip} from '../../../TradingStats/components/CustomTooltip/CustomTooltip';
import {CurrentCoinData} from '../../../../CoinPage';
import {EMDASH} from '../../../../../../utils/data/utf';
import {StackedAreaChartStyled} from './StackedAreaChart-styled';
import {useFetch} from '../../../../../../hooks';
import {TokenTransfersResponse} from '../../../../../../types/api/TokenTransfersResponse';
import {avgBuy} from '../../../../../../utils/avg';
import { bqGqlBody } from './constants';
import { BQ_API_KEY, BqPlatformMapper } from '../../../../../../constants';

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

export const StackedAreaChart = React.memo(() => {
  const currentCoinData = React.useContext(CurrentCoinData);

  const fromDate = useMemo(() => Date.now() - 14 * 24 * 60 * 60 * 1000, []);
  const toDate = useMemo(() => Date.now(), [])
  
  const { data } = useFetch<TokenTransfersResponse>({
    url: 'https://graphql.bitquery.io/',
    withCredentials: false,
    method: 'POST',
    headers: {
      'X-Api-Key': BQ_API_KEY,
    },
    data: {
      query: bqGqlBody,
      variables: {
        limit: 20,
        offset: 0,
        network: BqPlatformMapper[currentCoinData?.platforms[0]?.coingecko_slug || ''],
        token: currentCoinData?.platforms[0].address,
      from: new Date(fromDate).toISOString(),
        till: new Date(toDate).toISOString(),
        dateFormat: "%Y-%m-%d",
      },
    }
  });

  const coinIndex = currentCoinData?.index?.toUpperCase();

  const chartData = useMemo(() => {
    if(!data) {
      return [];
    }
    return data.data.ethereum.transfers?.map(item => ({
      date: new Date(item.date.date),
      averageTransferAmount: item.average,
      medianTransferAmount: item.median,
      totalAmount: item.sum,
      averageTransferAmountUsd: item.average * +(currentCoinData?.price_usd || 0),
      medianTransferAmountUsd: item.median * +(currentCoinData?.price_usd || 0),
      totalAmountUsd: item.sum * +(currentCoinData?.price_usd || 0)
    })).map(dateMapF).reverse() || [];
  }, [data]);

  const headerValues = useMemo(() => {
    if(!data?.data.ethereum.transfers) {
      return [];
    }

    const totalAmount = data.data.ethereum.transfers.reduce((prev, next) => prev + next['sum'], 0);

    return [
      {
        title: 'Total Amount:',
        value: formatNumeral(
          totalAmount,
          chooseNumeralFormat({
            value: totalAmount,
            maxLength: 7,
            hasDigits: false
          })
        )
      },
      {
        title: 'Median Transfer Amount:',
        value: formatNumeral(
          avgBuy(data.data.ethereum.transfers.map(({ median, count }) => ({
            qty: count,
            price: median
          }))),
          NUMERAL_FORMAT_FLOAT
        )
      },
      {
        title: 'Average Transfer Amount:',
        value: formatNumeral(
          avgBuy(data.data.ethereum.transfers.map(({ average, count }) => ({
            qty: count,
            price: average
          }))),
          NUMERAL_FORMAT_FLOAT
        )
      }
    ];
  }, [data]);

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
              dataKey="totalAmountUsd"
              // stackId="1"
              {...getLineDefaults(
                'url(#totalAmountGradient)',
                'url(#totalAmountGradient)'
              )}
            />
            <Area
              name="Median Transfer Amount"
              type="monotone"
              dataKey="medianTransferAmountUsd"
              // stackId="2"
              {...getLineDefaults('#0AEE21', '#05E700')}
            />
            <Area
              name="Average Transfer Amount"
              type="monotone"
              dataKey="averageTransferAmountUsd"
              // stackId="3"
              {...getLineDefaults('#0A21EE', '#4255FF')}
            />
          </AreaChart>
        </ResponsiveContainer>
      </StackedAreaChartStyled.Body>
    </StackedAreaChartStyled.Component>
  );
});
