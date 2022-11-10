import React, {useEffect, useState} from 'react';
import {NetworkExchangesContext} from './NetworkExchangesContext';

const data = [
  {
    name: 'eth',
    label: 'Ethereum Mainnet',
    logo_url: 'https://www.covalenthq.com/static/images/icons/display-icons/ethereum-eth-logo.png',
    color: 'rgb(115, 138, 225)',
    dexes: [{
      exchange: 'uniswap',
      label: 'UniSwap',
      logo_url: 'https://cryptologos.cc/logos/uniswap-uni-logo.png?v=023'
    }]
  },
  {
    name: 'bsc',
    label: 'Binance Smart Chain',
    logo_url: 'https://www.covalenthq.com/static/images/icons/display-icons/binance-coin-bnb-logo.png',
    color: 'rgb(240, 185, 11)',
    dexes: [{
      exchange: 'pancakeswap',
      label: 'PancakeSwap',
      logo_url: 'https://cryptologos.cc/logos/pancakeswap-cake-logo.png'
    }]
  }
];

export function NetworkExchangesProvider({children}: { children: React.ReactNode }) {

  const [network, setNetwork] = useState('');
  const [exchange, switchExchange] = useState('');

  const switchNetwork = (_name: string) => {
    const network = data?.find(({name}) => name === _name);
    setNetwork(_name);
    switchExchange(network?.dexes[0].exchange as string);
  };

  useEffect(() => {
    switchNetwork(data[0].name);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <NetworkExchangesContext.Provider
      value={{data, network, switchNetwork, exchange, switchExchange}}>
      {data && network && exchange && children}
    </NetworkExchangesContext.Provider>
  );
}
