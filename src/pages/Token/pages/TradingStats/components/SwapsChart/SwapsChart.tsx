import React from 'react';
import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis} from 'recharts';
import {Gradients} from '../Gradients/Gradients';
import {CustomTooltip} from '../CustomTooltip/CustomTooltip';
import {Axes} from '../Axes/Axes';
import {getLineDefaults} from '../../TradingStats';
import {chooseNumeralFormat, formatNumeral} from '../../../../../../utils/numbers';
import {SubChartHeader} from '../../../../components/SubChart/SubChartHeader/SubChartHeader';
import {SubChartValue} from '../../../../components/SubChart/SubChartValue/SubChartValue';

import {SwapsChartStyled} from './SwapsChart-styled';
// import {dropDown} from '../../../../../../components/_old/ui/Dropdown/DropDown';
import {CurrentCoinData} from '../../../../CoinPage';
import {useFetch} from '../../../../../../hooks';
import { BaseChartResponse } from '../HoldersChart/types';
import { getFormattedDateStr } from '../../../../../../utils/date/date';

/*const [dropDownState, DropDown] = dropDown<number>({
  width: 100,
  wrapperWidth: 64
});*/

export const SwapsChart: React.FC = React.memo(() => {
  const currentCoinData = React.useContext(CurrentCoinData);
  /*const {
    options,
    selected: [selectedRow, setSelectedRow],
    active: [activeRow, setActiveRow]
  } = dropDownState({
    options: [],
    selectedOption: 10
  });*/

  const { data } = useFetch<BaseChartResponse>({
    url: `${import.meta.env.VITE_BACKEND_URL}/token/${currentCoinData?.id}/swaps`,
    withCredentials: false,
    method: 'GET',
  });


  const chartData = React.useMemo(() => {
    return (
      data?.map((point) => ({
          date: getFormattedDateStr(new Date(point.t)),
          trades: point.v,
        })) ?? []
    )
  }, [data]);

  const totalValue = React.useMemo(() => {
    return data?.reduce((p, n) => p + Number.parseInt(n.v, 10), 0) || 0;
  }, [data]);

  const value = React.useMemo(() => {
    return formatNumeral(
      totalValue,
      chooseNumeralFormat({
        value: totalValue
      })
    );
  }, [totalValue]);

  return (
    <SwapsChartStyled.Component>
      <SubChartHeader
        title={'Swaps'}
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
        chartValue={<SubChartValue value={value}/>}
      />

      <SwapsChartStyled.Body>
        <ResponsiveContainer width="98%" height="100%" debounce={1}>
          <AreaChart data={chartData}>
            {Gradients()}
            {Axes({
              data: chartData,
              dataValueKey: 'trades',
              yAxisProps: {
                tickFormat: {
                  formatValue: _ => _
                }
              }
            })}
            <Tooltip content={CustomTooltip({
              valueFormatter: _ => _
            })}/>
            <Area
              name="Swaps"
              type="monotone"
              dataKey="trades"
              {...getLineDefaults('url(#colorful)', 'url(#colorful)')}
            />
          </AreaChart>
        </ResponsiveContainer>
      </SwapsChartStyled.Body>
    </SwapsChartStyled.Component>
  );
});
