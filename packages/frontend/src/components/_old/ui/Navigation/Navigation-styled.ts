import styled, {css} from 'styled-components';
import {radius, breakpoints} from '../../../../presets/base';
import {mixins} from '../../../../presets/mixins';
import {rgba} from 'polished';

export const Component = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const UserGroup = styled.div`
  display: none;
  align-items: center;
  gap: 18px;
  @media (min-width: 768px) {
    display: flex;
  }
`;

export const NetworkGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  height: 42px;
`;

export const NetworkButton = styled.div<{
  borderColor?: string
  selected?: boolean
  logo?: string
  soon?: boolean
}>`
  ${({borderColor = 'rgba(255, 255, 255, 0.32)', selected, logo}) => {
    return selected ? (logo ? css`
      background: ${rgba(borderColor, 0.3)};
      border: 1px solid ${borderColor};
    ` : css`
      margin: 1px;
      background: linear-gradient(95.5deg, #27E65C 0.5%, #587BFF 50.22%, #B518FF 97.9%);
    `) : css`
      border: 1px solid ${borderColor};
    `;
  }}
  ${({logo}) => {
    return logo ? css`
      &::before {
        content: '';
        display: block;
        width: 24px;
        height: 24px;
        background: url(${logo}) no-repeat;
        background-size: contain;
        margin-left: -2px;
      }
    ` : undefined;
  }}
  display: flex;
  align-items: center;
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  padding: 0 15px;
  height: 40px;
  border-radius: 12px;
  gap: 7px;
  white-space: nowrap;
  ${({soon}) => {
    return soon ? css`
      cursor: default;
      &::after {
        content: 'Soon';
        padding: 0 8.31px;
        margin-left: 2px;
        font-family: 'Work Sans', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 20px;
        color: #FFFFFF;
        background: #1D59F6;
        border-radius: 12px;
        height: 20px;
        display: flex;
        align-items: center;
      }
    ` : css`
      cursor: pointer;
    `;
  }}
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

  ${({burgerOpen}) =>
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
  NetworkGroup,
  Network,
  Burger,
  NetworkButton
};
