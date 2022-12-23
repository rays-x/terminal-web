import React from 'react';
import {NetworkWalletContext} from './NetworkWalletContext';
import BSCWalletIcon from '../../assets/icons/new/BSCWalletIcon.png';
import EthWalletIcon from '../../assets/icons/new/EthWalletIcon.svg';
import MATICWalletIcon from '../../assets/icons/new/MATICWalletIcon.svg';
import AVAXWalletIcon from '../../assets/icons/new/AVAXWalletIcon.svg';

const data = [
  {
    name: 'bsc',
    label: 'BSC Network',
    logo_url: BSCWalletIcon,
    color: 'rgb(240, 185, 11)',
  },
  {
    name: 'eth',
    label: 'ETH Network',
    logo_url: EthWalletIcon,
    color: 'rgb(115, 138, 225)'
  },
  {
    name: 'matic',
    label: 'MATIC Network',
    logo_url: MATICWalletIcon,
    color: '#8247E5'
  },
  {
    name: 'avax',
    label: 'AVAX Network',
    logo_url: AVAXWalletIcon,
    color: '#E84142'
  }
];

export function NetworkWalletProvider({children}: { children: React.ReactNode }) {
  const [network, setNetwork] = React.useState<string>();
  const switchNetwork = (_name?: string) => {
    const network = data.find(({name}) => name === _name) || data[0];
    setNetwork(network.name);
  };
  React.useEffect(() => {
    switchNetwork(undefined);
  }, []);

  return (
    <NetworkWalletContext.Provider
      value={{data, network, switchNetwork}}>
      {children}
    </NetworkWalletContext.Provider>
  );
}
