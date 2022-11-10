import React, {useMemo} from 'react';
import {AreaChart, Area, ResponsiveContainer, Tooltip} from 'recharts';
import {Gradients} from '../Gradients/Gradients';
import {CustomTooltip} from '../CustomTooltip/CustomTooltip';
import {Axes} from '../Axes/Axes';
import {getLineDefaults} from '../../TradingStats';
import {dateMapF} from '../../../../../../presets/helpers/charts';
import {
  chooseNumeralFormat,
  formatNumeral
} from '../../../../../../utils/numbers';
import {SubChartHeader} from '../../../../components/SubChart/SubChartHeader/SubChartHeader';
import {SubChartValue} from '../../../../components/SubChart/SubChartValue/SubChartValue';

import {SwapsChartStyled} from './SwapsChart-styled';
import {dropDown} from '../../../../../../components/_old/ui/Dropdown/DropDown';

type SwapType = {
  date?: string;
  price?: number;
}

type SwapBlockType = {
  swaps?: SwapType[];
  total?: number;
}

const [dropDownState, DropDown] = dropDown<number>({
  width: 100,
  wrapperWidth: 64
});

export interface SwapsChartProps {
  coinId: string;
}

export const SwapsChart: React.FC<SwapsChartProps> = ({coinId}) => {
  const {
    options,
    selected: [selectedRow, setSelectedRow],
    active: [activeRow, setActiveRow]
  } = dropDownState({
    options: [],
    selectedOption: 10
  });

  const data = {
    swaps: {
      swaps: [],
      total: undefined
    }
  }/*useMerge<{ swaps: SwapBlockType }, { coinId: string }>(
    QUERY_SWAPS_CHART,
    SUB_SWAPS_CHART,
    {
      variables: {coinId},
      skip: !coinId
    }
  )*/;

  const chartData = useMemo(() => {
    return data?.swaps?.swaps?.map(dateMapF) ?? [];
  }, [data]);

  const totalValue = data?.swaps.total || 0;
  const value = formatNumeral(
    totalValue,
    chooseNumeralFormat({
      value: totalValue
    })
  );

  return (
    <SwapsChartStyled.Component>
      <SubChartHeader
        title={'Swaps'}
        titleContent={
          <DropDown
            title={'Total'}
            options={options}
            selectedOption={selectedRow}
            setSelectedOption={setSelectedRow}
            activeOption={activeRow}
            setActiveOption={setActiveRow}
          />
        }
        chartValue={<SubChartValue value={value}/>}
      />

      <SwapsChartStyled.Body>
        <ResponsiveContainer width="98%" height="100%" debounce={1}>
          <AreaChart data={chartData}>
            {Gradients()}
            {Axes({
              data: chartData,
              dataValueKey: 'price'
            })}
            <Tooltip content={CustomTooltip()}/>
            <Area
              name="Swaps"
              type="monotone"
              dataKey="price"
              {...getLineDefaults('url(#colorful)', 'url(#colorful)')}
            />
          </AreaChart>
        </ResponsiveContainer>
      </SwapsChartStyled.Body>
    </SwapsChartStyled.Component>
  );
};
