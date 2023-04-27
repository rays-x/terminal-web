import styled, {css} from 'styled-components';
import {spacing} from '../../../../../presets/base';

export enum SubChartHeaderVariant {
  vertical = 'vertical',
  horizontal = 'horizontal'
}

export interface SubChartHeaderComponentProps {
  $variant?: SubChartHeaderVariant;
}

const Component = styled.div<SubChartHeaderComponentProps>`
  display: flex;
  gap: ${spacing[10]};

  ${({$variant}) => {
    switch($variant) {
      case SubChartHeaderVariant.vertical:
        return css`
          flex-direction: column;
        `;
      case SubChartHeaderVariant.horizontal:
        return css`
          align-items: center;
          justify-content: space-between;
        `;
      default:
        return null;
    }
  }}
`;

const Head = styled.div`
  display: grid;
  grid-template-columns: min-content;
  grid-auto-columns: min-content;
  grid-auto-flow: column;
  align-items: center;
  gap: ${spacing[10]};
`;

const TitleText = styled.div`
  white-space: nowrap;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
`;

const TitleContent = styled.div``;

const ValueContent = styled.div``;

export const SubChartHeaderStyled = {
  Component,
  Head,
  TitleText,
  ValueContent,
  TitleContent
};
