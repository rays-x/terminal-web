import React from 'react';
import {HeaderStyled} from '../../../../components/_old/ui/Header/Header-styled';
import {HoldersChart} from './components/HoldersChart/HoldersChart';
import {LiquidityChart} from './components/LiquidityChart/LiquidityChart';
import {SwapsChart} from './components/SwapsChart/SwapsChart';
import {TradersDistributionChart} from './components/TradersDistributionChart/TradersDistributionChart';
import {TradesVolumeChart} from './components/TradesVolumeChart/TradesVolumeChart';
import {TradingVolumeChart} from './components/TradingVolumeChart/TradingVolumeChart';
import {UsersChart} from './components/UsersChart/UsersChart';
import {TradingStatsStyled} from './TradingStats-styled';
import {HeaderVariant} from '../../../../components/_old/ui/Header/types';

export const getLineDefaults = (fillColor, strokeColor) => {
  return {
    stroke: strokeColor,
    fill: fillColor,
    fillOpacity: 0.2,
    strokeWidth: 2,
    dot: false,
    activeDot: {
      r: 6,
      fill: '#fff',
      stroke: strokeColor,
      strokeWidth: 3
    }
  };
};

export const data = [
  {
    date: '15 Nov',
    data1: 1000,
    data2: 500
  },
  {
    date: '16 Nov',
    data1: 2000,
    data2: 800
  },
  {
    date: '17 Nov',
    data1: 1500,
    data2: 900
  },
  {
    date: '18 Nov',
    data1: 3500,
    data2: 800
  },
  {
    date: '19 Nov',
    data1: 2900,
    data2: 900
  },
  {
    date: '20 Nov',
    data1: 4000,
    data2: 800
  },
  {
    date: '21 Nov',
    data1: 3500,
    data2: 1900
  },
  {
    date: '22 Nov',
    data1: 4800,
    data2: 2900
  },
  {
    date: '23 Nov',
    data1: 4900,
    data2: 2800
  }
];

export const barData = [
  {
    name: '5000',
    data1: 1500
  },
  {
    name: '15000',
    data1: 3500
  },
  {
    name: '30000',
    data1: 2900
  },
  {
    name: '50000',
    data1: 4000
  },
  {
    name: '70000',
    data1: 3500
  },
  {
    name: '80000',
    data1: 4800
  },
  {
    name: '100000',
    data1: 4900
  },
  {
    name: '120000',
    data1: 4700
  },
  {
    name: '140000',
    data1: 4100
  },
  {
    name: '160000',
    data1: 4000
  },
  {
    name: '180000',
    data1: 3900
  },
  {
    name: '200000',
    data1: 2900
  },
  {
    name: '2100000',
    data1: 1900
  },
  {
    name: '2200000',
    data1: 2900
  },
  {
    name: '2400000',
    data1: 3900
  }
];

export const TradingStats = React.memo(() => {

  return (
    <TradingStatsStyled.Component>
      <HeaderStyled.Wrapper>
        <HeaderStyled.Text $variant={HeaderVariant.Small}>
          Trading Stats
        </HeaderStyled.Text>
      </HeaderStyled.Wrapper>

      <TradingStatsStyled.Grid $colsAmount={4} $height={'auto'}>
        <TradingStatsStyled.GridItem $colSpan={1}>
          <TradingStatsStyled.Card>
            <SwapsChart/>
          </TradingStatsStyled.Card>
        </TradingStatsStyled.GridItem>
        <TradingStatsStyled.GridItem $colSpan={1}>
          <TradingStatsStyled.Card>
            <HoldersChart/>
          </TradingStatsStyled.Card>
        </TradingStatsStyled.GridItem>
        <TradingStatsStyled.GridItem $colSpan={2}>
          <TradingStatsStyled.Card>
            <UsersChart/>
          </TradingStatsStyled.Card>
        </TradingStatsStyled.GridItem>

        <TradingStatsStyled.GridItem $colSpan={2}>
          <TradingStatsStyled.Card>
            <LiquidityChart/>
          </TradingStatsStyled.Card>
        </TradingStatsStyled.GridItem>
        <TradingStatsStyled.GridItem $colSpan={2}>
          <TradingStatsStyled.Card>
            <TradingVolumeChart/>
          </TradingStatsStyled.Card>
        </TradingStatsStyled.GridItem>

        <TradingStatsStyled.GridItem $colSpan={2}>
          <TradingStatsStyled.Card>
            <TradersDistributionChart/>
          </TradingStatsStyled.Card>
        </TradingStatsStyled.GridItem>
        <TradingStatsStyled.GridItem $colSpan={2}>
          <TradingStatsStyled.Card>
            <TradesVolumeChart/>
          </TradingStatsStyled.Card>
        </TradingStatsStyled.GridItem>
      </TradingStatsStyled.Grid>
    </TradingStatsStyled.Component>
  );
});
