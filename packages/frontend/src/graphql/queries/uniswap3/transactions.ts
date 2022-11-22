import {gql} from '@apollo/client';

export const QUERY_TRANSACTIONS_SWAPS_UNISWAP3 = gql`
  query transactionsSwapsUniswap3($address: [String!], $first: Int!, $skip: Int!) {
    swaps(
      skip: $skip,
      first: $first,
      orderBy: timestamp
      orderDirection: desc
      where: {pool_in: $address}
      subgraphError: allow
    ) {
      id
      timestamp
      transaction {
        id
        __typename
      }
      pool {
        token0 {
          id
          symbol
          __typename
        }
        token1 {
          id
          symbol
          __typename
        }
        __typename
      }
      origin
      amount0
      amount1
      amountUSD
      __typename
    }
  }
`;
export const QUERY_TRANSACTIONS_MINTS_UNISWAP3 = gql`
  query transactionsMintsUniswap3($address: [String!], $first: Int!, $skip: Int!) {
    mints(
      skip: $skip,
      first: $first,
      orderBy: timestamp
      orderDirection: desc
      where: {pool_in: $address}
      subgraphError: allow
    ) {
      id
      timestamp
      transaction {
        id
        __typename
      }
      pool {
        token0 {
          id
          symbol
          __typename
        }
        token1 {
          id
          symbol
          __typename
        }
        __typename
      }
      owner
      sender
      origin
      amount0
      amount1
      amountUSD
      __typename
    }
  }
`;
export const QUERY_TRANSACTIONS_BURNS_UNISWAP3 = gql`
  query transactionsBurnsUniswap3($address: [String!], $first: Int!, $skip: Int!) {
    burns(
      skip: $skip,
      first: $first,
      orderBy: timestamp
      orderDirection: desc
      where: {pool_in: $address}
      subgraphError: allow
    ) {
      id
      timestamp
      transaction {
        id
        __typename
      }
      pool {
        token0 {
          id
          symbol
          __typename
        }
        token1 {
          id
          symbol
          __typename
        }
        __typename
      }
      owner
      amount0
      amount1
      amountUSD
      __typename
    }
  }
`;