import React, {useMemo} from 'react';
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
  getValueChange,
  timeToDateMapF
} from '../../../../../../presets/helpers/charts';
import {TradingVolumeChartStyled} from './TradingVolumeChart-styled';
import {dropDown} from '../../../../../../components/_old/ui/Dropdown/DropDown';

type VolumeChartType = {
  time?: Date;
  value?: number;
}

type VolumeType = {
  total?: number;
  volumeChart?: Array<VolumeChartType>;
}

const [dropDownState, DropDown] = dropDown<number>({
  width: 100,
  wrapperWidth: 64
});

export interface TradingVolumeChartProps {
  coinId: string;
}

export const TradingVolumeChart: React.FC<TradingVolumeChartProps> = ({
                                                                        coinId
                                                                      }) => {
  const {
    options,
    selected: [selectedRow, setSelectedRow],
    active: [activeRow, setActiveRow]
  } = dropDownState({
    options: [],
    selectedOption: 10
  });

  const data: { volumes: VolumeType, coinId?: string } = {
    volumes: {
      total: undefined,
      volumeChart: []
    }
  } /*useMerge<{ volumes: VolumeType }, { coinId: string }>(
    QUERY_VOLUMES_CHART,
    SUB_VOLUMES_CHART,
    {
      variables: {coinId},
      skip: !coinId
    }
  )*/;

  const chartData = useMemo(() => {
    return data?.volumes?.volumeChart?.map(timeToDateMapF) ?? [];
  }, [data]);

  const totalValue = data?.volumes.total || 0;
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
    <TradingVolumeChartStyled.Component>
      <SubChartHeader
        title={'Trading Volume'}
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

      <TradingVolumeChartStyled.Body>
        <ResponsiveContainer width="99%" height="100%" debounce={1}>
          <AreaChart data={chartData}>
            {Gradients()}
            {Axes({
              data: chartData,
              dataValueKey: 'value'
            })}
            <Tooltip content={CustomTooltip({shouldBeShortened: false})}/>
            <Area
              name="Trading Volume"
              type="monotone"
              dataKey="value"
              {...getLineDefaults('#61E9FB', '#66EDFA')}
            />
          </AreaChart>
        </ResponsiveContainer>
      </TradingVolumeChartStyled.Body>
    </TradingVolumeChartStyled.Component>
  );
};
