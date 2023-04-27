import React from 'react';

export interface INetworkExchangesContext {
  networks: string[];
  data: {
    id: string
    name: string
    label: string
    logo: string
    color?: string
    tableColor?: string
    tableBackground?: string
    soon?: boolean
    beta?: boolean
  }[];
  switchNetwork: (id?: string) => void;
}

export const NetworkExchangesContext = React.createContext<INetworkExchangesContext>({
  data: [],
  networks: [],
  switchNetwork: () => {
  }
});
