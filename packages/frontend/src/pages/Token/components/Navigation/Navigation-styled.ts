import styled, { css } from 'styled-components';
import { radius, breakpoints } from '../../../../presets/base';
import { mixins } from '../../../../presets/mixins';

export const Component = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const UserGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

export const Network = styled.button`
  ${mixins.buttonReset}
  margin-right: auto;
  width: 168px;
  height: 40px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  background: rgba(240, 185, 11, 0.27);
  border: 1px solid rgba(240, 185, 11, 0.32);
  box-sizing: border-box;
  border-radius: ${radius['12']};
  div {
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: #ffffff;
  }
`;

interface BurgerProps {
  burgerOpen: boolean;
}

export const Burger = styled.div<BurgerProps>`
  @media (min-width: ${breakpoints.width['tabletMin']}) {
    display: none;
  }
  width: 30px;
  height: 20px;
  position: relative;
  cursor: pointer;
  span {
    padding: 0;
    width: 26px;
    height: 2.6px;
    background-color: #27e55c;
    display: block;
    border-radius: 20px;
    transition: all 0.4s ease-in-out;
    position: absolute;
  }
  span:nth-child(1) {
    top: 0;
  }
  span:nth-child(2),
  span:nth-child(3) {
    top: 7px;
  }
  span:nth-child(4) {
    bottom: 3px;
  }

  ${({ burgerOpen }) =>
    burgerOpen &&
    css`
      span:nth-child(1) {
        transform: translateX(40px);
        background-color: transparent;
      }
      span:nth-child(2) {
        transform: rotate(45deg);
      }
      span:nth-child(3) {
        transform: rotate(-45deg);
      }
      span:nth-child(4) {
        transform: translateX(-40px);
        background-color: transparent;
      }
    `}
`;

export const NavigationStyled = {
  Component,
  UserGroup,
  Network,
  Burger
};
