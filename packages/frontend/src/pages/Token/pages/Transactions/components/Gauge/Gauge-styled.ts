import styled, {css} from 'styled-components';
import {mixins} from '../../../../../../presets/mixins';
import {BuySellPressureType} from './Gauge';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${mixins.isDesktopSmall(css`
    flex-direction: row;
    justify-content: flex-start;
    padding-left: 10px;
    gap: 20px;
  `)}
  padding: 0;
  align-items: center;
  justify-content: center;
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
  line-height: 27px;
  text-align: center;
  color: #ffffff;
`;
export const SubTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 45px;
  text-align: center;
  color: #ffffff;
  @media (min-width: 768px) {
    font-size: 27px;
  }
`;
export const SubSubTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 29px;
  line-height: 29px;
  text-align: center;
  color: #ffffff;
  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

export interface GaugeArrowProps extends Pick<BuySellPressureType, 'status'> {
}

export const Arrow = styled.div<GaugeArrowProps>`
  position: absolute;
  bottom: 20%;
  left: 36%;
  transform-origin: 100% 50%;
  ${({status}) =>
          css`
            transform: rotate(${status}deg);
          `}
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 17px;
`;

export const GaugeStyled = {
  Wrapper,
  Component,
  Arrow,
  Title,
  SubTitle,
  SubSubTitle,
  Buttons,
  BuyButton,
  SellButton
};
