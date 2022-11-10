import React, {FC, useContext, useMemo, useState} from 'react';
import {CurrentCoinData} from '../../CoinPage';
import {PriceChartStyled} from './PriceChert-styled';
import {ChartComponent} from './chart/Chart';
import {ChartCoinsButton} from '../../../../components/_old/ui/Buttons/ChartCoinsButton/ChartCoinsButton';

const USDT = '/icons/usdt.svg';
const WBNB = '/icons/wbnb.svg';
const BUSD = '/icons/busd.svg';
import {useAdaptiveTriggers} from '../../../../hooks/useAdaptiveTrigger';

enum VersusOhlcEnum {
  Bch = 'BCH',
  Bnb = 'BNB',
  Usd = 'USD'
}

type TradingViewChartInput = {
  mainCoin: string;
  versusCurrency?: VersusOhlcEnum;
};

type TradingViewChartType = {
  close?: number;
  high?: number;
  low?: number;
  open?: number;
  time?: number;
}

type OhlcDefaultType = { coinId: string; label: string; icon: string };

const ohlcDefaults: Record<VersusOhlcEnum, OhlcDefaultType> = {
  [VersusOhlcEnum.Bch]: {
    coinId: 'binance-usd',
    label: 'BUSD',
    icon: BUSD
  },
  [VersusOhlcEnum.Bnb]: {
    coinId: 'binancecoin',
    label: 'WBNB',
    icon: WBNB
  },
  [VersusOhlcEnum.Usd]: {
    coinId: 'tether',
    label: 'USDT',
    icon: USDT
  }
};

const ohlcDefaultsArray: (OhlcDefaultType & {
  id: keyof typeof ohlcDefaults;
})[] = Object.entries(ohlcDefaults).map(([key, val]) => ({
  id: key as VersusOhlcEnum,
  ...val
}));

export const PriceChart: FC = () => {
  const currentCoinData = useContext(CurrentCoinData);
  const currentCoinDataId = currentCoinData?.id ?? '';

  const compareButtons = useMemo(() => {
    if (!currentCoinDataId) return ohlcDefaultsArray;
    return ohlcDefaultsArray.filter(
      (item) => item.coinId !== currentCoinDataId
    );
  }, [currentCoinDataId]);

  const [selectedVersusCurrency, setSelectedVersusCurrency] =
    useState<VersusOhlcEnum>(compareButtons[0].id);

  const {data, loading} = {
    loading: false,
    data: {
      tradingViewChart: []
    }
  } /*useMerge<{ tradingViewChart: TradingViewChartType[] },
    { input: TradingViewChartInput }>(QUERY_TRADING_VIEW_CHART, SUB_TRADING_VIEW_CHART, {
    variables: {
      input: {
        mainCoin: currentCoinDataId,
        versusCurrency: selectedVersusCurrency
      }
    },
    skip: !currentCoinDataId || !selectedVersusCurrency
  })*/;

  const chartData = data?.tradingViewChart || [];
  const chartDataLoading = loading;

  const {isMobile} = useAdaptiveTriggers({});

  return (
    <PriceChartStyled.Container>
      <PriceChartStyled.GraphContainer>
        <PriceChartStyled.CoinPairs>
          {compareButtons.map((btn) => (
            <ChartCoinsButton
              key={btn.id}
              isSelected={selectedVersusCurrency === btn.id}
              coinsPair={{
                firstCoin: {
                  label: currentCoinData?.index?.toUpperCase() || '',
                  src: currentCoinData?.image || ''
                },
                secondCoin: {
                  label: btn.label,
                  src: btn.icon
                }
              }}
              onClick={() => setSelectedVersusCurrency(btn.id)}
            />
          ))}
        </PriceChartStyled.CoinPairs>
        <ChartComponent data={chartData} loading={chartDataLoading}/>
      </PriceChartStyled.GraphContainer>
      {!isMobile && <PriceChartStyled.CurrentCoin/>}
    </PriceChartStyled.Container>
  );
};
