import React, {createContext, FC} from 'react';
import {CoinPageStyled} from './Coin-styled';
import {CurrentCoin} from './components/CurrentCoin/CurrentCoin';
import {Statistic} from './components/Statistic/Statistic';
import {SubPage} from './components/SubPage/SubPage';
import {Loader} from '../../components/_old/ui/Loader/Loader';
import {Card} from '../../components/_old/ui/Card/Card';
import {useAdaptiveTriggers} from '../../hooks/useAdaptiveTrigger';
import {useFetch} from '../../hooks';
import {CmcDetail} from './types';
import {useParams} from 'react-router';

type CoinMainPage = {
  circulation_supply?: number;
  daily_volume?: number;
  daily_volume_change?: number;
  fully_diluted_mc?: number;
  fully_diluted_mc_change?: number;
  id?: string;
  image?: string;
  index?: string;
  link_binance?: string;
  link_coinGecko?: string;
  link_coinMarketCap?: string;
  link_homepage?: string;
  link_telegram?: string;
  link_twitter?: string;
  market_cap?: number;
  name?: string;
  platform_binance?: string;
  platform_ethereum?: string;
  price_btc?: number;
  price_change_1h?: number;
  price_change_7d?: number;
  price_change_24h?: number;
  price_change_btc?: number;
  price_change_eth?: number;
  price_change_usd?: number;
  price_eth?: number;
  price_usd?: number;
  total_supply?: number;
};
export const CurrentCoinData = createContext<CoinMainPage | undefined | null>(
  null
);

export const CoinPage: FC = () => {
  const {token} = useParams();
  const {data: _data} = useFetch<CmcDetail>({
    url: 'https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail',
    params: {
      id: token
    },
    withCredentials: false
  });
  const {data, loading} = {
    data: {
      coinMainPage: {}
    },
    loading: false
  };

  console.log('_data', _data);

  const {isMobile} = useAdaptiveTriggers({});

  return (
    <CurrentCoinData.Provider value={data?.coinMainPage}>
      {loading ? (
        <Loader/>
      ) : (
        <>
          <CoinPageStyled.Group>
            <CoinPageStyled.VerticalGroup>
              <CurrentCoin/>
              <Statistic/>
            </CoinPageStyled.VerticalGroup>
            {!isMobile && <Card/>}
          </CoinPageStyled.Group>
          <SubPage/>
        </>
      )}
    </CurrentCoinData.Provider>
  );
};
