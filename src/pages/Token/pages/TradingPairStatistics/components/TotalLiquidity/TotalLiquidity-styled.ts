import styled, {css} from 'styled-components';
import {mixins} from '../../../../../../presets/mixins';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${mixins.isDesktopSmall(css`
    gap: 5px;
  `)}
  padding: 0;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
`;

export const Image = styled.img`
  width: 137px;
  height: 71px;
  margin-bottom: 14px;
  display: none;
  @media (min-width: 1600px) {
    display: block;
  }
`;

const statusButton = css`
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  color: #ffffff;
  width: 66px;
  height: 32px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

export const BuyButton = styled.div`
  ${statusButton};
  background: #01ac45;
`;

export const SellButton = styled.div`
  ${statusButton};
  background: #dc2a4a;
`;

export const Component = styled.div`
  ${mixins.isDesktopSmall(css`
    display: none;
  `)}
  margin-left: -92px;
  position: relative;
  width: 184px;
`;

export const Title = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 17px;
`;

export const TotalLiquidityStyled = {
  Wrapper,
  Image,
  Component,
  Title,
  Buttons,
  BuyButton,
  SellButton
};
