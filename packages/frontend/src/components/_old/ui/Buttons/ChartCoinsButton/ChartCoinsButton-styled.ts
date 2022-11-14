import styled, { css } from 'styled-components';
import { animated } from '@react-spring/web';
import { radius } from '../../../../../presets/base';
import { mixins } from '../../../../../presets/mixins';

export interface ChartCoinsButtonProps {
  $isSelected?: boolean;
}

export const Component = styled.button<ChartCoinsButtonProps>`
  ${mixins.buttonReset}
  border-radius: ${radius['12']};
  padding: 6px 10px;
  display: flex;
  align-items: center;
  gap: 3px;
  min-width: 147px;
  transition: background-color 0.3s;
  ${({ $isSelected }) =>
    $isSelected
      ? css`
          background-color: white;
        `
      : css`
          background-color: #353742;
        `}
`;

export const CoinImage = styled(animated.img)<ChartCoinsButtonProps>`
  ${mixins.size(21)}
  border-radius:${radius.circle};
  transition: border 0.3s;
`;

export const Label = styled.div<ChartCoinsButtonProps>`
  font-style: normal;
  transition: color 0.3s;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  ${({ $isSelected }) =>
    !$isSelected
      ? css`
          color: white;
        `
      : css`
          color: #161824;
        `}
`;

export const ChartCoinButtonStyled = {
  Component,
  CoinImage,
  Label
};
