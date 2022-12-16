import React, {FC} from 'react';
import s from './Header.module.scss';
import {NetworkWalletSelect} from '../NetworkWalletSelect';
import {ExchangeSelect} from '../ExchangeSelect';
import {NavigationStyled} from '../../_old/ui/Navigation/Navigation-styled';
import {AnimatedGradientButton} from '../../_old/ui/Buttons/AnimatedGradientButton/AnimatedGradientButton';
import Icons from '../../../assets';
import {LogoLink} from '../LogoLink';
import HomeIcon from '../../../assets/icons/new/HomeIcon';
import DexRankIcon from '../../../assets/icons/new/DexRankIcon';
import BuyRaxIcon from '../../../assets/icons/new/BuyRaxIcon';
import clsx from 'clsx';
import {NetworkWalletProvider} from '../../../store/networkWallet';

export const Header: FC<any> = (() => {
  return (
      <header className={s.Header}>
        <LogoLink className={s.Header__logo}/>
        <div className={s.Header__nav}>
          <div className={s.Header__navLink}>
            <HomeIcon className={s.Header__navLinkIcon}/>
            <span className={s.Header__navLinkText}>Home</span>
          </div>
          <div className={clsx(s.Header__navLink, s.Header__navLink_active)}>
            <DexRankIcon className={s.Header__navLinkIcon}/>
            <span className={s.Header__navLinkText}>DEX Rank</span>
          </div>
          <div className={s.Header__navLink}>
            <BuyRaxIcon className={s.Header__navLinkIcon}/>
            <span className={s.Header__navLinkText}>Buy RAX</span>
          </div>
        </div>
        {/*<ExchangeSelect/>*/}
        <div className={s.Header__wallet}>
          <NetworkWalletSelect className={s.Header__network}/>
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
            {/*<Icons.Settings/>*/}
          </NavigationStyled.UserGroup>
        </div>
      </header>
  );
});
