import React from 'react';
import {Dropdown} from '../Dropdown';
import {useNetworkExchanges} from '../../../store/networkExchanges';
import {AnimatedGradientButton} from '../../_old/ui/Buttons/AnimatedGradientButton/AnimatedGradientButton';
import {NavigationStyled, NetworkGroup} from '../../_old/ui/Navigation/Navigation-styled';
import s from '../../../pages/Home/components/TokenList.module.scss';

export function NetworkSelect({className}: { className?: string }) {
  const {data, network, switchNetwork} = useNetworkExchanges();
  return (
    <div className={s.TokenListPage__headingNetworkSelectorContainer}>
      <NavigationStyled.NetworkGroup>
        <NavigationStyled.NetworkButton
          selected={!network}
          onClick={() => {
            switchNetwork(undefined);
          }}
        >
          All Networks
        </NavigationStyled.NetworkButton>
        {data.map(({name, label, color, logo, soon}) => (
          <NavigationStyled.NetworkButton
            key={name}
            logo={logo}
            borderColor={color}
            soon={soon}
            selected={network === name}
            onClick={() => soon ? undefined : switchNetwork(name)}
          >
            {label}
          </NavigationStyled.NetworkButton>
        ))}
      </NavigationStyled.NetworkGroup>
    </div>
  );
}
