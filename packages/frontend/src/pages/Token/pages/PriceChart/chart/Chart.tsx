import {
  createChart,
  IChartApi,
  ISeriesApi,
  SeriesDataItemTypeMap
} from 'lightweight-charts';
import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import ResizeObserver, {DOMRect} from 'react-resize-observer';
import {throttle} from 'lodash-es';
import {candleSeriesStyles, ChartStyled, layoutStyles} from './Chart-styled';
import {LoaderPositions} from '../../../../../components/_old/ui/Loader/Loader-styled';
import {Loader} from '../../../../../components/_old/ui/Loader/Loader';

export type TradingViewChartType = {
  close?: number;
  high?: number;
  low?: number;
  open?: number;
  time?: number;
};

export type TradingViewDataType = SeriesDataItemTypeMap['Candlestick'];

interface ChartComponentProps {
  data: TradingViewChartType[];
  height?: number;
  loading?: boolean;
}

//https://tradingview.github.io/lightweight-charts/tutorials/react/simple

export const ChartComponent: FC<ChartComponentProps> = ({
                                                          data,
                                                          height = 300,
                                                          loading
                                                        }) => {
  const [size, setSize] = useState<DOMRect | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const chartSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const dataRef = useRef<TradingViewChartType[] | null>(data);

  /**
   * todo: use "update" method to add new data one-by-one (in loop ?)
   * https://tradingview.github.io/lightweight-charts/docs/api/interfaces/ISeriesApi#update
   */
  const handleDataUpdate = useCallback(() => {
    const series = chartSeriesRef.current;
    const data = dataRef.current;
    if (series && data) {
      series.setData([]);
      series.setData(data as TradingViewDataType[]);
    }
  }, []);

  const handleUpdateSize = useCallback(
    (size: DOMRect, fitContent: boolean = false) => {
      const chart = chartRef.current;
      if (chart && size) {
        chart.applyOptions({width: size.width, height: size.height});
        if (fitContent) {
          chart.timeScale().fitContent();
        }
      }
    },
    []
  );

  useEffect(() => {
    if (size) {
      handleUpdateSize(size);
    }
  }, [size, handleUpdateSize]);

  useEffect(() => {
    const container = containerRef.current;
    const chart = chartRef.current;
    if (container && size && !chart) {
      chartRef.current = createChart(container, {
        ...layoutStyles
      });
      chartSeriesRef.current =
        chartRef.current?.addCandlestickSeries(candleSeriesStyles);
      handleDataUpdate();
      handleUpdateSize(size, true);
    }
  }, [size, handleUpdateSize, handleDataUpdate]);

  useEffect(() => {
    dataRef.current = data;
    handleDataUpdate();
  }, [data, handleDataUpdate]);

  return (
    <ChartStyled.Component ref={wrapperRef} $height={height}>
      <ResizeObserver onResize={throttle((props) => setSize(props), 100)}/>
      <ChartStyled.ChartContainer ref={containerRef}/>
      {loading && (
        <ChartStyled.ChartLoader>
          <Loader position={LoaderPositions.absolute}/>
        </ChartStyled.ChartLoader>
      )}
    </ChartStyled.Component>
  );
};
