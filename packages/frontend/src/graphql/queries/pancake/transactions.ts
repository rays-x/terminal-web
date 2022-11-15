import {gql} from '@apollo/client';

export const QUERY_TRANSACTIONS_SWAPS_PANCAKE = gql`
  query transactionsSwapsPancake($address: [String!], $first: Int!, $skip: Int!) {
    swaps(skip: $skip, first: $first, orderBy: timestamp, orderDirection: desc, where: {pair_in: $address}) {
      id
      timestamp
      from
      amount0In
      amount1In
      amount0Out
      amount1Out
      amountUSD
    }
  }
`;
export const QUERY_TRANSACTIONS_MINTS_PANCAKE = gql`
  query transactionsMintsPancake($address: [String!], $first: Int!, $skip: Int!) {
    mints(skip: $skip, first: $first, orderBy: timestamp, orderDirection: desc, where: {pair_in: $address}) {
      id
      timestamp
      sender
      to
      amount0
      amount1
      amountUSD
    }
  }
`;
export const QUERY_TRANSACTIONS_BURNS_PANCAKE = gql`
  query transactionsBurnsPancake($address: [String!], $first: Int!, $skip: Int!) {
    burns(skip: $skip, first: $first, orderBy: timestamp, orderDirection: desc, where: {pair_in: $address}) {
      id
      timestamp
      sender
      amount0
      amount1
      amountUSD
    }
  }
`;