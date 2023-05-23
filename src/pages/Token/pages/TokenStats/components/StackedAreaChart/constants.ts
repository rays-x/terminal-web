export const bqGqlBody = `query ($network: EthereumNetwork!, $token: String!, $dateFormat: String!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
  ethereum(network: $network) {
    transfers(
      currency: {is: $token}
      height: {gt: 0}
      amount: {gt: 0}
      date: {since: $from, till: $till}
    ) {
      date {
        date(format: $dateFormat)
      }
      count: countBigInt(uniq: senders)
      median: amount(calculate: median)
      average: amount(calculate: average)
      sum: amount(calculate: sum)
    }
  }
}
`;
