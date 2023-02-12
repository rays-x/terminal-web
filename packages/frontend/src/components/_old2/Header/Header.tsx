import React, {FC} from 'react';
import s from './Header.module.scss';
import {NetworkWalletSelect} from '../NetworkWalletSelect';
import {NavigationStyled} from '../../_old/ui/Navigation/Navigation-styled';
import {AnimatedGradientButton} from '../../_old/ui/Buttons/AnimatedGradientButton/AnimatedGradientButton';
import {LogoLink} from '../LogoLink';
import HomeIcon from '../../../assets/icons/new/HomeIcon';
import DexRankIcon from '../../../assets/icons/new/DexRankIcon';
import BuyRaxIcon from '../../../assets/icons/new/BuyRaxIcon';
import clsx from 'clsx';
import {ConnectButton} from '@rainbow-me/rainbowkit';


export const Header: FC<any> = React.memo(() => {
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
      <div className={s.Header__wallet}>
        <ConnectButton.Custom>
          {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted
            }) => {
            const isReady = mounted && authenticationStatus !== 'loading';
            const isConnected =
              isReady &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === 'authenticated');
            return (() => {
              if(!isConnected) {
                return (
                  <>
                      <button
                        onClick={openConnectModal}
                      >
                        Sign-In
                      </button>
                  </>
                );
              }
              if(chain.unsupported) {
                return (
                  <AnimatedGradientButton
                    selected
                    onClick={openChainModal}
                    width={136}
                    height={40}
                  >
                    Wrong network
                  </AnimatedGradientButton>
                );
              }
              return (
                <>
                  {/*authorized*/}
                </>
              );
            })();
          }}
        </ConnectButton.Custom>
      </div>
    </header>
  );
});
