import React, {useMemo} from 'react';
import {AreaChart, Area, ResponsiveContainer, Tooltip, XAxis} from 'recharts';
import {dateMapF} from '../../../../../../presets/helpers/charts';

import {
  chooseNumeralFormat,
  formatNumeral
} from '../../../../../../utils/numbers';
import {TinyAreaChartStyled} from './TinyAreaChart-styled';
import {useLazyFetch} from '../../../../../../hooks/useFetch';
import {StatsTransfersResponse} from '../../../../types';
import {CurrentCoinData} from '../../../../CoinPage';
import {takeRight} from 'lodash';
import {CustomTooltip} from '../../../TradingStats/components/CustomTooltip/CustomTooltip';

export const TinyAreaChart = () => {
  const currentCoinData = React.useContext(CurrentCoinData);
  const [{data, loading}, getLazyStatsTransfers] = useLazyFetch<StatsTransfersResponse[]>({
    url: `${import.meta.env.VITE_BACKEND_URL}/bq/stats/transfers`,
    withCredentials: false
  });

  React.useEffect(() => {
    if (!currentCoinData?.id) {
      return;
    }
    getLazyStatsTransfers({
      params: {
        btcAddress: currentCoinData.platform_binance,
        ethAddress: currentCoinData.platform_ethereum
      }
    }).catch();
  }, [currentCoinData?.id]);

  const chartData = useMemo(() => {
    if (!data) {
      return [];
    }
    return takeRight(data.map(item => ({
      date: item.date,
      transferCount: item.transferCount,
      uniqReceivers: item.uniqReceivers,
      uniqSenders: item.uniqSenders
    })).map(dateMapF).reverse(), 15);
  }, [data]);

  const fields = chartData.reduce((prev, next) => {
    prev['uniqReceivers'] = next['uniqReceivers'] + prev['uniqReceivers'];
    prev['uniqSenders'] = next['uniqSenders'] + prev['uniqSenders'];
    prev['transferCount'] = next['transferCount'] + prev['transferCount'];
    return prev;
  }, {
    uniqReceivers: 0,
    uniqSenders: 0,
    transferCount: 0
  });

  return (
    <TinyAreaChartStyled.Component>
      <TinyAreaChartStyled.Item>
        <TinyAreaChartStyled.Info>
          <span>Unique Receivers</span>
          <span>
            {formatNumeral(
              fields?.uniqReceivers,
              chooseNumeralFormat({value: fields?.uniqReceivers})
            )}
          </span>
        </TinyAreaChartStyled.Info>
        <TinyAreaChartStyled.Chart>
          <ResponsiveContainer width={'99%'} height={'100%'}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="gradientBlue" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0.5%" stopColor="rgba(57, 208, 255, 0.5)"/>
                  <stop offset="97.9%" stopColor="rgba(131, 255, 248, 0.5)"/>
                </linearGradient>
              </defs>
              <Tooltip
                content={CustomTooltip({
                  showLegendDot: false,
                  shouldBeShortened: false,
                  showValueLabel: false,
                  valueFormatter: (value) => value
                })}
              />
              <Area
                type="monotone"
                dataKey="uniqReceivers"
                stroke="url(#gradientBlue)"
                fill="url(#gradientBlue)"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <XAxis
                hide={true}
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
            </AreaChart>
          </ResponsiveContainer>
        </TinyAreaChartStyled.Chart>
      </TinyAreaChartStyled.Item>

      <TinyAreaChartStyled.Item>
        <TinyAreaChartStyled.Info>
          <span>Unique Senders</span>
          <span>
            {formatNumeral(
              fields?.uniqSenders,
              chooseNumeralFormat({value: fields?.uniqSenders})
            )}
          </span>
        </TinyAreaChartStyled.Info>
        <TinyAreaChartStyled.Chart>
          <ResponsiveContainer width="99%" height="100%">
            <AreaChart data={chartData}>
              <Tooltip
                content={CustomTooltip({
                  showLegendDot: false,
                  shouldBeShortened: false,
                  showValueLabel: false,
                  valueFormatter: (value) => value
                })}
              />
              <Area
                type="monotone"
                dataKey="uniqSenders"
                stroke="url(#gradientBlue)"
                fill="url(#gradientBlue)"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <XAxis
                hide={true}
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
            </AreaChart>
          </ResponsiveContainer>
        </TinyAreaChartStyled.Chart>
      </TinyAreaChartStyled.Item>

      <TinyAreaChartStyled.Item>
        <TinyAreaChartStyled.Info>
          <span>Transfers Count</span>
          <span>
            {formatNumeral(
              fields?.transferCount,
              chooseNumeralFormat({value: fields?.transferCount})
            )}
          </span>
        </TinyAreaChartStyled.Info>
        <TinyAreaChartStyled.Chart>
          <ResponsiveContainer width="99%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="transferCountStroke">
                  <stop offset="0%" stopColor="#E79900"/>
                  <stop offset="50%" stopColor="#CEB300"/>
                  <stop offset="100%" stopColor="#CAB600"/>
                </linearGradient>
                <linearGradient id="transferCountFill">
                  <stop offset="0.5%" stopColor="#E76F00"/>
                  <stop offset="97.9%" stopColor="#FF782D"/>
                </linearGradient>
              </defs>
              <Tooltip
                content={CustomTooltip({
                  showLegendDot: false,
                  shouldBeShortened: false,
                  showValueLabel: false,
                  valueFormatter: (value) => value
                })}
              />
              <Area
                type="monotone"
                dataKey="transferCount"
                stroke="url(#transferCountStroke)"
                fill="url(#transferCountFill)"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <XAxis
                hide={true}
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
            </AreaChart>
          </ResponsiveContainer>
        </TinyAreaChartStyled.Chart>
      </TinyAreaChartStyled.Item>
    </TinyAreaChartStyled.Component>
  );
};
