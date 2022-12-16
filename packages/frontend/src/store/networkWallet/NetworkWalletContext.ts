import React from 'react';

export interface INetworkExchangesContext {
  data?: any;
  network: string;
  switchNetwork: (network: string, silent?: boolean) => void;
}

export const NetworkWalletContext = React.createContext<INetworkExchangesContext>({
  network: '',
  switchNetwork: () => {
  }
});
