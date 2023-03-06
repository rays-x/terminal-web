import React, {useMemo} from 'react';
import {Area, AreaChart, ResponsiveContainer, Tooltip} from 'recharts';
import {getLineDefaults} from '../../TradingStats';
import {Axes} from '../Axes/Axes';
import {CustomTooltip} from '../CustomTooltip/CustomTooltip';
import {Gradients} from '../Gradients/Gradients';
import {SubChartHeader} from '../../../../components/SubChart/SubChartHeader/SubChartHeader';
import {SubChartValue} from '../../../../components/SubChart/SubChartValue/SubChartValue';
import {chooseNumeralFormat, formatNumeral} from '../../../../../../utils/numbers';
import {dateMapF, getValueChange} from '../../../../../../presets/helpers/charts';
import {LiquidityChartStyled} from './LiquidityChart-styled';
import {CurrentCoinData} from '../../../../CoinPage';
import {StatsLiquidityResponse} from '../../../../types';
import {get, takeRight} from 'lodash';
import {useFetch} from '../../../../../../hooks';
import {format} from 'date-fns';
// import {dropDown} from '../../../../../../components/_old/ui/Dropdown/DropDown';

/*
const [dropDownState, DropDown] = dropDown<number>({
  width: 100,
  wrapperWidth: 64
});*/

export const LiquidityChart: React.FC = () => {
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
  const {data: _data, loading: loading} = useFetch<StatsLiquidityResponse[]>({
    url: `${import.meta.env.VITE_BACKEND_URL}/token/${currentCoinData?.id}/liquidity`,
    withCredentials: false
  });

  React.useEffect(() => {
    if(!_data || !currentCoinData) {
      return;
    }
    const items = get(_data, 'items', [])
    .map(({date, liquidity}) => ({
      date: format(new Date(date), 'yyyy-MM-dd'),
      amount: liquidity
    }))/*.concat({date: format(new Date(), 'yyyy-MM-dd'), amount: currentCoinData.daily_volume})*/;
    setData(items);
  }, [currentCoinData, _data]);

  const chartData = useMemo<typeof data>(() => {
    return data.reverse().map(dateMapF);
  }, [data]);

  const totalValue = React.useMemo(() => {
    return get(takeRight(chartData, 1), '0.amount', 0);
  }, [chartData]);

  const value = formatNumeral(
    totalValue,
    chooseNumeralFormat({
      value: totalValue,
      type: 'currency'
    })
  );

  const valueChange = useMemo(() => {
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
            {Axes({data: chartData, dataValueKey: 'value'})}
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
};
