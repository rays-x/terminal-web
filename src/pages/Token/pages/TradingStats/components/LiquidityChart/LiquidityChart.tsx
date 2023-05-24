import React from 'react';
import {Area, AreaChart, ResponsiveContainer, Tooltip} from 'recharts';
import {getLineDefaults} from '../../TradingStats';
import {Axes} from '../Axes/Axes';
import {CustomTooltip} from '../CustomTooltip/CustomTooltip';
import {Gradients} from '../Gradients/Gradients';
import {chooseNumeralFormat, formatNumeral} from '../../../../../../utils/numbers';
import {SubChartValue} from '../../../../components/SubChart/SubChartValue/SubChartValue';
import {SubChartHeader} from '../../../../components/SubChart/SubChartHeader/SubChartHeader';
import {dateMapF, getValueChange} from '../../../../../../presets/helpers/charts';
import {useFetch} from '../../../../../../hooks';
import {CurrentCoinData} from '../../../../CoinPage';
import {format} from 'date-fns';
import { TokenVolumeResponse } from '../TradingVolumeChart/types';
import { LiquidityChartStyled } from './LiquidityChart-styled';
/*
const [dropDownState, DropDown] = dropDown<number>({
  width: 100,
  wrapperWidth: 64
});*/
const CMC_USD_ID = 2781;
export const LiquidityChart: React.FC = React.memo(() => {
  /*const {
    options,
    selected: [selectedRow, setSelectedRow],
    active: [activeRow, setActiveRow]
  } = dropDownState({
    options: [],
    selectedOption: 10
  });*/
  const currentCoinData = React.useContext(CurrentCoinData);
  const [data, setData] = React.useState<{ date: string, amount: number }[]>([]);
  const {data: _data } = useFetch<TokenVolumeResponse>({
    url: `https://api.coingecko.com/api/v3/coins/${currentCoinData.coingecko_slug}/market_chart`,
    params: {
      vs_currency: 'usd',
      days: 30,
      interval: 'daily'
    },
    withCredentials: false
  });

  React.useEffect(() => {
    if(!_data || !currentCoinData) {
      return;
    }
    const items = _data.market_caps
    .map(([timestamp, market_cap]) => ({
      date: format(new Date(timestamp), 'yyyy-MM-dd'),
      amount: market_cap
    }))
    setData(items);
  }, [currentCoinData, _data]);

  const chartData = React.useMemo(() => {
    return data.map(dateMapF);
  }, [data]);

  const totalValue = chartData?.[chartData?.length - 1]?.amount || 0;

  const value = formatNumeral(
    totalValue,
    chooseNumeralFormat({
      value: totalValue,
      type: 'currency'
    })
  );

  const valueChange = React.useMemo(() => {
    return getValueChange(chartData, 'amount');
  }, [chartData]);

  return (
    <LiquidityChartStyled.Component>
      <SubChartHeader
        title={'Liquidity'}
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
        chartValue={
          <SubChartValue
            value={value}
            valueChange={valueChange?.valuePercent}
            valueChangeDirection={valueChange?.direction}
          />
        }
      />

      <LiquidityChartStyled.Body>
        <ResponsiveContainer width="99%" height="100%" debounce={1}>
          <AreaChart data={chartData}>
            {Gradients()}
            {Axes({
              data: chartData,
              dataValueKey: 'amount'
            })}
            <Tooltip content={CustomTooltip({shouldBeShortened: false})}/>
            <Area
              name="Liquidity"
              type="monotone"
              dataKey="amount"
              {...getLineDefaults('#61E9FB', '#66EDFA')}
            />
          </AreaChart>
        </ResponsiveContainer>
      </LiquidityChartStyled.Body>
    </LiquidityChartStyled.Component>
  );
});
