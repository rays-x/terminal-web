import React, {FC, useContext} from 'react';
import {CoinPageStyled} from '../../../Coin-styled';
import {CurrentCoinData} from '../../../CoinPage';
import BSCImage from '../../../../../assets/icons/BSCImage.png';
import MetaMask from '../../../../../assets/icons/MetaMask';
import ETHImage from '../../../../../assets/icons/ETHImage.png';

const addressFormat = (address: string) =>
  `${address.slice(0, 5)}...${address.slice(-3)}`;

export const CoinAddresses: FC = () => {
  const currentCoinData = useContext(CurrentCoinData);
  return (
    <CoinPageStyled.CurrentCoinAddresses>
      {currentCoinData?.platform_binance && (
        <CoinPageStyled.CoinAddress>
          {/*todo change to <Icons.BscIcon/>*/}
          <img
            src={BSCImage}
            style={{width: 20, height: 20}}
            alt={''}
          />
          <div>
            <span>BSC:</span> {addressFormat(currentCoinData?.platform_binance)}
          </div>
          <MetaMask/>
        </CoinPageStyled.CoinAddress>
      )}
      {currentCoinData?.platform_ethereum && (
        <CoinPageStyled.CoinAddress>
          <img
            src={ETHImage}
            style={{width: 20, height: 20}}
            alt={''}
          />
          <div>
            <span>ETH:</span>{' '}
            {addressFormat(currentCoinData?.platform_ethereum)}
          </div>
          <MetaMask/>
        </CoinPageStyled.CoinAddress>
      )}
    </CoinPageStyled.CurrentCoinAddresses>
  );
};
