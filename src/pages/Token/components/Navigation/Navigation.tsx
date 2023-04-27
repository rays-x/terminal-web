import React, {FC} from 'react';
import Icons from '../../../../assets';
import {NavigationStyled} from './Navigation-styled';
import {
  AnimatedGradientButton
} from '../../../../components/_old/ui/Buttons/AnimatedGradientButton/AnimatedGradientButton';

export const Navigation: FC = React.memo(() => {

  const [isOpen, changeDisplayMode] = React.useState(false);
  return (
    <NavigationStyled.Component>
      <NavigationStyled.Burger onClick={() => changeDisplayMode(!isOpen)} burgerOpen={isOpen}>
        <span/>
        <span/>
        <span/>
        <span/>
      </NavigationStyled.Burger>
      <NavigationStyled.Network>
        <div>Network</div>
      </NavigationStyled.Network>
      <NavigationStyled.UserGroup>
        <AnimatedGradientButton
          selected
          onClick={() => {
          }}
          width={136}
          height={40}
        >
          Connect Wallet
        </AnimatedGradientButton>
        <Icons.Settings/>
      </NavigationStyled.UserGroup>
    </NavigationStyled.Component>
  );
});
