import {throttle} from 'lodash-es';
import React, {useMemo} from 'react';
import {
  Area,
  AreaChart,
  Legend,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import {getLineDefaults} from '../../TradingStats';
import {Axes} from '../Axes/Axes';
import {
  CustomTooltip
} from '../CustomTooltip/CustomTooltip';
import {Gradients} from '../Gradients/Gradients';
import {SubChartValue} from '../../../../components/SubChart/SubChartValue/SubChartValue';
import {
  chooseNumeralFormat,
  formatNumeral
} from '../../../../../../utils/numbers';
import {SubChartHeader} from '../../../../components/SubChart/SubChartHeader/SubChartHeader';
import {SubChartHeaderVariant} from '../../../../components/SubChart/SubChartHeader/SubChartHeader-styled';
import {dateMapF} from '../../../../../../presets/helpers/charts';
import {UsersChartStyled} from './UsersChart-styled';
import {dropDown} from '../../../../../../components/_old/ui/Dropdown/DropDown';

type UsersChartType = {
  date?: Date;
  newUsers?: number;
  oldUsers?: number;
}

type UsersType = {
  total?: number;
  usersChart?: Array<UsersChartType>;
};
const [dropDownState, DropDown] = dropDown<number>({
  width: 100,
  wrapperWidth: 64
});

export interface UsersChartProps {
  coinId: string;
}

export const UsersChart: React.FC<UsersChartProps> = ({coinId}) => {
  const {
    options,
    selected: [selectedRow, setSelectedRow],
    active: [activeRow, setActiveRow]
  } = dropDownState({
    options: [],
    selectedOption: 10
  });

  const data: { users: UsersType, coinId?: string } = {
    users: {
      total: undefined,
      usersChart: []
    }
  }/*useMerge<>(
    QUERY_USERS_CHART,
    SUB_USERS_CHART,
    {
      variables: {coinId},
      skip: !coinId
    }
  )*/;

  const chartData = useMemo(() => {
    return data?.users?.usersChart?.map(dateMapF) ?? [];
  }, [data]);

  const totalValue = data?.users.total || 0;
  const value = formatNumeral(
    totalValue,
    chooseNumeralFormat({
      value: totalValue
    })
  );

  return (
    <UsersChartStyled.Component>
      <SubChartHeader
        $variant={SubChartHeaderVariant.horizontal}
        title={'New / Old Users'}
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
        chartValue={<SubChartValue label={'Total Users:'} value={value}/>}
      />

      <UsersChartStyled.Body>
        <ResponsiveContainer width="99%" height="100%" debounce={1}>
          <AreaChart data={chartData}>
            {Gradients()}
            {Axes({
              data: chartData,
              dataValueKey: ['newUsers', 'oldUsers'],
              yAxisProps: {
                tickFormat: {
                  type: 'number'
                }
              }
            })}
            <Tooltip
              content={CustomTooltip({
                showLegendDot: true,
                type: 'number',
                shouldBeShortened: false
              })}
            />
            <Legend
              content={throttle(
                ({payload}) => (
                  <UsersChartStyled.Legend>
                    {payload?.map((entry, i) => (
                      <UsersChartStyled.LegendItem key={i}>
                        {entry.value}
                      </UsersChartStyled.LegendItem>
                    ))}
                  </UsersChartStyled.Legend>
                ),
                100
              )}
            />
            <Area
              name="Old Users"
              type="monotone"
              dataKey="oldUsers"
              {...getLineDefaults('url(#colorful)', 'url(#colorful)')}
            />
            <Area
              name="New Users"
              type="monotone"
              dataKey="newUsers"
              {...getLineDefaults('#0AEE21', '#0AEE21')}
            />
          </AreaChart>
        </ResponsiveContainer>
      </UsersChartStyled.Body>
    </UsersChartStyled.Component>
  );
};
