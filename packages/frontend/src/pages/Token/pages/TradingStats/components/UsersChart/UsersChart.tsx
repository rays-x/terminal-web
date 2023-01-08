import {throttle} from 'lodash-es';
import React, {useMemo} from 'react';
import {Area, AreaChart, Legend, ResponsiveContainer, Tooltip} from 'recharts';
import {getLineDefaults} from '../../TradingStats';
import {Axes} from '../Axes/Axes';
import {CustomTooltip} from '../CustomTooltip/CustomTooltip';
import {Gradients} from '../Gradients/Gradients';
import {SubChartValue} from '../../../../components/SubChart/SubChartValue/SubChartValue';
import {chooseNumeralFormat, formatNumeral} from '../../../../../../utils/numbers';
import {SubChartHeader} from '../../../../components/SubChart/SubChartHeader/SubChartHeader';
import {SubChartHeaderVariant} from '../../../../components/SubChart/SubChartHeader/SubChartHeader-styled';
import {dateMapF} from '../../../../../../presets/helpers/charts';
import {UsersChartStyled} from './UsersChart-styled';
// import {dropDown} from '../../../../../../components/_old/ui/Dropdown/DropDown';
import {CurrentCoinData} from '../../../../CoinPage';
import {get} from 'lodash';
import {addDays} from 'date-fns';
import {useFetch} from '../../../../../../hooks';
import {TokenHoldersResponse} from '../../../../../../types/api/TokenHoldersResponse';
/*const [dropDownState, DropDown] = dropDown<number>({
  width: 100,
  wrapperWidth: 64
});*/

export const UsersChart: React.FC = React.memo(() => {
  /*const {
  options,
  selected: [selectedRow, setSelectedRow],
  active: [activeRow, setActiveRow]
} = dropDownState({
  options: [],
  selectedOption: 10
});*/
  const currentCoinData = React.useContext(CurrentCoinData);
  const {data, loading} = useFetch<TokenHoldersResponse>({
    url: `${import.meta.env.VITE_BACKEND_URL}/token/${currentCoinData?.id}/holders`,
    withCredentials: false
  });

  const chartData = useMemo(() => {
    const oldUsers = data?.items.reverse() ?? [];
    const newUsers = oldUsers.reduce((prev, {
      date,
      count
    }) => {
      const prevDate = addDays(new Date(date), -1).toISOString();
      const foundPrevOldUsers = oldUsers.find(({date}) => date === prevDate);
      const replaceCount = foundPrevOldUsers ? count - foundPrevOldUsers.count : 0;
      return [...prev, {date, count: replaceCount}];
    }, []);
    return Array.from({length: oldUsers.length}).map((_, i) => dateMapF({
      date: get(oldUsers, `${i}.date`, undefined),
      oldUsers: get(oldUsers, `${i - 1}.count`, 0),
      newUsers: get(newUsers, `${i}.count`, 0)
    })).slice(1);
  }, [data]);

  const totalValue = React.useMemo(() => {
    const users = data?.items.reverse() ?? [];
    return get(users, '0.count', 0);
  }, [data]);
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
});
