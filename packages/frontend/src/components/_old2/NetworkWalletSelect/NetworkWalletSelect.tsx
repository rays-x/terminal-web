import React from 'react';
import {Dropdown} from '../Dropdown';
import {useNetworkWallet} from '../../../store/networkWallet';

export function NetworkWalletSelect({className}: { className?: string }) {
  const {network, data, switchNetwork} = useNetworkWallet();
  return (
    <Dropdown
      itemList={data?.map((chain) => ({
        id: chain.name,
        icon: chain.logo_url,
        text: chain.label,
        color: chain.color
      }))}
      value={network?.name}
      onChange={item => switchNetwork(item, false)}
      className={className}
    />
  );
}
