import styled, {css} from 'styled-components';
import {mixins} from '../../../../presets/mixins';
import {CardStyled} from '../../../../components/_old/ui/Card/Card-styled';
import {GridStyled} from '../../../../components/_old/ui/Grid/Grid-styled';

const Component = styled.div``;

const Grid = styled(GridStyled.Component)`
  ${mixins.isDesktopSmall(css`
    grid-template-columns: repeat(2, 1fr);
  `)};
  ${mixins.isMobile(css`
    grid-template-columns: 100%;
  `)};
`;

const GridItem = styled(GridStyled.Item)`
  ${mixins.isMobile(css`
    grid-column: 1;
  `)};
`;

const Card = styled(CardStyled.Component)`
  height: 100%;
`;

export const TradingStatsStyled = {
  Component,
  Grid,
  GridItem,
  Card
};
