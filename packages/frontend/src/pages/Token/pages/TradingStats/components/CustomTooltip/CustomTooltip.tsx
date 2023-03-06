import React from 'react';
import {throttle} from 'lodash-es';
import {chooseNumeralFormat, formatNumeral, NumeralFormatType} from '../../../../../../utils/numbers';
import {EMDASH} from '../../../../../../utils/data/utf';
import {CustomTooltipStyled} from './CustomTooltip-styled';

export interface CustomTooltipProps extends Omit<NumeralFormatType, 'value'> {
  showTooltipTitle?: boolean;
  showValueLabel?: boolean;
  showLegendDot?: boolean;
  titleFormatter?: (title: any) => React.ReactNode;
  labelFormatter?: (label: any, props?: any) => React.ReactNode;
  valueFormatter?: (value: any, props?: any) => React.ReactNode;
}

export const customTooltipValueFormatter = (
  value: any,
  options?: Omit<NumeralFormatType, 'value'>
): string => {
  return formatNumeral(
    value,
    chooseNumeralFormat({value, type: 'currency', ...options}),
    EMDASH
  );
};

export const CustomTooltip = (options: CustomTooltipProps = {}) => {
  const {
    showTooltipTitle = true,
    showValueLabel,
    showLegendDot,
    titleFormatter,
    labelFormatter,
    valueFormatter
  } = options;

  return throttle(({label, payload}) => {
    return (
      <CustomTooltipStyled.Component>
        {showTooltipTitle && (
          <CustomTooltipStyled.Title>
            {titleFormatter ? titleFormatter(label) : label}
          </CustomTooltipStyled.Title>
        )}

        {(payload || []).map(({value, ...props}, iItem) => (
          <CustomTooltipStyled.Value key={iItem}>
            {showLegendDot && (
              <svg width={16} height={3} style={{marginRight: '8px'}}>
                <rect
                  width={'100%'}
                  height={'100%'}
                  fill={props.fill || props.color}
                  rx={1.5}
                  ry={1.5}
                />
              </svg>
            )}

            {showValueLabel && (
              <CustomTooltipStyled.ValueLabel>
                {labelFormatter
                  ? labelFormatter(props.name, {value, ...props})
                  : `${props.name}:`}
              </CustomTooltipStyled.ValueLabel>
            )}

            {valueFormatter
              ? valueFormatter(value, props)
              : customTooltipValueFormatter(value, options)}
          </CustomTooltipStyled.Value>
        ))}
      </CustomTooltipStyled.Component>
    );
  }, 100);
};
