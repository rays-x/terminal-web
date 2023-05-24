export const gqlQuery = `query ($network: EthereumNetwork!, $dateFormat: String!, $token: String!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
    ethereum(network: $network) {
      dexTrades(
        options: {asc: "date.date"}
        date: {since: $from, till: $till}
        baseCurrency: {is: $token}
      ) {
        date: date {
          date(format: $dateFormat)
        }
        trades: countBigInt
        amount: baseAmount
        baseCurrency {
          symbol
        }
        contracts: countBigInt(uniq: smart_contracts)
        currencies: countBigInt(uniq: quote_currency)
      }
    }
  }
`;
