import React from 'react';
import {Dropdown} from '../Dropdown';
import {useNetworkExchanges} from '../../../store/networkExchanges';
import {AnimatedGradientButton} from '../../_old/ui/Buttons/AnimatedGradientButton/AnimatedGradientButton';
import {NavigationStyled, NetworkGroup} from '../../_old/ui/Navigation/Navigation-styled';
import s from '../../../pages/Home/components/TokenList.module.scss';

export function NetworkSelect({className}: { className?: string }) {
  const {data, networks, switchNetwork} = useNetworkExchanges();
  return (
    <div className={s.TokenListPage__headingNetworkSelectorContainer}>
      <NavigationStyled.NetworkGroup>
        <NavigationStyled.NetworkButton
          selected={!networks.length}
          onClick={() => {
            switchNetwork(undefined);
          }}
        >
          All Networks
        </NavigationStyled.NetworkButton>
        {data.map(({id, label, color, logo, soon, beta}) => (
          <NavigationStyled.NetworkButton
            key={id}
            logo={logo}
            borderColor={color}
            soon={soon}
            beta={beta}
            selected={networks.includes(id)}
            onClick={() => soon ? undefined : switchNetwork(id)}
          >
            {label}
          </NavigationStyled.NetworkButton>
        ))}
      </NavigationStyled.NetworkGroup>
    </div>
  );
}
