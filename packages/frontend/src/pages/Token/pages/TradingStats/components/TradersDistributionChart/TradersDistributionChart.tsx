import {throttle} from 'lodash-es';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import {ResponsiveContainer, Bar, BarChart, Tooltip, Cell} from 'recharts';
import {Axes} from '../Axes/Axes';
import {CustomTooltip} from '../CustomTooltip/CustomTooltip';
import {Gradients} from '../Gradients/Gradients';
import {SubChartHeader} from '../../../../components/SubChart/SubChartHeader/SubChartHeader';
import {
  formatNumeral,
  NUMERAL_FORMAT_NUM
} from '../../../../../../utils/numbers';
import {TradersDistributionChartStyled} from './TradersDistributionChart-styled';

type TdvType = {
  tradeAmount?: number;
  userCount?: number;
}


export interface TradersDistributionChartProps {
  coinId: string;
}

export const TradersDistributionChart: React.FC<TradersDistributionChartProps> = ({coinId}) => {
  const barRef = useRef<any>();
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [activeBarId, setActiveBarId] = useState<number | null>(null);

  const data: {
    tdv: TdvType[]
  } = {
    tdv: []
  } /*useMerge<{ tdv: TdvType[] }, { coinId: string }>(
    QUERY_TRADERS_DIST_BY_VOLUME_CHART,
    SUB_TRADERS_DIST_BY_VOLUME_CHART,
    {
      variables: {coinId},
      skip: !coinId
    }
  )*/;

  const chartData = useMemo(() => {
    return (data?.tdv || []).map((item) => ({
      ...item,
      tradeAmount: formatNumeral(item.tradeAmount, NUMERAL_FORMAT_NUM)
    }));
  }, [data]);

  const handleBarChartMouseMove = throttle(
    ({isTooltipActive, activeTooltipIndex}) => {
      if (isTooltipActive) {
        setActiveBarId(activeTooltipIndex);
      } else {
        setActiveBarId(null);
      }
    },
    10
  );

  const BarCell = useCallback(() => {
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

  useEffect(() => {
    if (activeBarId) {
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
};
