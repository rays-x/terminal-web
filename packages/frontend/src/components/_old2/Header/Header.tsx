import React, {FC} from 'react';
import s from './Header.module.scss';
import {NetworkSelect} from '../NetworkSelect';
import {ExchangeSelect} from '../ExchangeSelect';
import {NavigationStyled} from '../../_old/ui/Navigation/Navigation-styled';
import {AnimatedGradientButton} from '../../_old/ui/Buttons/AnimatedGradientButton/AnimatedGradientButton';
import Icons from '../../../assets';

export const Header: FC<any> = (({isOpen, changeDisplayMode}: any) => {
  return (
    <header className={s.Header}>
      <NavigationStyled.Burger onClick={changeDisplayMode} burgerOpen={isOpen}>
        <span/>
        <span/>
        <span/>
        <span/>
      </NavigationStyled.Burger>
      <NetworkSelect className={s.Header__networkSelect}/>
      <ExchangeSelect/>
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
    </header>
  );
});
