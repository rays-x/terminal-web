import styled, {css} from 'styled-components';
import {mixins} from '../../../../presets/mixins';
import {spacing} from '../../../../presets/base';
import {GridItemProps, GridProps} from '../../../../presets/mixinTypes';
import {StyledType} from '../../../../presets/types';

interface ComponentProps extends StyledType<GridProps> {
  $height?: string;
}

const Component = styled.div<ComponentProps>`
  ${({$colsAmount, $gap}) =>
          mixins.grid({colsAmount: $colsAmount, gap: $gap || spacing[20]})};
  ${({$height}) =>
          $height &&
          css`
            height: ${$height};
          `};
`;

const Item = styled.div<StyledType<GridItemProps>>`
  ${({$colSpan}) => mixins.gridItem({colSpan: $colSpan})};
`;

export const GridStyled = {
  Component,
  Item
};
