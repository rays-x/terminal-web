import React, {FC, useContext} from 'react';
import {CoinPageStyled} from '../../../Coin-styled';
import {CurrentCoinData} from '../../../CoinPage';
import BSCImage from '../../../../../assets/icons/BSCImage.png';
import ETHImage from '../../../../../assets/icons/ETHImage.png';
import CoinPairShare from '../../../../../assets/icons/CoinPairShare';
import s from '../../../../../components/_old2/Dropdown/DropdownItem.module.scss';
import copy from 'copy-to-clipboard';

const addressFormat = (address: string) =>
  `${address.slice(0, 5)}...${address.slice(-3)}`;

export const CoinAddresses: FC = () => {
  const currentCoinData = useContext(CurrentCoinData);
  return (
    <CoinPageStyled.CurrentCoinAddresses>
      {currentCoinData?.platform_binance && (
        <CoinPageStyled.CoinAddress>
          <img
            src={BSCImage}
            style={{width: 20, height: 20}}
            alt={''}
          />
          <div>
            <span>BSC:</span> {addressFormat(currentCoinData?.platform_binance)}
          </div>
          {/*<MetaMask/>*/}
          <CoinPairShare className={s.CopyToBuffer} color={'#ffffffb3'}
                         onClick={() => {
                           copy(currentCoinData?.platform_binance);
                         }}
          />
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
          {/*<MetaMask/>*/}
          <CoinPairShare className={s.CopyToBuffer} color={'#ffffffb3'}
                         onClick={() => {
                           copy(currentCoinData?.platform_ethereum);
                         }}
          />
        </CoinPageStyled.CoinAddress>
      )}
    </CoinPageStyled.CurrentCoinAddresses>
  );
};
