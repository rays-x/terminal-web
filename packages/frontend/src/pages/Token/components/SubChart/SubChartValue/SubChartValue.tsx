import React, { useMemo } from 'react';
import Icons from '../../../../../assets';
import { SubChartValueStyled } from './SubChartValue-styled';

export enum ValueChangeDirection {
  positive = 'positive',
  negative = 'negative'
}

export interface SubChartValueProps {
  label?: string;
  value: string | number;
  valueChange?: string;
  valueChangeDirection?: ValueChangeDirection;
}

export const SubChartValue: React.FC<SubChartValueProps> = ({
  label,
  value,
  valueChange,
  valueChangeDirection
}) => {
  const valueChangeIcon = useMemo(() => {
    switch (valueChangeDirection) {
      case ValueChangeDirection.positive:
        return <Icons.Rise />;
      case ValueChangeDirection.negative:
        return <Icons.Fall />;
      default:
        return null;
    }
  }, [valueChangeDirection]);

  return (
    <SubChartValueStyled.Component>
      {label && <SubChartValueStyled.Label>{label}</SubChartValueStyled.Label>}

      <SubChartValueStyled.Value>{value}</SubChartValueStyled.Value>

      {valueChange && (
        <SubChartValueStyled.ValueChange $direction={valueChangeDirection}>
          {valueChangeIcon}
          {valueChange}
        </SubChartValueStyled.ValueChange>
      )}
    </SubChartValueStyled.Component>
  );
};
