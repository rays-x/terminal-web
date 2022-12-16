import React from 'react';

export interface INetworkExchangesContext {
  network?: string;
  data: {
    name: string
    label: string
    logo: string
    color?: string
    soon?: boolean
  }[];
  switchNetwork: (network: string, silent?: boolean) => void;
}

export const NetworkExchangesContext = React.createContext<INetworkExchangesContext>({
  data: [],
  network: undefined,
  switchNetwork: () => {
  }
});
