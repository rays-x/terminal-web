import { gql } from '@apollo/client'

export const QUERY_POOLS_UNISWAP = gql`
  query poolUniswap(
    $first: Int
    $skip: Int
    $orderBy: Pool_orderBy
    $orderDirection: OrderDirection
    $firstTicks: Int
    $skipTicks: Int
  ) {
    pools(
      first: $first
      skip: $skip
      where: { liquidity_gt: 0 }
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      id
      tick
      feeTier
      sqrtPrice
      liquidity
      volumeUSD
      token0 {
        id
        symbol
        decimals
      }
      token1 {
        id
        symbol
        decimals
      }
      ticks(first: $firstTicks, skip: $skipTicks) {
        tickIdx
        liquidityNet
        liquidityGross
      }
    }
  }
`

export const QUERY_POOLS_WITHOUT_TOKENS_UNISWAP = gql`
  query ticksUniswap(
    $firstTicks: Int
    $skipTicks: Int
    $ids: [ID!]
  ) {
    pools(where: { id_in: $ids }) {
      id
      ticks(first: $firstTicks, skip: $skipTicks) {
        tickIdx
        liquidityNet
        liquidityGross
      }
    }
  }
`
