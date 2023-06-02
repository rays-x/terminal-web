import { gql } from '@apollo/client';

export const QUERY_TOKENS_PANCAKESWAP = gql`
  query tokensUniswap(
    $block: Block_height
    $first: Int = 100
    $orderBy: Token_orderBy = volumeUSD
    $orderDirection: OrderDirection = desc
    $skip: Int = 0
    $subgraphError: _SubgraphErrorPolicy_! = deny
    $where: Token_filter
    $ddFirst: Int = 1
    $ddorderBy: TokenDayData_orderBy = date
    $ddorderDirection: OrderDirection = desc
    $ddskip: Int = 1
    $ddwhere: TokenDayData_filter
  ) {
    tokens(
      block: $block
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      skip: $skip
      subgraphError: $subgraphError
      where: $where
    ) {
      id
      symbol
      name
      decimals
      totalSupply
      volumeUSD
      untrackedVolumeUSD
      totalValueLocked
      totalValueLockedUSD
      totalValueLockedUSDUntracked
      derivedETH
      tokenDayData(
        first: $ddFirst
        orderBy: $ddorderBy
        orderDirection: $ddorderDirection
        skip: $ddskip
        where: $ddwhere
      ) {
        id
        date
        volume
        volumeUSD
        untrackedVolumeUSD
        totalValueLockedUSD
        priceUSD
      }
    }
  }
`;
