import styled, {css} from 'styled-components';
import {animated} from '@react-spring/web';
import {colors, fonts, gap, radius} from '../../../../presets/base';
import {mixins} from '../../../../presets/mixins';

const dropDownText = css`
  font-weight: ${fonts.fontWeight._600};
  font-size: ${fonts.fontSize._12};
  line-height: ${fonts.lineHeight._18};
`;

export enum Position {
  leftBottom
}

export interface DropdownStyledProps {
  width: number;
  position?: Position;
  $wrapperWidth?: number;
}

export const Wrapper = styled(animated.div)<DropdownStyledProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 6px 10px;
  width: ${({$wrapperWidth}) => ($wrapperWidth || 95) + 'px'};
  height: 30px;
  background: ${colors.background.opacityBlack};
  border-radius: ${radius[12]};
  color: ${colors.text.secondary};
  ${dropDownText};
  ${mixins.textUnselectable};
`;

export const Component = styled(animated.div)`
  width: inherit;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${gap[6]};
`;

export const Content = styled(animated.div)<DropdownStyledProps>`
  position: absolute;
  ${({width}) =>
  width &&
  css`
      width: ${width}px;
    `};
  display: flex;
  flex-flow: column;
  gap: 4px;
  font-size: 20px;
  ${({position, width}) =>
  position === Position.leftBottom &&
  width &&
  css`
      left: -${width / 2}px;
      ${mixins.isMobile(css`
        left: -${width / 4}px;
      `)}
    `};
  max-height: 500px;
  overflow: scroll;
  background-color: ${colors.background.opacityBlack};
  border-radius: ${radius[12]};
  ${dropDownText};
  ${mixins.textUnselectable}
  padding: 8px 0;
  color: ${colors.text.secondary};
`;

export interface ContentButtonsProps {
  isSelected?: boolean;
}

export const ContentButton = styled.button<ContentButtonsProps>`
  ${mixins.buttonReset}
  min-height: 30px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 4px 8px;
  margin: 0 8px;
  border-radius: ${radius[8]};
  text-align: left;
  transition: background-color 300ms;
  ${({isSelected}) =>
  isSelected &&
  css`
      background-color: ${colors.background.opacityBlackSecondary};
    `}
`;

export const DropDownStyled = {
  Wrapper,
  Component,
  Content,
  ContentButton
};
