import {FC} from 'react';
import {ChartCoinButtonStyled} from './ChartCoinsButton-styled';

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
        {
          coinsPair.firstCoin.src
            ? (
              <ChartCoinButtonStyled.CoinImage
                style={
                  coinsPair.secondCoin.src
                    ? {marginRight: '-10px', zIndex: '1'}
                    : {}
                }
                src={coinsPair.firstCoin.src}
              />
            )
            : null
        }
        {
          coinsPair.secondCoin.src
            ? (
              <ChartCoinButtonStyled.CoinImage src={coinsPair.secondCoin.src}/>
            )
            : null
        }
      </>
      <ChartCoinButtonStyled.Label $isSelected={isSelected}>
        {coinsPair.name}
      </ChartCoinButtonStyled.Label>
      {/*<CoinPairShare
        color={!isSelected ? colors.text.secondary : '#161824'}
      />*/}
    </ChartCoinButtonStyled.Component>
  );
};
