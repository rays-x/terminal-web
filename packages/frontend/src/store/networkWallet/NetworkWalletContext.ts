import React from 'react';

type Network = {
  id: string
  name: string,
  label: string,
  logo_url: string,
  color: string,
  swapApi: string,
}

export interface INetworkExchangesContext {
  data?: any;
  network?: Network;
  switchNetwork: (network: string, silent?: boolean) => void;
}

export const NetworkWalletContext = React.createContext<INetworkExchangesContext>({
  network: undefined,
  switchNetwork: () => {
  }
});
