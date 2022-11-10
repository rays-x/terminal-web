import React from 'react';
import {
  SubChartHeaderComponentProps,
  SubChartHeaderStyled,
  SubChartHeaderVariant
} from './SubChartHeader-styled';

export interface SubChartHeaderProps extends SubChartHeaderComponentProps {
  title?: string;
  titleContent?: React.ReactNode;
  chartValue?: React.ReactNode;
}

export const SubChartHeader: React.FC<SubChartHeaderProps> = ({
  title,
  titleContent,
  chartValue,
  $variant = SubChartHeaderVariant.vertical
}) => {
  return (
    <SubChartHeaderStyled.Component $variant={$variant}>
      <SubChartHeaderStyled.Head>
        {title && (
          <SubChartHeaderStyled.TitleText>
            {title}
          </SubChartHeaderStyled.TitleText>
        )}

        {titleContent}
      </SubChartHeaderStyled.Head>

      {chartValue && (
        <SubChartHeaderStyled.ValueContent>
          {chartValue}
        </SubChartHeaderStyled.ValueContent>
      )}
    </SubChartHeaderStyled.Component>
  );
};
