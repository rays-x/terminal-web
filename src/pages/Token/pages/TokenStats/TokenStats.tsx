import React from 'react';
import {HeaderStyled} from '../../../../components/_old/ui/Header/Header-styled';
import {StackedAreaChart} from './components/StackedAreaChart/StackedAreaChart';
import {TextInfo} from './components/TextInfo/TextInfo';
import {TinyAreaChart} from './components/TinyAreaChart/TinyAreaChart';
import {TokenStatsStyled} from './TokenStats-styled';
import {HeaderVariant} from '../../../../components/_old/ui/Header/types';

export const TokenStats = () => {
  return (
    <TokenStatsStyled.Component>
      <HeaderStyled.Wrapper>
        <HeaderStyled.Text $variant={HeaderVariant.Small}>
          Token Stats
        </HeaderStyled.Text>
      </HeaderStyled.Wrapper>

      <TokenStatsStyled.Grid $colsAmount={10} $height={'auto'}>
        <TokenStatsStyled.GridItem $colSpan={5}>
          <TokenStatsStyled.Card>
            <StackedAreaChart/>
          </TokenStatsStyled.Card>
        </TokenStatsStyled.GridItem>

        <TokenStatsStyled.GridItem $colSpan={3}>
          <TokenStatsStyled.Card $noPadding>
            <TinyAreaChart/>
          </TokenStatsStyled.Card>
        </TokenStatsStyled.GridItem>

        <TokenStatsStyled.GridItem $colSpan={2}>
          <TokenStatsStyled.Card $noPadding>
            <TextInfo/>
          </TokenStatsStyled.Card>
        </TokenStatsStyled.GridItem>
      </TokenStatsStyled.Grid>
    </TokenStatsStyled.Component>
  );
};
