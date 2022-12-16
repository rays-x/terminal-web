import React, {useContext} from 'react';
import {PriceChartStyled} from './PriceChert-styled';
import {ChartComponent} from './chart/Chart';
import {ChartCoinsButton} from '../../../../components/_old/ui/Buttons/ChartCoinsButton/ChartCoinsButton';
import {useFetch} from '../../../../hooks';
import {useParams} from 'react-router';
import {CmcSearch} from './types';
import {
  CMC_ID_BTC_PLATFORM,
  CMC_ID_ETH_PLATFORM,
  CMC_ID_PANCAKE_V2,
  CMC_ID_UNISWAP_V2,
  CMC_ID_UNISWAP_V3
} from '../../../../constants/coinmarketcap';
import {useLazyFetch} from '../../../../hooks/useFetch';
import {CmcPairInfo} from './chart/types';
import {get} from 'lodash';
import {CurrentCoinData} from '../../CoinPage';
import {data} from '../TradingStats/TradingStats';

export const PriceChart: React.FC = React.memo(() => {
  const currentCoinData = useContext(CurrentCoinData);
  const ids = React.useMemo(() => {
    return [currentCoinData.platform_ethereum, currentCoinData.platform_binance].filter(Boolean);
  }, [currentCoinData.id]);
  const [pairAddress, setPairAddress] = React.useState<string>(undefined);

  const [dataPairs, setDataPairs] = React.useState({});
  const [, getSearch] = useLazyFetch<CmcSearch>({
    url: `${import.meta.env.VITE_BACKEND_PROXY_URL}/dexer/v3/dexer/search/main-site`,
    withCredentials: false
  });

  React.useEffect(() => {
    if (!ids.length) {
      return;
    }
    (async () => {
      const _pairsData = (await Promise.all(ids.map(async id => {
        const {data: {data: {pairs}}} = await getSearch({
          params: {
            keyword: id,
            all: true
          }
        });
        const pairsBtc = pairs
          .filter(pair => pair.platformId === CMC_ID_BTC_PLATFORM)
          .map(pair => pair.pairContractAddress.toLowerCase());
        const pairsEth = pairs
          .filter(pair => pair.platformId === CMC_ID_ETH_PLATFORM)
          .map(pair => pair.pairContractAddress.toLowerCase());
        return (await Promise.all([
          {platform: 'BSC', pairs: pairsBtc},
          {platform: 'Ethereum', pairs: pairsEth}
        ].map(async ({pairs, platform}) => {
          return pairs.length ?
            Object.values((await getPairsInfo({
              data: {
                platform,
                pairs
              }
            })).data) : undefined;
        }))).filter(Boolean).flatMap(_ => _);
      }))).flatMap(_ => _).reduce((prev, pair) => {
        const found = prev.findIndex(({id}) => id === pair.address) > -1;
        return found ? prev : [...prev, pair];
      }, []);
      setDataPairs(prev => ({
        ...prev,
        ...Object.fromEntries(_pairsData.map(({address, ...rest}) => [address, {address, ...rest}]))
      }));
      const compareButtons = _pairsData
        .sort((a, b) => {
          return (Number(b.volume24h) || 0) - (Number(a.volume24h) || 0);
        })
        .map(pair => {
          return {
            id: pair.address,
            baseToken: {
              symbol: pair.baseToken.symbol,
              image:
                pair.baseToken.id
                  ? `https://s2.coinmarketcap.com/static/img/coins/64x64/${pair.baseToken.id}.png`
                  : null
            },
            quoteToken: {
              symbol: pair.quoteToken.symbol,
              image:
                pair.quoteToken.id
                  ? `https://s2.coinmarketcap.com/static/img/coins/64x64/${pair.quoteToken.id}.png`
                  : null
            }
          };
        });
      setCompareButtons(compareButtons);
      setPairAddress(get(compareButtons, '0.id'));
    })();
  }, [ids]);

  const [, getPairsInfo] = useLazyFetch<{
    [k: string]: CmcPairInfo['data']
  }>({
    url: `${import.meta.env.VITE_BACKEND_URL}/cmc/dex/pairs-info`,
    withCredentials: false,
    method: 'POST'
  });

  const [compareButtons, setCompareButtons] = React.useState([]);
  return (
    <>
      {
        compareButtons.length
          ? (
            <PriceChartStyled.Container>
              <PriceChartStyled.GraphContainer>
                <PriceChartStyled.CoinPairs>
                  {compareButtons.map((btn) => (
                    <ChartCoinsButton
                      key={btn.id}
                      isSelected={pairAddress === btn.id}
                      coinsPair={{
                        firstCoin: {
                          label: btn.baseToken.symbol,
                          src: btn.baseToken.image
                        },
                        secondCoin: {
                          label: btn.quoteToken.symbol,
                          src: btn.quoteToken.image
                        }
                      }}
                      onClick={() => setPairAddress(btn.id)}
                    />
                  ))}
                </PriceChartStyled.CoinPairs>
                {
                  pairAddress
                    ? <ChartComponent pair={dataPairs[pairAddress]}/>
                    : null
                }
              </PriceChartStyled.GraphContainer>
              {/*{!isMobile && <PriceChartStyled.CurrentCoin/>}*/}
            </PriceChartStyled.Container>
          )
          : null
      }
    </>
  );
});
