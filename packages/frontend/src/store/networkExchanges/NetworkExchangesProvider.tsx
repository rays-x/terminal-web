import React from 'react';
import {NetworkExchangesContext} from './NetworkExchangesContext';
import BSCIcon from '../../assets/icons/new/BSCIcon.png';
import ETHIcon from '../../assets/icons/new/ETHIcon.png';
import AVAXIcon from '../../assets/icons/new/AVAXIcon.svg';
import MATICIcon from '../../assets/icons/new/MATICIcon.svg';
import FantomIcon from '../../assets/icons/new/FantomIcon.svg';

const data = [
  {
    name: 'bsc',
    label: 'BSC',
    logo: BSCIcon,
    color: '#F0B90B'
  },
  {
    name: 'eth',
    label: 'ETH',
    logo: ETHIcon,
    color: '#FFFFFF'
  },
  {
    name: 'avax',
    label: 'AVAX',
    logo: AVAXIcon,
    soon: true
  },
  {
    name: 'poly',
    label: 'POLY',
    logo: MATICIcon,
    soon: true
  },
  {
    name: 'fantom',
    label: 'FANTOM',
    logo: FantomIcon,
    soon: true
  }
];

export function NetworkExchangesProvider({children}: { children: React.ReactNode }) {
  const [network, setNetwork] = React.useState<string>();
  const switchNetwork = (_name?: string) => {
    const network = data.find(({name}) => name === _name);
    setNetwork(network?.name);
  };

  return (
    <NetworkExchangesContext.Provider
      value={{data, network, switchNetwork}}>
      {children}
    </NetworkExchangesContext.Provider>
  );
}
