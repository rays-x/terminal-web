import React from 'react';
import {throttle} from 'lodash-es';
import {Bar, BarChart, Cell, ResponsiveContainer, Tooltip} from 'recharts';
import {Axes} from '../Axes/Axes';
import {CustomTooltip} from '../CustomTooltip/CustomTooltip';
import {Gradients} from '../Gradients/Gradients';
import {SubChartHeader} from '../../../../components/SubChart/SubChartHeader/SubChartHeader';
import {formatNumeral, NUMERAL_FORMAT_NUM} from '../../../../../../utils/numbers';
import {TradersDistributionChartStyled} from './TradersDistributionChart-styled';
import {CurrentCoinData} from '../../../../CoinPage';
import {toFixedToken} from '../../../../../../utils/diff';
import {useFetch} from '../../../../../../hooks';
import {TokenTradersResponse} from '../../../../../../types/api/TokenTradersResponse';

export const TradersDistributionChart: React.FC = React.memo(() => {
  const currentCoinData = React.useContext(CurrentCoinData);

  const {data, loading} = useFetch<TokenTradersResponse>({
    url: `${import.meta.env.VITE_BACKEND_URL}/token/${currentCoinData?.id}/traders`,
    withCredentials: false
  });
  const barRef = React.useRef<any>();
  const [tooltipPosition, setTooltipPosition] = React.useState<{
    x: number;
    y: number;
  } | null>(null);
  const [activeBarId, setActiveBarId] = React.useState<number | null>(null);

  const chartData = React.useMemo(() => {
    return (data?.items.shift()?.items || []).reverse().map((item) => ({
      userCount: item.userCount,
      tradeAmount: formatNumeral(toFixedToken(item.tradeAmount, 8), NUMERAL_FORMAT_NUM)
    }));
  }, [data]);

  const handleBarChartMouseMove = throttle(
    ({isTooltipActive, activeTooltipIndex}) => {
      if(isTooltipActive) {
        setActiveBarId(activeTooltipIndex);
      } else {
        setActiveBarId(null);
      }
    },
    10
  );

  const BarCell = React.useCallback(() => {
    return chartData.map((_, index) => (
      <Cell
        key={index}
        fill={
          activeBarId === index ?? activeBarId
            ? 'url(#barBlueActive)'
            : 'url(#barBlue)'
        }
      />
    ));
  }, [chartData, activeBarId]);

  React.useEffect(() => {
    if(activeBarId) {
      const {x, y} = barRef.current?.state?.curData[activeBarId] || {};
      setTooltipPosition({x, y});
    }
  }, [activeBarId]);

  return (
    <TradersDistributionChartStyled.Component>
      <SubChartHeader title={'Traders Distribution by Volume'}/>

      <TradersDistributionChartStyled.Body>
        <ResponsiveContainer width="99%" height="100%" debounce={1}>
          <BarChart data={chartData} onMouseMove={handleBarChartMouseMove}>
            {Gradients()}
            {Axes({
              data: chartData,
              dataValueKey: 'userCount',
              xAxisProps: {
                dataKey: 'tradeAmount'
              },
              yAxisProps: {
                tickFormat: {
                  type: 'number'
                }
              }
            })}
            <Tooltip
              {...(tooltipPosition && {
                position: {
                  x: tooltipPosition.x - 15,
                  y: tooltipPosition.y - 55
                }
              })}
              cursor={false}
              content={CustomTooltip({
                type: 'number',
                shouldBeShortened: false,
                showValueLabel: true,
                labelFormatter: () => 'Traders:'
              })}
            />

            <Bar
              ref={barRef}
              name="Traders Distribution by Volume"
              dataKey="userCount"
              fill="url(#barBlue)"
              radius={[8, 8, 8, 8]}
              barSize={25}
            >
              {BarCell()}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </TradersDistributionChartStyled.Body>
    </TradersDistributionChartStyled.Component>
  );
});
