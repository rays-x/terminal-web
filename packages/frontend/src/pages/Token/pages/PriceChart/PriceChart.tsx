import React, {useContext} from 'react';
import {PriceChartStyled} from './PriceChert-styled';
import {ChartComponent} from './chart/Chart';
import {ChartCoinsButton} from '../../../../components/_old/ui/Buttons/ChartCoinsButton/ChartCoinsButton';
import {useLazyFetch} from '../../../../hooks/useFetch';
import {CurrentCoinData} from '../../CoinPage';
import {TokenPairsResponse} from '../../../../types/api/TokenPairsResponse';

export const PriceChart: React.FC = React.memo(() => {
  const currentCoinData = useContext(CurrentCoinData);
  const [pairs, setPairs] = React.useState<Array<TokenPairsResponse['items'][0] & { reverseOrder: boolean }>>([]);
  const [pairSelected, setPairSelected] = React.useState<number>(0);
  const [, getPairs] = useLazyFetch<TokenPairsResponse>({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/token`,
    withCredentials: false
  });
  React.useEffect(() => {
    if(!currentCoinData.id) {
      return;
    }
    getPairs({
      url: `/${currentCoinData.id}/pairs`
    }).then(({data: {items: pairs}}) => {
      setPairs(pairs.map(pair => {
        return pair.base.id === currentCoinData.id ? {
          ...pair,
          reverseOrder: false
        } : {
          ...pair,
          base: pair.quote,
          quote: pair.base,
          reverseOrder: true
        };
      }));
    });
  }, [currentCoinData.id]);

  return (
    <>
      {
        pairs[pairSelected]
          ? (
            <PriceChartStyled.Container>
              <PriceChartStyled.GraphContainer>
                <PriceChartStyled.CoinPairs>
                  {pairs.map((btn, index) => (
                    <ChartCoinsButton
                      key={btn.id}
                      isSelected={pairSelected === index}
                      coinsPair={{
                        firstCoin: {
                          label: btn.base.symbol,
                          src: btn.base.image
                        },
                        secondCoin: {
                          label: btn.quote.symbol,
                          src: btn.quote.image
                        }
                      }}
                      onClick={() => setPairSelected(index)}
                    />
                  ))}
                </PriceChartStyled.CoinPairs>
                {
                  <ChartComponent pair={pairs[pairSelected]}/>
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
