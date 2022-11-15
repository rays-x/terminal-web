import React from 'react';
import {PriceChartStyled} from './PriceChert-styled';
import {ChartComponent} from './chart/Chart';
import {ChartCoinsButton} from '../../../../components/_old/ui/Buttons/ChartCoinsButton/ChartCoinsButton';
import {useFetch} from '../../../../hooks';
import {useParams} from 'react-router';
import {CmcSearch} from './types';
import {CMC_ID_PANCAKE_V2, CMC_ID_UNISWAP_V2, CMC_ID_UNISWAP_V3} from '../../../../constants/coinmarketcap';
import {useLazyFetch} from '../../../../hooks/useFetch';
import {CmcPairInfo} from './chart/types';
import {get} from 'lodash';

export const PriceChart: React.FC = React.memo(() => {
  const {token, chain} = useParams();
  const [id] = token.split('_');
  const [pairAddress, setPairAddress] = React.useState<string>(undefined);

  const {data: _data, loading: _loading} = useFetch<CmcSearch>({
    url: `${import.meta.env.VITE_BACKEND_PROXY_URL}/dexer/v3/dexer/search/main-site`,
    params: {
      keyword: id,
      all: true
    },
    withCredentials: false
  });

  const [{data: _dataPairs, loading: _loadingPairs}, getPairsInfo] = useLazyFetch<{
    [k: string]: CmcPairInfo['data']
  }>({
    url: `${import.meta.env.VITE_BACKEND_URL}/cmc/dex/pairs-info`,
    withCredentials: false
  });

  React.useEffect(() => {
    if (!_data?.data) {
      return;
    }
    const {data} = _data;
    const pairs = data.pairs
      .filter(pair => (
        chain === 'eth'
          ? [CMC_ID_UNISWAP_V3, CMC_ID_UNISWAP_V2]
          : [CMC_ID_PANCAKE_V2]
      ).includes(pair.exchangeId));
    getPairsInfo({
      params: {
        platform: chain === 'eth' ? 'Ethereum' : 'BSC',
        pairs: pairs.map(pair => pair.pairContractAddress.toLowerCase())
      }
    }).catch();
  }, [_data]);

  const compareButtons = React.useMemo(() => {
    if (!_dataPairs) {
      return [];
    }
    const dataPairs = Object.values(_dataPairs)
      .sort((a, b) => {
        return (Number(b.volume24h) || 0) - (Number(a.volume24h) || 0);
      })
      .map(pair => ({
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
      }));
    setPairAddress(get(dataPairs, '0.id'));
    return dataPairs;
  }, [_dataPairs]);
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
                    ? <ChartComponent pair={_dataPairs[pairAddress]}/>
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
