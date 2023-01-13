import styled, { css } from 'styled-components';
import {mixins} from '../../../../presets/mixins';
import {colors, radius, spacing} from '../../../../presets/base';

const Container = styled.div`
  width: 100%;
  ${mixins.isMobile(css`
    flex-direction: column;
    gap: 20px;
  `)}

  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${colors.background['card']};
  border-radius: ${radius[20]};
  padding: 20px;
`;


export const SwapStyled = {
  Container,
};
