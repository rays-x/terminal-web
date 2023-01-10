import React, {createContext, FC} from 'react';
import {CoinPageStyled} from './Coin-styled';
import {CurrentCoin} from './components/CurrentCoin/CurrentCoin';
import {Statistic} from './components/Statistic/Statistic';
import {SubPage} from './components/SubPage/SubPage';
import {Loader} from '../../components/_old/ui/Loader/Loader';
import {useFetch} from '../../hooks';
import {CmcDetail, CoinMainPage} from './types';
import {useParams} from 'react-router';
import {get} from 'lodash';
import {useCmcSocket} from '../../store/cmcSocket';
import {JsonPrimitive} from 'react-use-websocket/dist/lib/types';
import {toFixedToken} from '../../utils/diff';
import {CmcTokenSocketProvider} from '../../store/cmcTokenSocket';
import {useLazyFetch} from '../../hooks/useFetch';


export const CurrentCoinData = createContext<CoinMainPage | undefined | null>(undefined);

export const CoinPage: FC = React.memo(() => {
  const {token: slug} = useParams();
  const [token, setToken] = React.useState<CoinMainPage>();
  const {data: data} = useFetch<CmcDetail['data']>({
    url: `${import.meta.env.VITE_BACKEND_URL}/token/${slug}`,
    withCredentials: false
  });
  const [{data: dataBtc}, getBtc] = useLazyFetch<CmcDetail['data']>({
    url: `${import.meta.env.VITE_BACKEND_URL}/token/bitcoin`,
    withCredentials: false
  });
  const [{data: dataEth}, getEth] = useLazyFetch<CmcDetail['data']>({
    url: `${import.meta.env.VITE_BACKEND_URL}/token/ethereum`,
    withCredentials: false
  });
  const {sendMessage, lastMessage} = useCmcSocket();
  React.useEffect(() => {
    if(slug !== 'bitcoin') {
      getBtc().catch();
    }
    if(slug !== 'ethereum') {
      getEth().catch();
    }
  }, [slug]);
  React.useEffect(() => {
    if(!data || (
      slug !== 'bitcoin'
        ? !dataBtc
        : false
    ) || (
      slug !== 'ethereum'
        ? !dataEth
        : false
    )) {
      return;
    }
    setToken({
      circulation_supply: data.statistics.circulatingSupply || toFixedToken(data.selfReportedCirculatingSupply, 5),
      daily_volume: data.volume,
      daily_volume_change: data.volumeChangePercentage24h,
      fully_diluted_mc: data.statistics.fullyDilutedMarketCap,
      fully_diluted_mc_change: data.statistics.fullyDilutedMarketCapChangePercentage24h,
      id: String(data.id),
      cmc: Number(data.cmc),
      image: `https://s2.coinmarketcap.com/static/img/coins/64x64/${data.cmc}.png`,
      rank: String(data.statistics.rank || '') || undefined,
      index: data.symbol,
      link_binance: undefined,
      link_coinGecko: undefined,
      link_coinMarketCap: `https://coinmarketcap.com/currencies/${data.slug}/`,
      link_homepage: get(data, 'urls.website.0'),
      link_telegram: undefined,
      link_twitter: get(data, 'urls.twitter.0'),
      market_cap: data.statistics.marketCap || (
        data.selfReportedCirculatingSupply ?
          Number(data.selfReportedCirculatingSupply) * data.statistics.price
          : undefined
      ),
      name: data.name,
      platform_binance: get(get(data, 'platforms', []).find(_ => _.platform?.chainId === 56), 'address', '').toLowerCase() || undefined,
      platform_ethereum: get(get(data, 'platforms', []).find(_ => _.platform?.chainId === 1), 'address', '').toLowerCase() || undefined,
      price_btc: dataBtc ? (1 / dataBtc.statistics.price) * data.statistics.price : undefined,
      price_change_1h: data.statistics.priceChangePercentage1h,
      price_change_7d: data.statistics.priceChangePercentage7d,
      price_change_24h: data.statistics.priceChangePercentage24h,
      price_change_btc: dataBtc ? data.statistics.priceChangePercentage24h - dataBtc.statistics.priceChangePercentage24h : undefined,
      price_change_eth: dataEth ? data.statistics.priceChangePercentage24h - dataEth.statistics.priceChangePercentage24h : undefined,
      price_change_usd: data.statistics.priceChangePercentage24h,
      price_eth: dataEth ? (1 / dataEth.statistics.price) * data.statistics.price : undefined,
      price_usd: data.statistics.price,
      total_supply: data.statistics.totalSupply,
      dateLaunched: data.dateLaunched ? new Date(data.dateLaunched) : (
        data.dateAdded
          ? new Date(data.dateAdded)
          : undefined
      )
    });
  }, [data, dataBtc, dataEth]);

  React.useEffect(() => {
    if(!data || (
      slug !== 'bitcoin'
        ? !dataBtc
        : false
    ) || (
      slug !== 'ethereum'
        ? !dataEth
        : false
    )) {
      return;
    }
    sendMessage({
      method: 'subscribe',
      id: 'price',
      data: {
        cryptoIds: [...new Set([data.cmc, dataBtc?.cmc, dataEth?.cmc].filter(Boolean))] as unknown as JsonPrimitive,
        index: 'detail'
      }
    });
    return () => {
      sendMessage({
        method: 'unsubscribe',
        id: 'unsubscribePrice'
      });
    };
  }, [data, dataBtc, dataEth]);

  React.useEffect(() => {
    if(!lastMessage) {
      return;
    }
    const {id, d} = lastMessage;
    switch(id) {
      case 'price': {
        const {cr} = d;
        if(
          token?.price_usd === undefined
          || token?.price_change_24h === undefined
        ) {
          return;
        }
        setToken(prev => {
          switch(cr.id) {
            case data?.cmc: {
              Object.keys(cr).forEach(key => {
                switch(key) {
                  case 'p': {
                    prev['price_usd'] = cr.p || prev['price_usd'];
                    break;
                  }
                  case 'p1h': {
                    prev['price_change_1h'] = cr.p1h || prev['price_change_1h'];
                    break;
                  }
                  case 'p24h': {
                    prev['price_change_24h'] = cr.p24h || prev['price_change_24h'];
                    break;
                  }
                  case 'p7d': {
                    prev['price_change_7d'] = cr.p7d || prev['price_change_7d'];
                    break;
                  }
                  case 'v': {
                    prev['daily_volume'] = cr.v || prev['daily_volume'];
                    break;
                  }
                  case 'vol24hpc': {
                    prev['daily_volume_change'] = cr.vol24hpc || prev['daily_volume_change'];
                    break;
                  }
                  case 'mc': {
                    prev['market_cap'] = cr.mc || prev['market_cap'];
                    break;
                  }
                  case 'ts': {
                    prev['total_supply'] = cr.ts || prev['total_supply'];
                    break;
                  }
                }
              });
              break;
            }
            case dataBtc?.cmc: {
              const priceBtc = get(cr, 'p', NaN);
              prev['price_btc'] = (1 / priceBtc) * prev.price_usd;
              prev['price_change_btc'] = prev.price_change_24h - cr.p24h;
              break;
            }
            case dataEth?.cmc: {
              const priceEth = get(cr, 'p', NaN);
              prev['price_eth'] = (1 / priceEth) * prev.price_usd;
              prev['price_change_eth'] = prev.price_change_24h - cr.p24h;
              break;
            }
          }
          return prev;
        });
        break;
      }
    }
  }, [lastMessage]);
  // console.log(data?.price_usd);
  return (
    <CmcTokenSocketProvider>
      <CurrentCoinData.Provider value={{...token}}>
        {
          !token
            ? (
              <Loader/>
            ) : (
              <>
                <CoinPageStyled.Group>
                  <CoinPageStyled.VerticalGroup>
                    <CurrentCoin/>
                    <Statistic/>
                  </CoinPageStyled.VerticalGroup>
                  {/*{!isMobile && <Card/>}*/}
                </CoinPageStyled.Group>
                {/*<SubPage/>*/}
              </>
            )
        }
      </CurrentCoinData.Provider>
    </CmcTokenSocketProvider>
  );
});
