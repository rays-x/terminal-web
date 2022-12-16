import { useContext } from 'react';
import { NetworkWalletContext } from './NetworkWalletContext';

export function useNetworkWallet() {
  return useContext(NetworkWalletContext);
}
