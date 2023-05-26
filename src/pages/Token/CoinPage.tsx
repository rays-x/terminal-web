import React, {createContext, FC} from 'react';
import {CoinPageStyled} from './Coin-styled';
import {CurrentCoin} from './components/CurrentCoin/CurrentCoin';
import {Statistic} from './components/Statistic/Statistic';
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
import {useAdaptiveTriggers} from '../../hooks/useAdaptiveTrigger';
import Swap from './components/Swap/Swap';
import {SubPage} from './components/SubPage/SubPage';


export const CurrentCoinData = createContext<CoinMainPage | undefined | null>(undefined);

export const CoinPage: FC = React.memo(() => {
  const {isMobile} = useAdaptiveTriggers();
  const {token: slug} = useParams();
  const [token, setToken] = React.useState<CoinMainPage>();
  const {data: data} = useFetch<CmcDetail['data']>({
    url: `${import.meta.env.VITE_BACKEND_URL}/token/${slug}`,
    withCredentials: false
  });
  
  React.useEffect(() => {
    if (!data) {
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
      coingecko_slug: data.slug,
      image: data.logoURI,
      rank: String(data.statistics.rank || '') || undefined,
      index: data.symbol,
      link_binance: undefined,
      link_coinGecko: `https://www.coingecko.com/en/coins/${data.slug}/`,
      link_coinMarketCap: `https://coinmarketcap.com/currencies/${data.cmcSlug}/`,
      link_homepage: get(data, 'urls.website.0'),
      link_telegram: undefined,
      link_twitter: get(data, 'urls.twitter.0'),
      market_cap: data.statistics.marketCap || (
        data.selfReportedCirculatingSupply ?
          Number(data.selfReportedCirculatingSupply) * data.statistics.price
          : undefined
      ),
      name: data.name,
      platforms: data.platforms,
      price_btc: Number.parseFloat(data.statistics.priceBtc),
      price_change_1h: data.statistics.priceChangePercentage1h,
      price_change_7d: data.statistics.priceChangePercentage7d,
      price_change_24h: data.statistics.priceChangePercentage24h,
      price_change_btc: data.statistics.priceBtcChangePercentage24h,
      price_change_eth: data.statistics.priceEthChangePercentage24h,
      price_change_usd: data.statistics.priceChangePercentage24h,
      price_eth: Number.parseFloat(data.statistics.priceEth),
      price_usd: data.statistics.price,
      total_supply: data.statistics.totalSupply,
      dateLaunched: data.dateLaunched ? new Date(data.dateLaunched) : (
        data.dateAdded
          ? new Date(data.dateAdded)
          : undefined
      )
    });
  }, [data]);

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
                  {!isMobile && <Swap/>}
                </CoinPageStyled.Group>
                <SubPage/>
              </>
            )
        }
      </CurrentCoinData.Provider>
    </CmcTokenSocketProvider>
  );
});
