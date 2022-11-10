import styled from 'styled-components';
import { colors, spacing } from '../../../../../../presets/base';

const Component = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Item = styled.div`
  flex-grow: 1;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  color: ${colors.text.secondary};
  padding: ${spacing[24]};
  :not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  div:last-child {
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    margin-top: ${spacing[10]};
  }
`;

export const TextInfoStyled = {
  Component,
  Item
};
