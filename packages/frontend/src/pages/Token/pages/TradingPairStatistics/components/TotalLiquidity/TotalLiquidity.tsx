import React, {FC, useContext} from 'react';
import Icons from '../../../../../../assets';
import {TotalLiquidityStyled} from './TotalLiquidity-styled';
import GaugeIcon from '../../../../../../assets/icons/Gauge';
import GaugeArrow from '../../../../../../assets/icons/GaugeArrow';
import {CurrentCoinData} from '../../../../CoinPage';
import TotalLiquidityIcon from '../../../../../../assets/icons/TotalLiquidityIcon.png';
import millify from 'millify';

interface TotalLiquidityProps {
  liquidity: number;
}

export const TotalLiquidity: FC<TotalLiquidityProps> = React.memo(({liquidity = 0}) => {
  return (
    <TotalLiquidityStyled.Wrapper>
      <TotalLiquidityStyled.Image src={TotalLiquidityIcon} alt=""/>
      <TotalLiquidityStyled.Title>Total Liquidity of the Contract</TotalLiquidityStyled.Title>
      <TotalLiquidityStyled.Title>{millify(liquidity, {
        precision: 2
      })}</TotalLiquidityStyled.Title>
    </TotalLiquidityStyled.Wrapper>
  );
});
