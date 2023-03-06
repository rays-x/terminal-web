import styled, {css} from 'styled-components';
import {colors, spacing} from '../../../../../presets/base';
import {ValueChangeDirection} from './SubChartValue';

const Component = styled.div`
  display: flex;
  align-items: center;
  gap: 0 ${spacing[8]};
`;

const Label = styled.div`
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  margin-right: ${spacing[2]};
`;

const Value = styled.div`
  font-weight: bold;
  font-size: 22px;
  line-height: 24px;
`;

const ValueChange = styled.div<{ $direction?: ValueChangeDirection }>`
  display: flex;
  align-items: center;
  gap: 0 ${spacing[4]};
  font-weight: 600;
  font-size: 11px;
  line-height: 14px;

  ${({$direction}) => {
  switch($direction) {
    case ValueChangeDirection.positive:
      return css`
          color: ${colors.text.green};
        `;
    case ValueChangeDirection.negative:
      return css`
          color: ${colors.text.red};
        `;
  }
}}
`;

export const SubChartValueStyled = {
  Component,
  Label,
  Value,
  ValueChange
};
