import { useContext } from 'react';
import { NetworkExchangesContext } from './NetworkExchangesContext';

export function useNetworkExchanges() {
  return useContext(NetworkExchangesContext);
}
