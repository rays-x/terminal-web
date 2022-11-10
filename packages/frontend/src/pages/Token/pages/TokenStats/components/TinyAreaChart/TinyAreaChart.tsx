import React from 'react';
import {AreaChart, Area, ResponsiveContainer} from 'recharts';
import {useParams} from 'react-router';
import {dateMapF} from '../../../../../../presets/helpers/charts';

import {
  chooseNumeralFormat,
  formatNumeral
} from '../../../../../../utils/numbers';
import {TinyAreaChartStyled} from './TinyAreaChart-styled';

export const TinyAreaChart = () => {
  const {token: input} = useParams();

  const mergedData = {
    transfersStats: {
      chartData: []
    }
  } /*useMerge(
    TRANSFER_STATS_UNIQ_CHARTS_QUERY,
    TRANSFER_STATS_UNIQ_CHARTS,
    {
      variables: {input}
    }
  )*/;

  const chartData = mergedData?.transfersStats?.chartData.map(dateMapF);

  //todo вынести на верхний уровень, обернуть контекстом, и использовать здесь, чтобы не перезапрашивать (или разрулить кэш)
  // или поправить бэк под ручки к каждому графику

  const mergedFields = {
    transfersStats: {
      overAllData: undefined
    }
  }/*useMerge(
    TRANSFER_STATS_FIELDS_QUERY,
    TRANSFER_STATS_FIELDS,
    {
      variables: {input}
    }
  )*/;

  const fields = mergedFields?.transfersStats?.overAllData;

  if (!(chartData?.[Symbol.iterator] && fields)) return <></>;

  return (
    <TinyAreaChartStyled.Component>
      <TinyAreaChartStyled.Item>
        <TinyAreaChartStyled.Info>
          <span>Unique Receivers</span>
          <span>
            {formatNumeral(
              fields?.uniq_receivers,
              chooseNumeralFormat({value: fields?.uniq_receivers})
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
              <Area
                type="monotone"
                dataKey="uniq_receivers"
                stroke="url(#gradientBlue)"
                fill="url(#gradientBlue)"
                fillOpacity={0.2}
                strokeWidth={2}
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
              fields?.uniq_senders,
              chooseNumeralFormat({value: fields?.uniq_senders})
            )}
          </span>
        </TinyAreaChartStyled.Info>
        <TinyAreaChartStyled.Chart>
          <ResponsiveContainer width="99%" height="100%">
            <AreaChart data={chartData}>
              <Area
                type="monotone"
                dataKey="uniq_senders"
                stroke="url(#gradientBlue)"
                fill="url(#gradientBlue)"
                fillOpacity={0.2}
                strokeWidth={2}
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
              fields?.transfer_count,
              chooseNumeralFormat({value: fields?.transfer_count})
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
              <Area
                type="monotone"
                dataKey="transfer_count"
                stroke="url(#transferCountStroke)"
                fill="url(#transferCountFill)"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </TinyAreaChartStyled.Chart>
      </TinyAreaChartStyled.Item>
    </TinyAreaChartStyled.Component>
  );
};
