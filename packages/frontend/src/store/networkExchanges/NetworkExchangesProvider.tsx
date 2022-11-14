import React from 'react';
import {NetworkExchangesContext} from './NetworkExchangesContext';
import {useLocation, useNavigate, useParams} from 'react-router';

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
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const [network, setNetwork] = React.useState<string>();
  const [exchange, switchExchange] = React.useState<string>();
  const switchNetwork = (_name?: string, silent = true) => {
    const network = data.find(({name}) => name === _name) || data[0];
    setNetwork(network.name);
    switchExchange(network.dexes[0].exchange);
    if (!silent && _name && pathname !== '/') {
      navigate('/');
    }
  };
  React.useEffect(() => {
    switchNetwork(undefined, true);
  }, []);

  return (
    <NetworkExchangesContext.Provider
      value={{data, network, switchNetwork, exchange, switchExchange}}>
      {data && network && exchange && children}
    </NetworkExchangesContext.Provider>
  );
}
