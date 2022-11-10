import React, {FC, useContext} from 'react';
import {CoinPageStyled} from '../../../Coin-styled';
import {CurrentCoinData} from '../../../CoinPage';
import RefM from '../../../../../assets/icons/RefM';
import RefCoinGeko from '../../../../../assets/icons/RefCoinGeko';
import RefBlack from '../../../../../assets/icons/RefBlack';
import RefNet from '../../../../../assets/icons/RefNet';
import RefTwitter from '../../../../../assets/icons/RefTwitter';
import RefTelegram from '../../../../../assets/icons/RefTelegram';

export const CoinLinks: FC = () => {
  const currentCoinData = useContext(CurrentCoinData);
  return (
    <CoinPageStyled.CurrentCoinRefs>
      {currentCoinData?.link_coinMarketCap && (
        <a href={currentCoinData?.link_coinMarketCap!}>
          <RefM/>
        </a>
      )}
      {currentCoinData?.link_coinGecko && (
        <a href={currentCoinData?.link_coinGecko!}>
          <RefCoinGeko/>
        </a>
      )}
      {currentCoinData?.link_binance && (
        <a href={currentCoinData?.link_binance!}>
          <RefBlack/>
        </a>
      )}
      {currentCoinData?.link_homepage && (
        <a href={currentCoinData?.link_homepage!}>
          <RefNet/>
        </a>
      )}
      {currentCoinData?.link_twitter && (
        <a href={currentCoinData?.link_twitter!}>
          <RefTwitter style={{marginLeft: '-8px'}}/>
        </a>
      )}
      {currentCoinData?.link_telegram && (
        <a href={currentCoinData?.link_telegram!}>
          <RefTelegram/>
        </a>
      )}
    </CoinPageStyled.CurrentCoinRefs>
  );
};
