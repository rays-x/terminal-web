import React, {FC} from 'react';
import {CoinPageStyled} from '../../../Coin-styled';
import {TypographyArrow} from '../../../../../components/_old/ui/Typography/Typography';
import {ColorVariant} from '../../../../../components/_old/ui/Typography/Typography-styled';

export interface CoinPriceChangeProps {
  title: string;
  value: number;
}

export const CoinPriceChange: FC<CoinPriceChangeProps> = ({title, value}) => {
  return (
    <CoinPageStyled.CoinPriceChangeGroup>
      <CoinPageStyled.CoinPriceChangeGroupTitle>
        {title}
      </CoinPageStyled.CoinPriceChangeGroupTitle>
      <TypographyArrow
        lineHeight={18}
        fontSize={14}
        color={value > 0 ? ColorVariant.rise : ColorVariant.fall}
      >
        {value?.toFixed(3)}%
      </TypographyArrow>
    </CoinPageStyled.CoinPriceChangeGroup>
  );
};
