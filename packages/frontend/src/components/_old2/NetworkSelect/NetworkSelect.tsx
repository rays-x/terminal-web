import React from 'react';
import {Dropdown} from '../Dropdown';
import {useNetworkExchanges} from '../../../store/networkExchanges';

export function NetworkSelect({className}: { className?: string }) {
  const {network, data, switchNetwork} = useNetworkExchanges();
  return (
    <Dropdown
      itemList={data?.map((chain) => ({
        id: chain.name,
        icon: chain.logo_url,
        text: chain.label,
        color: chain.color
      }))}
      value={network}
      onChange={switchNetwork}
      className={className}
    />
  );
}
