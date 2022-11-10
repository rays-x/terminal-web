import styled from 'styled-components';
import { colors, spacing } from '../../../../../../presets/base';

export const Component = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Item = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: minmax(120px, max-content) 1fr;
  padding: ${spacing[24]};
  gap: 10px;
  :not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  color: ${colors.text.secondary};
  white-space: nowrap;
  span:last-child {
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
  }
`;

export const Chart = styled.div``;

export const TinyAreaChartStyled = {
  Component,
  Item,
  Info,
  Chart
};
