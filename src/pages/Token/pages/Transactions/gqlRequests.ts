import { BQ_API_KEY } from '../../../../constants';

export const gqlRecievingRequests = `query ($network: EthereumNetwork, $baseCurrency: String, $contracts: [String!], $limit: Int) {
    ethereum(network: $network) {
      transfers(
        currency: {is: $baseCurrency}
        options: {limit: $limit, desc: "block.timestamp.unixtime"}
      ) {
        block {
          timestamp {
            unixtime
          }
        }
        receiver(receiver: {in: $contracts}) {
          address
        }
        sender {
          address
        }
        transaction {
          hash
        }
        amount
      }
    }
  }
`;

export const gqlSendingRequests = `query ($network: EthereumNetwork, $baseCurrency: String, $contracts: [String!], $limit: Int) {
    ethereum(network: $network) {
      transfers(
        currency: {is: $baseCurrency}
        options: {limit: $limit, desc: "block.timestamp.unixtime"}
      ) {
        block {
          timestamp {
            unixtime
          }
        }
        receiver {
          address
        }
        sender(sender: {in: $contracts}) {
          address
        }
        transaction {
          hash
        }
        amount
      }
    }
  }
`;

export const gqlHeaders = {
  accept: 'application/json',
  'content-type': 'application/json',
  'sec-ch-ua':
    '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"macOS"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-site',
  'x-api-key': BQ_API_KEY,
};
