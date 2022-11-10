import React, {useMemo} from 'react';
import {Area, AreaChart, ResponsiveContainer, Tooltip} from 'recharts';
import {getLineDefaults} from '../../TradingStats';
import {Axes} from '../Axes/Axes';
import {CustomTooltip} from '../CustomTooltip/CustomTooltip';
import {Gradients} from '../Gradients/Gradients';
import {SubChartHeader} from '../../../../components/SubChart/SubChartHeader/SubChartHeader';
import {
  SubChartValue
} from '../../../../components/SubChart/SubChartValue/SubChartValue';
import {
  chooseNumeralFormat,
  formatNumeral
} from '../../../../../../utils/numbers';
import {
  dateMapF,
  getValueChange
} from '../../../../../../presets/helpers/charts';
import {LiquidityChartStyled} from './LiquidityChart-styled';
import {dropDown} from '../../../../../../components/_old/ui/Dropdown/DropDown';

type LiquidityChartType = {
  date?: Date;
  value?: number;
}

type LiquidityType = {
  liquidityChart?: LiquidityChartType;
  total?: number;
}

const [dropDownState, DropDown] = dropDown<number>({
  width: 100,
  wrapperWidth: 64
});

export interface LiquidityChartProps {
  coinId: string;
}

export const LiquidityChart: React.FC<LiquidityChartProps> = ({coinId}) => {
  const {
    options,
    selected: [selectedRow, setSelectedRow],
    active: [activeRow, setActiveRow]
  } = dropDownState({
    options: [],
    selectedOption: 10
  });

  const data = {
    liquidity: {
      liquidityChart: [],
      total: undefined
    }
  }/*useMerge<{ liquidity: LiquidityType }, { coinId: string }>(
    QUERY_LIQUIDITY_CHART,
    SUB_LIQUIDITY_CHART,
    {
      variables: {coinId},
      skip: !coinId
    }
  )*/;

  const chartData = useMemo(() => {
    return data?.liquidity?.liquidityChart?.map(dateMapF) ?? [];
  }, [data]);

  const totalValue = data?.liquidity.total || 0;
  const value = formatNumeral(
    totalValue,
    chooseNumeralFormat({
      value: totalValue,
      type: 'currency'
    })
  );

  const valueChange = useMemo(() => {
    return getValueChange(chartData);
  }, [chartData]);

  return (
    <LiquidityChartStyled.Component>
      <SubChartHeader
        title={'Liquidity'}
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
              dataKey="value"
              {...getLineDefaults('#61E9FB', '#66EDFA')}
            />
          </AreaChart>
        </ResponsiveContainer>
      </LiquidityChartStyled.Body>
    </LiquidityChartStyled.Component>
  );
};
