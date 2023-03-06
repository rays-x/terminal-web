import styled from 'styled-components';
import {colors, radius, spacing} from '../../../../presets/base';

export const Component = styled.div`
  background: ${colors.background['card']};
  border-radius: ${radius['20']};
  padding: 32px;

  display: grid;
  grid-template-columns: repeat(auto-fit, 170px);
  justify-content: space-between;
  gap: ${spacing[20]};
`;

export const StatisticGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

export const StatisticGroupIcon = styled.div`
  min-width: 42px;
  width: 42px;
  height: 42px;
`;

export const StatisticFieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StatisticGroupTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  color: #8e91a5;
`;

export const StatisticGroupValue = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  color: ${colors.text.secondary};
`;

export const StatisticStyled = {
  Component,
  StatisticGroup,
  StatisticGroupIcon,
  StatisticFieldGroup,
  StatisticGroupTitle,
  StatisticGroupValue
};
