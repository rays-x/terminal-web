import React, { useMemo } from 'react';
import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis} from 'recharts';
import {Gradients} from '../Gradients/Gradients';
import {CustomTooltip} from '../CustomTooltip/CustomTooltip';
import {Axes} from '../Axes/Axes';
import {getLineDefaults} from '../../TradingStats';
import {dateMapF} from '../../../../../../presets/helpers/charts';
import {chooseNumeralFormat, formatNumeral} from '../../../../../../utils/numbers';
import {SubChartHeader} from '../../../../components/SubChart/SubChartHeader/SubChartHeader';
import {SubChartValue} from '../../../../components/SubChart/SubChartValue/SubChartValue';

import {SwapsChartStyled} from './SwapsChart-styled';
// import {dropDown} from '../../../../../../components/_old/ui/Dropdown/DropDown';
import {CurrentCoinData} from '../../../../CoinPage';
import {useFetch} from '../../../../../../hooks';
import { BQ_API_KEY, BqPlatformMapper } from '../../../../../../constants';
import { gqlQuery } from './constants';
import { TradesResponse } from './types';

/*const [dropDownState, DropDown] = dropDown<number>({
  width: 100,
  wrapperWidth: 64
});*/

export const SwapsChart: React.FC = React.memo(() => {
  const currentCoinData = React.useContext(CurrentCoinData);
  /*const {
    options,
    selected: [selectedRow, setSelectedRow],
    active: [activeRow, setActiveRow]
  } = dropDownState({
    options: [],
    selectedOption: 10
  });*/

  const fromDate = useMemo(() => Date.now() - 14 * 24 * 60 * 60 * 1000, []);
  const toDate = useMemo(() => Date.now(), [])

  const { data } = useFetch<TradesResponse>({
    url: 'https://graphql.bitquery.io/',
    withCredentials: false,
    method: 'POST',
    headers: {
      'X-Api-Key': BQ_API_KEY,
    },
    data: {
      query: gqlQuery,
      variables: {
        from: new Date(fromDate).toISOString(),
        till: new Date(toDate).toISOString(),
        dateFormat: "%Y-%m-%d",
        network: BqPlatformMapper[currentCoinData?.platforms[0]?.coingecko_slug || ''],
        token: currentCoinData?.platforms[0].address,
      },
    }
  });


  const chartData = React.useMemo(() => {
    return data?.data?.ethereum?.dexTrades.map((trade) => ({
      date: trade.date.date,
      trades: Number.parseInt(trade.trades, 10),
    })) ?? [];
  }, [data]);

  const totalValue = React.useMemo(() => {
    return data?.data?.ethereum?.dexTrades.reduce((p, n) => p + Number.parseInt(n.trades, 10), 0) || 0;
  }, [data]);

  const value = React.useMemo(() => {
    return formatNumeral(
      totalValue,
      chooseNumeralFormat({
        value: totalValue
      })
    );
  }, [totalValue]);

  return (
    <SwapsChartStyled.Component>
      <SubChartHeader
        title={'Swaps'}
        /*titleContent={
          <DropDown
            title={'Total'}
            options={options}
            selectedOption={selectedRow}
            setSelectedOption={setSelectedRow}
            activeOption={activeRow}
            setActiveOption={setActiveRow}
          />
        }*/
        chartValue={<SubChartValue value={value}/>}
      />

      <SwapsChartStyled.Body>
        <ResponsiveContainer width="98%" height="100%" debounce={1}>
          <AreaChart data={chartData}>
            {Gradients()}
            {Axes({
              data: chartData,
              dataValueKey: 'trades',
              yAxisProps: {
                tickFormat: {
                  formatValue: _ => _
                }
              }
            })}
            <Tooltip content={CustomTooltip({
              valueFormatter: _ => _
            })}/>
            <Area
              name="Swaps"
              type="monotone"
              dataKey="trades"
              {...getLineDefaults('url(#colorful)', 'url(#colorful)')}
            />
          </AreaChart>
        </ResponsiveContainer>
      </SwapsChartStyled.Body>
    </SwapsChartStyled.Component>
  );
});
