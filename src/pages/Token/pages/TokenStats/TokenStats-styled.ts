import styled, { css } from 'styled-components'
import { mixins } from '../../../../presets/mixins'
import { GridStyled } from '../../../../components/_old/ui/Grid/Grid-styled'
import { CardStyled } from '../../../../components/_old/ui/Card/Card-styled'

export const Component = styled.div``

const Grid = styled(GridStyled.Component)`
  ${mixins.isDesktopSmall(css`
    grid-template-columns: repeat(5, 1fr);
  `)};
  ${mixins.isMobile(css`
    grid-template-columns: 100%;
  `)};
`

const GridItem = styled(GridStyled.Item)`
  ${mixins.isMobile(css`
    grid-column: 1;
  `)};
`

const Card = styled(CardStyled.Component)<{
  $noPadding?: boolean
}>`
  height: 100%;
  ${({ $noPadding }) =>
    $noPadding &&
    css`
      padding: 0;
    `};
`

export const TokenStatsStyled = {
  Component,
  Grid,
  GridItem,
  Card,
}
