import styled from 'styled-components';
import {colors, spacing} from '../../../../../../presets/base';

const Component = styled.div`
  padding: 6px 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: ${colors.text.secondary};
`;

const Title = styled.div`
  color: ${colors.text.gray};
  margin-bottom: ${spacing[4]};
`;

const Value = styled.div`
  display: flex;
  align-items: center;
`;

const ValueLabel = styled.div`
  margin-right: ${spacing[4]};
`;

export const CustomTooltipStyled = {
  Component,
  Title,
  Value,
  ValueLabel
};
