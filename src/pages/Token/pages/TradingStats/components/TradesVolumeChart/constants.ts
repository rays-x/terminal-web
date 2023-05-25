export const gqlQuery = `query ($network: EthereumNetwork!, $token: String!, $gte: Float, $lte: Float, $since: ISO8601DateTime, $till: ISO8601DateTime, $limit: Int = 25000, $offset: Int = 0) {
    ethereum(network: $network) {
      dexTrades(
        options: {limit: $limit, offset: $offset}
        baseCurrency: {is: $token}
        date: {since: $since, till: $till}
        tradeAmountUsd: {gteq: $gte, lteq: $lte}
      ) {
        count
      }
    }
  }
`;
