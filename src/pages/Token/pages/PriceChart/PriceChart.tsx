import React, {createContext, useContext} from 'react';
import {PriceChartStyled} from './PriceChert-styled';
import {ChartComponent} from './chart/Chart';
import {ChartCoinsButton} from '../../../../components/_old/ui/Buttons/ChartCoinsButton/ChartCoinsButton';
import {CurrentCoinData} from '../../CoinPage';
import {TokenPairsResponse} from '../../../../types/api/TokenPairsResponse';
import {useFetch} from '../../../../hooks';

export const PriceChart: React.FC = React.memo(() => {
  const currentCoinData = useContext(CurrentCoinData);
  const [pairs, setPairs] = React.useState<Array<TokenPairsResponse['items'][0] & { reverseOrder: boolean }>>([]);
  const [pairSelected, setPairSelected] = React.useState<number>(0);
  const {data} = useFetch<TokenPairsResponse>({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/token/${currentCoinData.id}/pairs`,
    withCredentials: false
  });
  React.useEffect(() => {
    if(!data) {
      return;
    }
    setPairs(data?.items.map(pair => {
      return pair;
    }));
  }, [data]);
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
                          src: btn.base.image
                        },
                        secondCoin: {
                          src: btn.quote.image
                        },
                        name: btn.name
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
