import React, {FC} from 'react';
import {Link, Element} from 'react-scroll';
import {CoinPageStyled} from '../../Coin-styled';
import {PriceChart} from '../../pages/PriceChart/PriceChart';
import {Transactions} from '../../pages/Transactions/Transactions';
import {TradingStats} from '../../pages/TradingStats/TradingStats';
import {TokenStats} from '../../pages/TokenStats/TokenStats';
import {PageButton, SubPages} from '../../types';
import {
  AnimatedGradientButton
} from '../../../../components/_old/ui/Buttons/AnimatedGradientButton/AnimatedGradientButton';

export const subPagesConfig: Record<SubPages, PageButton> = {
  [SubPages.PriceChart]: {
    width: 136,
    height: 40,
    label: 'Price Chart'
  },
  [SubPages.Transactions]: {
    width: 136,
    height: 40,
    label: 'Transactions'
  },
  [SubPages.TokenStats]: {
    width: 136,
    height: 40,
    label: 'Token Stats'
  },
  [SubPages.TradingStats]: {
    width: 136,
    height: 40,
    label: 'Trading Stats'
  }
  // [SubPages.Pair]: {
  //   width: 162,
  //   height: 40,
  //   label: 'Trading Pair Stats'
  // },
  // [SubPages.Dex]: {
  //   width: 146,
  //   height: 40,
  //   label: 'Trades on DEXs'
  // },
  // [SubPages.Traders]: {
  //   width: 146,
  //   height: 40,
  //   label: 'Top DEX Traders'
  // },
  // [SubPages.Balances]: {
  //   width: 146,
  //   height: 40,
  //   label: 'Top Balances'
  // },
  // [SubPages.Leaderboard]: {
  //   width: 220,
  //   height: 40,
  //   label: 'Smart Money Leaderboard'
  // }
};

export const SubPage: FC = () => {
  return (
    <>
      <CoinPageStyled.SubPagesButtons>
        {Object.entries(subPagesConfig).map(([key, config]) => (
          <Link key={key} to={key} smooth={true} offset={-20} duration={500}>
            <AnimatedGradientButton width={config.width} height={40}>
              {config.label}
            </AnimatedGradientButton>
          </Link>
        ))}
      </CoinPageStyled.SubPagesButtons>
      <>
        <Element name={SubPages.PriceChart}>
          <PriceChart/>
        </Element>
        <Element name={SubPages.Transactions}>
          <Transactions/>
        </Element>
        <Element name={SubPages.TokenStats}>
          <TokenStats/>
        </Element>
        {/*<Element name={SubPages.TradingStats}>
          <TradingStats/>
        </Element>*/}
      </>
    </>
  );
};
