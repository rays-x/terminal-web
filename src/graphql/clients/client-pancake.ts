import { ApolloClient, InMemoryCache } from '@apollo/client';

export const clientPancake = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3-bsc',
  cache: new InMemoryCache(),
});
