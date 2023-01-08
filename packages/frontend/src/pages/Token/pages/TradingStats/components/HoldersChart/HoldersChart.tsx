import React from 'react';
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
// import {dropDown} from '../../../../../../components/_old/ui/Dropdown/DropDown';
import {CurrentCoinData} from '../../../../CoinPage';
import {useLazyFetch} from '../../../../../../hooks/useFetch';
import {StatsHoldersResponse} from '../../../../types';
import {get, takeRight} from 'lodash';
import {useFetch} from '../../../../../../hooks';
import {TokenHoldersResponse} from '../../../../../../types/api/TokenHoldersResponse';

/*const [dropDownState, DropDown] = dropDown<number>({
  width: 100,
  wrapperWidth: 64
});*/

export const HoldersChart: React.FC = React.memo(() => {
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

  const chartData = React.useMemo(() => {
    return data?.items.map(dateMapF).reverse() ?? [];
  }, [data]);

  const totalValue = get(data, 'items.0.count', 0);
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

      <HoldersChartStyled.Body>
        <ResponsiveContainer width="98%" height="100%" debounce={1}>
          <AreaChart data={chartData}>
            <CartesianGrid
              stroke="rgba(255, 255, 255, 0.06)"
              vertical={false}
            />
            {Gradients()}
            {Axes({
              data: chartData,
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
              name="Holders"
              type="monotone"
              dataKey="count"
              {...getLineDefaults('url(#orangeFill)', 'url(#orangeStroke)')}
            />
          </AreaChart>
        </ResponsiveContainer>
      </HoldersChartStyled.Body>
    </HoldersChartStyled.Component>
  );
});
