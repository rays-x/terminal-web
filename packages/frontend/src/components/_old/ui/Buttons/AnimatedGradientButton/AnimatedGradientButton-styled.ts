import styled, {css} from 'styled-components';
import {animated} from 'react-spring';
import {mixins} from '../../../../../presets/mixins';
import {colors, radius} from '../../../../../presets/base';

export interface GradientButtonComponent {
  width?: number | string;
  height?: number;
  fullWidth?: boolean;
}

export const ButtonLayout = css`
  position: absolute;
  width: inherit;
  height: inherit;
  top: 0;
  left: 0;
`;

export const Component = styled.button<GradientButtonComponent>`
  ${mixins.buttonReset}
  position: relative;
  border-radius: ${radius['12']};
  overflow: hidden;
  cursor: pointer;
  background: transparent;
  ${({width}) =>
          width &&
          css`
            width: ${typeof width === 'number' ? `${width}px` : width};
          `}
  ${({height}) =>
          height &&
          css`
            height: ${height}px;
          `}
  ${({fullWidth}) =>
          fullWidth &&
          css`
            width: inherit;
          `}
`;

export const Gradient = styled(animated.div)`
  background: ${colors.button['gradient']};
  ${ButtonLayout}
`;

export const DefaultBackground = styled(animated.div)`
  background: ${colors.button['primary']};
  ${ButtonLayout}
`;

export const Content = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  ${ButtonLayout}
  ${mixins.textUnselectable}
  ${mixins.text_button}
`;

export const AnimatedGradientButtonStyled = {
  Component,
  Gradient,
  DefaultBackground,
  Content
};
