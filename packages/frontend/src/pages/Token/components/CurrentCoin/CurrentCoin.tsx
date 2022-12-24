import React, {useContext} from 'react';
import {CoinPageStyled} from '../../Coin-styled';
import {CurrentCoinData} from '../../CoinPage';
import {EMDASH} from '../../../../utils/data/utf';
import {CoinPriceChange} from './components/CoinPriceChange';
import {CoinLinks} from './components/CoinLinks';
import {CoinAddresses} from './components/CoinAddresses';
import {Card} from '../../../../components/_old/ui/Card/Card';
import {TypographyArrow} from '../../../../components/_old/ui/Typography/Typography';
import {ColorVariant} from '../../../../components/_old/ui/Typography/Typography-styled';
import {LinkButton} from '../../../../components/_old/ui/Buttons/LinkButton/LinkButton';
import Star from '../../../../assets/icons/Star';
import Share from '../../../../assets/icons/Share';
import Bell from '../../../../assets/icons/Bell';
import Fall from '../../../../assets/icons/fall';
import Rise from '../../../../assets/icons/rise';
import {CMC_ID_ETH} from '../../../../constants/coinmarketcap';

export const CurrentCoin = React.memo(() => {
  const currentCoinData = useContext(CurrentCoinData);
  const CMC_ID = Number(currentCoinData?.cmc);

  return (
    <Card>
      <CoinPageStyled.CurrentCoinNavigation>
        <CoinPageStyled.CurrentCoinTitle>
          <CoinPageStyled.CurrentCoinImage src={currentCoinData?.image!}/>
          <div>{currentCoinData?.name || EMDASH}</div>
        </CoinPageStyled.CurrentCoinTitle>
        <CoinPageStyled.CurrentCoinLinks>
          <LinkButton>
            <Star height={18} width={18}/>
          </LinkButton>
          <LinkButton>
            <Share height={18} width={18}/>
          </LinkButton>
          <LinkButton>
            <Bell height={18} width={18}/>
          </LinkButton>
          {
            currentCoinData?.rank
              ? (
                <CoinPageStyled.CoinRangButton>
                  Rax Rank #{currentCoinData?.rank}
                </CoinPageStyled.CoinRangButton>
              )
              : null
          }
        </CoinPageStyled.CurrentCoinLinks>
        <CoinLinks/>
        <CoinAddresses/>
      </CoinPageStyled.CurrentCoinNavigation>
      <CoinPageStyled.CoinStatsGroup>
        {/*<CoinPageStyled.CurrentCoinScore></CoinPageStyled.CurrentCoinScore>*/}
        <CoinPageStyled.CurrentCoinStats>
          <CoinPageStyled.CoinStatsTitleGroup>
            <CoinPageStyled.CoinStatsTitleLabel
              color={
                currentCoinData?.price_change_usd! > 0
                  ? ColorVariant.rise
                  : ColorVariant.fall
              }
            >
              ${currentCoinData?.price_usd || EMDASH}
            </CoinPageStyled.CoinStatsTitleLabel>
            <CoinPageStyled.CoinStatsTitleChange
              color={
                currentCoinData?.price_change_usd! > 0
                  ? ColorVariant.rise
                  : ColorVariant.fall
              }
            >
              {currentCoinData?.price_change_usd! > 0 ? (
                <Rise color={'white'}/>
              ) : (
                <Fall color={'white'}/>
              )}
              <div>
                {Math.abs(currentCoinData?.price_change_usd!)?.toFixed(2) ||
                  EMDASH}
                %
              </div>
            </CoinPageStyled.CoinStatsTitleChange>
          </CoinPageStyled.CoinStatsTitleGroup>
          <div>
            <CoinPageStyled.CoinStatsPriceChange>
              <CoinPageStyled.CoinStatsPriceChangeTitle>
                {
                  (currentCoinData?.price_btc
                      ? Number(currentCoinData?.price_btc).toLocaleString('en-US', {
                        useGrouping: false,
                        maximumFractionDigits: 18
                      })
                      : null
                  ) || EMDASH
                } BTC
              </CoinPageStyled.CoinStatsPriceChangeTitle>
              <TypographyArrow
                color={
                  currentCoinData?.price_change_btc! > 0
                    ? ColorVariant.rise
                    : ColorVariant.fall
                }
                lineHeight={14}
                fontSize={11}
              >
                {currentCoinData?.price_change_btc?.toFixed(3) || EMDASH}%
              </TypographyArrow>
            </CoinPageStyled.CoinStatsPriceChange>
            {
              CMC_ID !== CMC_ID_ETH
                ? (
                  <CoinPageStyled.CoinStatsPriceChange>
                    <CoinPageStyled.CoinStatsPriceChangeTitle>
                      {
                        (currentCoinData?.price_eth
                            ? Number(currentCoinData?.price_eth).toLocaleString('en-US', {
                              useGrouping: false,
                              maximumFractionDigits: 18
                            })
                            : null
                        )
                      } ETH
                    </CoinPageStyled.CoinStatsPriceChangeTitle>
                    <TypographyArrow
                      color={
                        currentCoinData?.price_change_eth! > 0
                          ? ColorVariant.rise
                          : ColorVariant.fall
                      }
                      lineHeight={14}
                      fontSize={11}
                    >
                      {currentCoinData?.price_change_eth?.toFixed(3)}%
                    </TypographyArrow>
                  </CoinPageStyled.CoinStatsPriceChange>
                )
                : null
            }
          </div>
          <CoinPageStyled.CoinPriceChangeGroups>
            <CoinPriceChange
              title={'Price Change (1h)'}
              value={currentCoinData?.price_change_1h!}
            />
            <CoinPriceChange
              title={'Price Change (24h)'}
              value={currentCoinData?.price_change_24h!}
            />
            <CoinPriceChange
              title={'Price Change (7d)'}
              value={currentCoinData?.price_change_7d!}
            />
          </CoinPageStyled.CoinPriceChangeGroups>
        </CoinPageStyled.CurrentCoinStats>
      </CoinPageStyled.CoinStatsGroup>
    </Card>
  );
});
