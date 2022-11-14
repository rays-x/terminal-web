import React from 'react';
import {ApolloError} from '@apollo/client';

// import { NetworkExchangesQuery } from '../graphql';

export interface INetworkExchangesContext {
  // query
  data?: any;
  // state
  network: string;
  switchNetwork: (network: string, silent?: boolean) => void;
  exchange: string;
  switchExchange: (exchange: string) => void;
}

export const NetworkExchangesContext = React.createContext<INetworkExchangesContext>({
  network: '',
  switchNetwork: () => {
  },
  exchange: '',
  switchExchange: () => {
  }
});
