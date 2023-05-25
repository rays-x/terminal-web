import React from 'react';
import {NetworkExchangesContext} from './NetworkExchangesContext';
import BSCIcon from '../../assets/icons/new/BSCIcon.png';
import ETHIcon from '../../assets/icons/new/ETHIcon.png';
import AVAXIcon from '../../assets/icons/new/AVAXIcon.svg';
import MATICIcon from '../../assets/icons/new/MATICIcon.svg';
import FantomIcon from '../../assets/icons/new/FantomIcon.svg';

const data = [
  {
    id: '63a121a02afa55c2295c123d',
    name: 'bsc',
    label: 'BSC',
    logo: BSCIcon,
    color: '#F0B90B',
    tableColor: '#161824',
    tableBackground: '#FF9D49'
  },
  {
    id: '63a121a12afa55c2295c1255',
    name: 'eth',
    label: 'ETH',
    logo: ETHIcon,
    color: '#FFFFFF',
    tableColor: '#FFFFFF',
    tableBackground: '#5A7FF2'
  },
  // {
  //   id: '63a1f86f2afa55c2295d5ba0',
  //   name: 'avax',
  //   label: 'AVAX',
  //   logo: AVAXIcon,
  //   color: '#E84142',
  //   tableColor: '#161824',
  //   tableBackground: '#FF4E4F',
  //   beta: true
  // },
  // {
  //   id: '63a121a12afa55c2295c125b',
  //   name: 'poly',
  //   label: 'POLY',
  //   logo: MATICIcon,
  //   color: '#8247E5',
  //   tableColor: '#161824',
  //   tableBackground: '#9E52FF',
  //   beta: true
  // },
  // {
  //   id: '63a121a12afa55c2295c125a',
  //   name: 'fantom',
  //   label: 'FANTOM',
  //   logo: FantomIcon,
  //   color: '#13B5EC',
  //   tableColor: '#FFFFFF',
  //   tableBackground: '#13B5EC',
  //   beta: true
  // }
];

export function NetworkExchangesProvider({children}: { children: React.ReactNode }) {
  const [networks, setNetworks] = React.useState<string[]>([]);
  const switchNetwork = (_id?: string) => {
    if(!_id) {
      return setNetworks([]);
    }
    setNetworks(prev => {
      if(prev.includes(_id)) {
        return [...prev.filter(id => id !== _id)];
      } else {
        return [...prev, _id];
      }
    });
  };

  return (
    <NetworkExchangesContext.Provider
      value={{data, networks, switchNetwork}}>
      {children}
    </NetworkExchangesContext.Provider>
  );
}
