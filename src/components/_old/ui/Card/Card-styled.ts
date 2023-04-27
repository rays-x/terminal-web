import styled, {css} from 'styled-components';
import {colors, radius, spacing} from '../../../../presets/base';
import {mixins} from '../../../../presets/mixins';

const Component = styled.div`
  ${mixins.isMobile(css`
    flex-direction: column;
    gap: 20px;
  `)}

  display: flex;
  justify-content: space-between;
  background: ${colors.background['card']};
  border-radius: ${radius[20]};
  padding: ${spacing[24]};
`;

export const CardStyled = {
  Component
};
