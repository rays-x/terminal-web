import React, {useMemo} from 'react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip
} from 'recharts';
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
import {HoldersChartStyled} from './HoldersChart-styled';
import {dropDown} from '../../../../../../components/_old/ui/Dropdown/DropDown';

const [dropDownState, DropDown] = dropDown<number>({
  width: 100,
  wrapperWidth: 64
});

export interface HoldersChartProps {
  coinId: string;
}

export const HoldersChart: React.FC<HoldersChartProps> = ({coinId}) => {
  const {
    options,
    selected: [selectedRow, setSelectedRow],
    active: [activeRow, setActiveRow]
  } = dropDownState({
    options: [],
    selectedOption: 10
  });

  const data = {
    holders: {
      holders: [],
      total: undefined
    },
    coinId: undefined
  }/*useMerge<{ holders: HolderBlockType }, { coinId: string }>(
    QUERY_HOLDERS_CHART,
    SUB_HOLDERS_CHART,
    {
      variables: {coinId},
      skip: !coinId
    }
  )*/;

  const chartData = useMemo(() => {
    return data?.holders?.holders?.map(dateMapF) ?? [];
  }, [data]);

  const totalValue = data?.holders?.total || 0;
  const value = formatNumeral(
    totalValue,
    chooseNumeralFormat({
      value: totalValue
    })
  );

  return (
    <HoldersChartStyled.Component>
      <SubChartHeader
        title={'Holders'}
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

      <HoldersChartStyled.Body>
        <ResponsiveContainer width="98%" height="100%" debounce={1}>
          <AreaChart data={chartData}>
            <CartesianGrid
              stroke="rgba(255, 255, 255, 0.06)"
              vertical={false}
            />
            {Gradients()}
            {Axes({data: chartData})}
            <Tooltip content={CustomTooltip()}/>
            <Area
              name="Holders"
              type="monotone"
              dataKey="value"
              {...getLineDefaults('url(#orangeFill)', 'url(#orangeStroke)')}
            />
          </AreaChart>
        </ResponsiveContainer>
      </HoldersChartStyled.Body>
    </HoldersChartStyled.Component>
  );
};
