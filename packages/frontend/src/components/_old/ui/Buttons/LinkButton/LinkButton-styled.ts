import styled, {css} from 'styled-components';
import {colors, radius} from '../../../../../presets/base';
import {mixins} from '../../../../../presets/mixins';

export interface LinkButtonProps {
  size?: number | string;
}

export const Component = styled.a<LinkButtonProps>`
  ${mixins.buttonReset}
  background: ${colors.background.secondary};
  border-radius: ${radius['12']};

  padding: 8px 11px;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({size}) => {
    if (!size) return undefined;
    const sizeStr = typeof size === 'string' ? size : `${size}px`;
    return css`
      width: ${sizeStr};
      height: ${sizeStr};
    `;
  }}
`;

export const LinkButtonStyled = {
  Component
};
