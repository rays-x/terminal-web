import {ApolloClient, InMemoryCache} from "@apollo/client";

export const clientPancake = new ApolloClient({
  uri: 'https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2',
  cache: new InMemoryCache(),
});