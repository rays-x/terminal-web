import { ApolloClient, InMemoryCache } from '@apollo/client';

export const clientUniswap = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
  cache: new InMemoryCache(),
});
