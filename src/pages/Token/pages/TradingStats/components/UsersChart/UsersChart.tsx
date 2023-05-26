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
import { UniqueReceiversResponse } from '../HoldersChart/types';
import { BQ_API_KEY } from '../../../../../../constants';
import { gqlQuery } from '../HoldersChart/constants';
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

  const fromDate = useMemo(
    () => Date.now() - 14 * 24 * 60 * 60 * 1000,
    [],
  );
  const toDate = useMemo(() => Date.now(), []);

  const { data } = useFetch<UniqueReceiversResponse>({
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
        dateFormat: '%Y-%m-%d',
        network: currentCoinData?.platforms[0].blockchain.bqSlug,
        token: currentCoinData?.platforms[0].address,
      },
    },
  })

  const chartData = useMemo(() => {
    const oldUsers = data?.data?.ethereum?.transfers ?? [];
    const newUsers = oldUsers.reduce((prev, {
      date: { date },
      count
    }) => {
      const prevDate = addDays(new Date(date), -1).getTime();

      const foundPrevOldUsers = oldUsers.find(({date: { date: d }}) => new Date(d).getTime() === prevDate);

      const replaceCount = foundPrevOldUsers ? count - foundPrevOldUsers.count : 0;
      return [...prev, {date, count: replaceCount}];
    }, []);
    return Array.from({length: oldUsers.length}).map((_, i) => dateMapF({
      date: get(oldUsers, `${i}.date.date`, undefined),
      oldUsers: get(oldUsers, `${i - 1}.count`, 0),
      newUsers: get(newUsers, `${i}.count`, 0)
    })).slice(1);
  }, [data]);

  const totalValue = Number.parseInt(data?.data?.ethereum?.transfers[0].count || '0', 10);
  
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
