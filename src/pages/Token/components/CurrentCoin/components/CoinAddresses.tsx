import React, {FC, useContext} from 'react';
import {CoinPageStyled} from '../../../Coin-styled';
import {CurrentCoinData} from '../../../CoinPage';
import BSCImage from '../../../../../assets/icons/BSCImage.png';
import ETHImage from '../../../../../assets/icons/ETHImage.png';
import CoinPairShare from '../../../../../assets/icons/CoinPairShare';
import s from '../../../../../components/_old2/Dropdown/DropdownItem.module.scss';
import copy from 'copy-to-clipboard';
import { addressFormat } from '../../../../../utils/addressFormat';


export const CoinAddresses: FC = () => {
  const currentCoinData = useContext(CurrentCoinData);

  return (
    <CoinPageStyled.CurrentCoinAddresses>
      {currentCoinData?.platforms.length && currentCoinData.platforms.map((platform) => (
        <CoinPageStyled.CoinAddress key={platform.address + platform.blockchain.name}>
          <img
            src={platform.blockchain.image}
            style={{width: 20, height: 20}}
            alt={''}
          />
          <div>
            <a href={platform.blockchain.url} style={{ textDecoration : "none"}}>
              <span>{platform.blockchain.name}</span>{' '}
              {addressFormat(platform.address)}
            </a>
          </div>
          {/*<MetaMask/>*/}
          <CoinPairShare className={s.CopyToBuffer} color={'#ffffffb3'}
                         onClick={() => {
                           copy(platform.address);
                         }}
          />
        </CoinPageStyled.CoinAddress>
      ))}
    </CoinPageStyled.CurrentCoinAddresses>
  );
};
