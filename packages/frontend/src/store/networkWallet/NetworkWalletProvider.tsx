import '../../polyfills';
import React from 'react';
import {NetworkWalletContext} from './NetworkWalletContext';
import BSCWalletIcon from '../../assets/icons/new/BSCWalletIcon.png';
import EthWalletIcon from '../../assets/icons/new/EthWalletIcon.svg';
import MATICWalletIcon from '../../assets/icons/new/MATICWalletIcon.svg';
import AVAXWalletIcon from '../../assets/icons/new/AVAXWalletIcon.svg';
import FantomIcon from '../../assets/icons/new/FantomIcon.svg';
import {configureChains, createClient, useNetwork, useSwitchNetwork, WagmiConfig} from 'wagmi';
import {avalanche, bsc, fantom, mainnet, polygon} from 'wagmi/chains';
import {publicProvider} from 'wagmi/providers/public';
import {connectorsForWallets, darkTheme, RainbowKitProvider} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import {
  argentWallet,
  braveWallet,
  imTokenWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  omniWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet
} from '@rainbow-me/rainbowkit/wallets';

const data = [
  {
    id: '63a121a02afa55c2295c123d',
    name: 'bsc',
    label: 'BSC Network',
    logo_url: BSCWalletIcon,
    color: 'rgb(240, 185, 11)',
    wallet: bsc
  },
  {
    id: '63a121a12afa55c2295c1255',
    name: 'eth',
    label: 'ETH Network',
    logo_url: EthWalletIcon,
    color: 'rgb(115, 138, 225)',
    wallet: mainnet
  },
  {
    id: '63a1f86f2afa55c2295d5ba0',
    name: 'avax',
    label: 'AVAX Network',
    logo_url: AVAXWalletIcon,
    color: '#E84142',
    wallet: avalanche
  },
  {
    id: '63a121a12afa55c2295c125b',
    name: 'matic',
    label: 'MATIC Network',
    logo_url: MATICWalletIcon,
    color: '#8247E5',
    wallet: polygon
  },
  {
    id: '63a121a12afa55c2295c125a',
    name: 'fantom',
    label: 'FTM Network',
    logo_url: FantomIcon,
    color: '#13B5EC',
    wallet: fantom
  }
];

const {chains, provider} = configureChains(
  [mainnet, bsc, avalanche, polygon, fantom],
  [
    publicProvider()
  ]
);

/*const {connectors} = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});*/


const connectors = connectorsForWallets([
  {
    groupName: 'Suggested',
    wallets: [
      injectedWallet({chains}),
      metaMaskWallet({chains}),
      walletConnectWallet({chains})
    ]
  },
  {
    groupName: 'Others',
    wallets: [
      argentWallet({chains}),
      braveWallet({chains}),
      ledgerWallet({chains}),
      omniWallet({chains}),
      rainbowWallet({chains}),
      trustWallet({chains}),
      imTokenWallet({chains})
    ]
  }
]);

const client = createClient({
  autoConnect: true,
  connectors,
  provider
});

const NetworkWalletProviderWrapper = React.memo(({children}: { children: React.ReactNode }) => {
  const [network, setNetwork] = React.useState<typeof data[number]>(undefined);
  const {chain} = useNetwork();
  const {switchNetworkAsync} = useSwitchNetwork();
  const switchNetwork = (_name?: string) => {
    (async () => {
      try {
        const network = data.find(({name}) => name === _name) || data[0];
        try {
          await switchNetworkAsync(network.wallet.id);
        } catch (e) {
        }
        setNetwork(network);
      } catch (e) {
      }
    })();
  };
  React.useEffect(() => {
    const network = chain ? data.find(({wallet}) => wallet.id === chain.id) : data[0];
    setNetwork(network);
  }, [chain]);
  return (
    <NetworkWalletContext.Provider
      value={{data, network: network, switchNetwork}}>
      <RainbowKitProvider chains={chains} theme={darkTheme({
        accentColor: '#b518ff',
        borderRadius: 'medium'
      })} initialChain={network?.wallet.id}>
        {children}
      </RainbowKitProvider>
    </NetworkWalletContext.Provider>
  );
});

export const NetworkWalletProvider = React.memo(({children}: { children: React.ReactNode }) => {
  return (
    <WagmiConfig client={client}>
      <NetworkWalletProviderWrapper>
        {children}
      </NetworkWalletProviderWrapper>
    </WagmiConfig>
  );
});
export default NetworkWalletProvider;