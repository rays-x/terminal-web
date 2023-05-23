export const gqlQuery = `query ($network: EthereumNetwork!, $token: String!) {
    ethereum(network: $network) {
      transfers(currency: {is: $token}, height: {gt: 0}, amount: {gt: 0}) {
        count(uniq: dates)
        minimum(of: date)
        maximum(of: date)
      }
    }
  }
`;
