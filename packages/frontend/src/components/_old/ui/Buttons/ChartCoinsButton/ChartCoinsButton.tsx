import {FC} from 'react';
import {colors} from '../../../../../presets/base';
import {ChartCoinButtonStyled} from './ChartCoinsButton-styled';
import CoinPairShare from '../../../../../assets/icons/CoinPairShare';

export interface ChartCoinsButtonProps {
  readonly onClick: () => void;
  isSelected: boolean;
  coinsPair: {
    firstCoin: {
      label: string;
      src: string;
    };
    secondCoin: {
      label: string;
      src: string;
    };
  };
}

export const ChartCoinsButton: FC<ChartCoinsButtonProps> = ({
                                                              onClick,
                                                              isSelected,
                                                              coinsPair
                                                            }) => {
  return (
    <ChartCoinButtonStyled.Component onClick={onClick} $isSelected={isSelected}>
      <>
        <ChartCoinButtonStyled.CoinImage
          style={{marginRight: '-10px', zIndex: '1'}}
          src={coinsPair.firstCoin.src}
        />
        <ChartCoinButtonStyled.CoinImage src={coinsPair.secondCoin.src}/>
      </>
      <ChartCoinButtonStyled.Label $isSelected={isSelected}>
        {coinsPair.firstCoin.label}/{coinsPair.secondCoin.label}
      </ChartCoinButtonStyled.Label>
      <CoinPairShare
        color={!isSelected ? colors.text.secondary : '#161824'}
      />
    </ChartCoinButtonStyled.Component>
  );
};
