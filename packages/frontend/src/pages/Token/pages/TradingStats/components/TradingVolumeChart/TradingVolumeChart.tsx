import React from 'react';
import {AreaChart, Area, ResponsiveContainer, Tooltip} from 'recharts';
import {getLineDefaults} from '../../TradingStats';
import {Axes} from '../Axes/Axes';
import {CustomTooltip} from '../CustomTooltip/CustomTooltip';
import {Gradients} from '../Gradients/Gradients';
import {
  chooseNumeralFormat,
  formatNumeral
} from '../../../../../../utils/numbers';
import {
  SubChartValue
} from '../../../../components/SubChart/SubChartValue/SubChartValue';
import {SubChartHeader} from '../../../../components/SubChart/SubChartHeader/SubChartHeader';
import {
  dateMapF,
  getValueChange
} from '../../../../../../presets/helpers/charts';
import {TradingVolumeChartStyled} from './TradingVolumeChart-styled';
import {useFetch} from '../../../../../../hooks';
import {CmcVolume, Quote} from '../../../../types';
import {CurrentCoinData} from '../../../../CoinPage';
import {useParams} from 'react-router';
import {format, startOfDay, subDays} from 'date-fns';
import {get, takeRight} from 'lodash';
/*
const [dropDownState, DropDown] = dropDown<number>({
  width: 100,
  wrapperWidth: 64
});*/
const CMC_USD_ID = 2781;
export const TradingVolumeChart: React.FC = React.memo(() => {
  /*const {
    options,
    selected: [selectedRow, setSelectedRow],
    active: [activeRow, setActiveRow]
  } = dropDownState({
    options: [],
    selectedOption: 10
  });*/
  const currentCoinData = React.useContext(CurrentCoinData);
  const CMC_ID = Number(currentCoinData.id);
  const [data, setData] = React.useState<{ date: string, amount: number }[]>([]);
  const {data: _data, loading: loading} = useFetch<CmcVolume>({
    url: `${import.meta.env.VITE_BACKEND_PROXY_URL}/data-api/v3/cryptocurrency/historical`,
    params: {
      id: CMC_ID,
      convertId: CMC_USD_ID,
      timeStart: startOfDay(subDays(new Date(), 19)).getTime() / 1000,
      timeEnd: startOfDay(subDays(new Date(), 1)).getTime() / 1000
    },
    withCredentials: false
  });

  React.useEffect(() => {
    if (!_data || !currentCoinData) {
      return;
    }
    const items = get(_data, 'data.quotes', [])
      .map(({quote: {timestamp, volume}}: Quote) => ({
        date: format(new Date(timestamp), 'yyyy-MM-dd'),
        amount: volume
      })).concat({date: format(new Date(), 'yyyy-MM-dd'), amount: currentCoinData.daily_volume});
    setData(items);
  }, [currentCoinData, _data]);

  const chartData = React.useMemo(() => {
    return data?.map(dateMapF) ?? [];
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

  const valueChange = React.useMemo(() => {
    return getValueChange(chartData, 'amount');
  }, [chartData]);

  return (
    <TradingVolumeChartStyled.Component>
      <SubChartHeader
        title={'Trading Volume'}
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

      <TradingVolumeChartStyled.Body>
        <ResponsiveContainer width="99%" height="100%" debounce={1}>
          <AreaChart data={chartData}>
            {Gradients()}
            {Axes({
              data: chartData,
              dataValueKey: 'amount'
            })}
            <Tooltip content={CustomTooltip({shouldBeShortened: false})}/>
            <Area
              name="Trading Volume"
              type="monotone"
              dataKey="amount"
              {...getLineDefaults('#61E9FB', '#66EDFA')}
            />
          </AreaChart>
        </ResponsiveContainer>
      </TradingVolumeChartStyled.Body>
    </TradingVolumeChartStyled.Component>
  );
});
