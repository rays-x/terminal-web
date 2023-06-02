import { gql } from '@apollo/client'

export const QUERY_TICKS_PANCAKESWAP = gql`
  query poolPancakeswap($id: ID!) {
    pool(id: $id) {
      liquidity
      ticks {
        tickIdx
        liquidityNet
        liquidityGross
      }
    }
  }
`
