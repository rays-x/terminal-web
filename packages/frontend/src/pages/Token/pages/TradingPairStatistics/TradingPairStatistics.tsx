import React, {useState} from 'react';
import {CoinPageStyled} from '../../Coin-styled';
import {CurrentCoinData} from '../../CoinPage';
import {TradingPairStatisticsRow} from './components/TableRow/TradingPairStatisticsRow';
import {TotalLiquidity} from './components/TotalLiquidity/TotalLiquidity';
import {Columns, TableCore} from '../../../../components/_old/ui/Table/Table';
import {HeaderStyled} from '../../../../components/_old/ui/Header/Header-styled';
import {TableStyled} from '../../../../components/_old/ui/Table/Table-styled';
import {HeaderVariant} from '../../../../components/_old/ui/Header/types';
import {get, set, take} from 'lodash';
import {
  PoolType,
  StatsPairStatisticsResponse,
  TransactionsPairsResponse,
  TransactionType
} from '../../types';
import UniswapIcon from '../../../../assets/icons/dex/uniswap.png';
import PancakeIcon from '../../../../assets/icons/dex/pancake.png';
import {useLazyFetch} from '../../../../hooks/useFetch';
import {CmcSearch} from '../PriceChart/types';
import {CmcPairInfo} from '../PriceChart/chart/types';
import s from '../../../Home/components/TokenList.module.scss';
import {
  HeaderCell, PercentageChange,
  RowNumber,
  Table,
  TableContent, TableFooter,
  TableHeader,
  TableRowLink, Token
} from '../../../../components/_old2/Table';
import {Loader} from '../../../../components/_old/ui/Loader/Loader';
import {RowText} from '../../../../components/_old2/Table/RowText/RowText';
import millify from 'millify';
import {toFixedToken} from '../../../../utils/diff';
import {EMDASH} from '../../../../utils/UTF';
import {Pair} from '../../../../components/_old2/Table/Pair/Pair';
import {PairPageStyled} from '../../Pair-styled';

const PAIRS_STATS_SLICE = 100;

enum SortByColumn {
  PAIR = 'pair',
  TRADES = 'trades',
  BUYS = 'buys',
  SELLS = 'sells',
  TRADERS = 'traders',
  BUYERS = 'buyers',
  SELLERS = 'sellers',
  VOLUME = 'volume',
  VOLUME_BUY = 'volumeBuy',
  VOLUME_SELL = 'volumeSell',
  LIQUIDITY = 'liquidity',
}

enum Show {
  SHOW5 = 5,
}

const valueOrDash = (value) => value === '0' ? EMDASH : value;

export const TradingPairStatistics: React.FC = React.memo(() => {
    const currentCoinData = React.useContext(CurrentCoinData);
    const [, getPairsInfo] = useLazyFetch<{
      [k: string]: CmcPairInfo['data']
    }>({
      url: `${import.meta.env.VITE_BACKEND_URL}/cmc/dex/pairs-info`,
      withCredentials: false,
      method: 'POST'
    });
    const [, getSearch] = useLazyFetch<CmcSearch>({
      url: `${import.meta.env.VITE_BACKEND_PROXY_URL}/dexer/v3/dexer/search/main-site`,
      withCredentials: false
    });
    const [, getPairs] = useLazyFetch<TransactionsPairsResponse>({
      url: `${import.meta.env.VITE_BACKEND_URL}/cmc/dex/pairs-list`,
      withCredentials: false
    });
    const [dataPairs, setDataPairs] = React.useState<TransactionsPairsResponse>();
    const [, getPairStats] = useLazyFetch<StatsPairStatisticsResponse>({
      url: `${import.meta.env.VITE_BACKEND_URL}/bq/stats/pair-statistics`,
      method: 'POST',
      withCredentials: false
    });
    const [dataMapTransactions, setDataMapTransactions] = React.useState<TransactionType[]>([]);
    const [dataPools, setDataPools] = React.useState<PoolType[]>([]);
    const totalLiquidity = React.useMemo(() => {
      return dataPools.reduce((p, n) => p + n.liquidity, 0);
    }, [dataPools]);
    React.useEffect(() => {
      if (!currentCoinData?.id) {
        return;
      }
      (async () => {
        const [main, eth, btc] = (await Promise.all([
          getPairs({
            params: {
              ethAddress: currentCoinData.platform_ethereum,
              btcAddress: currentCoinData.platform_binance
            }
          }).then(({data}) => data),
          currentCoinData.platform_ethereum
            ? getSearch({
              params: {
                keyword: currentCoinData.platform_ethereum,
                all: true
              }
            }).then(({data: {data: {pairs}}}) => {
              return getPairsInfo({
                data: {
                  platform: 'Ethereum',
                  pairs: pairs.map(pair => pair.pairContractAddress.toLowerCase())
                }
              }).then(({data}) => Object.values(data));
            })
            : Promise.resolve([]),
          currentCoinData.platform_binance
            ? getSearch({
              params: {
                keyword: currentCoinData.platform_binance,
                all: true
              }
            }).then(({data: {data: {pairs}}}) => {
              return getPairsInfo({
                data: {
                  platform: 'BSC',
                  pairs: pairs.map(pair => pair.pairContractAddress.toLowerCase())
                }
              }).then(({data}) => Object.values(data));
            })
            : Promise.resolve([])
        ]));
        eth.forEach(pair => {
          const index = main.ethPairs.findIndex(_pair => _pair.poolId === pair.poolId);
          if (index > -1) {
            set(main, `ethPairs.${index}`, {
              ...get(main, `ethPairs.${index}`, {}),
              ...pair
            });
          } else {
            main['ethPairs'].push(pair);
          }
        });
        btc.forEach(pair => {
          const index = main.btcPairs.findIndex(_pair => _pair.poolId === pair.poolId);
          if (index > -1) {
            set(main, `btcPairs.${index}`, {
              ...get(main, `btcPairs.${index}`, {}),
              ...pair
            });
          } else {
            main['btcPairs'].push(pair);
          }
        });
        setDataPairs(main);
      })();
    }, [currentCoinData?.id]);
    React.useEffect(() => {
      if (!dataPairs) {
        return;
      }
      const pairs: {
        [k: string]: {
          tokenVersusIcon: string,
          btcAddress_poolContract?: string[],
          ethAddress_poolContract?: string[],
          poolLiquidity?: string[]
        }
      } = {};
      take(
        dataPairs.btcPairs
          .sort((a, b) => {
            return Number(get(b, 'volume24h', 0)) - Number(get(a, 'volume24h', 0));
          })
          .filter(({address: _, pairContractAddress: __}) => _ || __)
          .filter((item) => {
            return get(item, 'poolInfoD.liquidity', get(item, 'liquidity'));
          })
          .filter((pair) => {
            return pair.baseToken.address === currentCoinData.platform_binance
              ? pair.quoteToken.id
              : pair.baseToken.id;
          }),
        PAIRS_STATS_SLICE
      ).forEach(pair => {
        const tokenVersusSymbol = pair.baseToken.address === currentCoinData.platform_binance
          ? pair.quoteToken.symbol
          : pair.baseToken.symbol;
        const tokenVersusImage = `https://s2.coinmarketcap.com/static/img/coins/128x128/${pair.baseToken.address === currentCoinData.platform_binance
          ? pair.quoteToken.id
          : pair.baseToken.id}.png`;
        set(pairs, tokenVersusSymbol, {
          ...get(pairs, tokenVersusSymbol, {}),
          tokenVersusIcon: tokenVersusImage,
          btcAddress_poolContract: [
            ...(get(pairs, `${tokenVersusSymbol}.btcAddress_poolContract`, []) as string[]),
            `${currentCoinData.platform_binance}_${pair.pairContractAddress || pair.address}`
          ],
          poolLiquidity: [
            ...(get(pairs, `${tokenVersusSymbol}.poolLiquidity`, []) as string[]),
            get(pair, 'poolInfoD.liquidity', get(pair, 'liquidity'))
          ]
        });
      });
      take(
        dataPairs.ethPairs
          .sort((a, b) => {
            return Number(get(b, 'volume24h', 0)) - Number(get(a, 'volume24h', 0));
          })
          .filter(({address: _, pairContractAddress: __}) => _ || __)
          .filter((item) => {
            return get(item, 'poolInfoD.liquidity', get(item, 'liquidity'));
          })
          .filter((pair) => {
            return pair.baseToken.address === currentCoinData.platform_ethereum
              ? pair.quoteToken.id
              : pair.baseToken.id;
          }),
        PAIRS_STATS_SLICE
      ).forEach(pair => {
        const tokenVersusSymbol = pair.baseToken.address === currentCoinData.platform_ethereum
          ? pair.quoteToken.symbol
          : pair.baseToken.symbol;
        const tokenVersusImage = `https://s2.coinmarketcap.com/static/img/coins/128x128/${pair.baseToken.address === currentCoinData.platform_ethereum
          ? pair.quoteToken.id
          : pair.baseToken.id}.png`;
        set(pairs, tokenVersusSymbol, {
          ...get(pairs, tokenVersusSymbol, {}),
          tokenVersusIcon: tokenVersusImage,
          ethAddress_poolContract: [
            ...(get(pairs, `${tokenVersusSymbol}.ethAddress_poolContract`, []) as string[]),
            `${currentCoinData.platform_ethereum}_${pair.pairContractAddress || pair.address}`
          ],
          poolLiquidity: [
            ...(get(pairs, `${tokenVersusSymbol}.poolLiquidity`, []) as string[]),
            get(pair, 'poolInfoD.liquidity', get(pair, 'liquidity'))
          ]
        });
      });
      Object.entries(pairs).map(([key, {
        tokenVersusIcon,
        btcAddress_poolContract = [],
        ethAddress_poolContract = [],
        poolLiquidity = []
      }]) => {
        getPairStats({
          data: {
            btcAddress_poolContract,
            ethAddress_poolContract
          }
        })
          .then(({data}) => {
            if (!data.buyersAndSellersCount) {
              return;
            }
            const result = {
              pair: `${currentCoinData.index} / ${key}`,
              tokenIcon: `https://s2.coinmarketcap.com/static/img/coins/128x128/${currentCoinData.cmc}.png`,
              tokenVersusIcon,
              poolLiquidity: poolLiquidity.reduce((p, n) => Number(p) + Number(n), 0),
              ...data
            };
            setDataPools(prev => [...prev, {
              pair: result.pair,
              icons: [result.tokenIcon, tokenVersusIcon],
              trades: result.tradesSellCount + result.tradesBuyCount,
              buys: result.tradesBuyCount,
              sells: result.tradesSellCount,
              traders: result.buyersAndSellersCount,
              buyers: result.buyersCount,
              sellers: result.sellersCount,
              volume: result.totalVolume,
              volumeBuy: result.buyersVolume,
              volumeSell: result.sellersVolume,
              liquidity: result.poolLiquidity
            }]);
          })
          .catch(err => console.error(err));
      });
    }, [dataPairs]);
    /*React.useEffect(() => {
      if (!dataTransactions) {
        return;
      }
      setDataMapTransactions(take(dataTransactions, 300).map(transaction => {
        return {
          id: transaction.txn,//string
          date: new Date(Number(transaction.time) * 1000),//Date
          type: transaction.type,//'Sell' | 'Buy' | 'Add' | 'Remove'
          totalValue: millify(toFixedToken(transaction.totalUsd, 3), {
            precision: 3
          }),//string
          tokenValue0: millify(toFixedToken(transaction.amount, 3), {
            precision: 3
          }),//?string
          tokenValue0Price: millify(toFixedToken(transaction.priceUsd, 3), {
            precision: 3
          }),//?string
          tokenValue1: '',//string
          maker: '',//string
          exchange: transaction.exchange,//'uniswap' | 'pancakeswap'
          tx: transaction.txn//string
        };
      }).sort((a, b) => b.date.getTime() - a.date.getTime()));
    }, [dataTransactions]);*/
    const coinIndex = currentCoinData?.index;
    const [search, setSearch] = useState('');
    const [rowsShow, setRowsShow] = useState(Show.SHOW5);
    const [page, setPage] = useState(1);
    const pages = React.useMemo(() => Math.ceil(dataPools.length / rowsShow), [dataPools.length, rowsShow]);
    const [sortBy, setSortBy] = useState(SortByColumn.VOLUME);
    const [sortDescending, setSortDescending] = useState(true);
    const limit = rowsShow;
    const offset = rowsShow * (page - 1);
    const getHeaderCellProps = React.useCallback((column: SortByColumn) => ({
      isSorted: sortBy === column,
      sortDescending,
      onSort: () => {
        if (sortBy === column) {
          setSortDescending((sortDescending) => !sortDescending);
        } else {
          setSortBy(column);
          setSortDescending(true);
        }
      }
    }), [sortBy, sortDescending]);
    return (
      <TableStyled.Offset>
        <HeaderStyled.Wrapper>
          <HeaderStyled.Text $variant={HeaderVariant.Small}>
            Trading Pair Statistics
          </HeaderStyled.Text>
        </HeaderStyled.Wrapper>
        <TableStyled.Wrapper>
          <TableStyled.Component>
            <PairPageStyled.TransactionGroup>
              <div>
                <div className={s.TokenListPage__scrollContainer}>
                  <Table
                    columns={[
                      'minmax(180px, 1fr)',
                      'minmax(70px, 1fr)',
                      'minmax(60px, 1fr)',
                      'minmax(60px, 1fr)',
                      'minmax(75px, 1fr)',
                      'minmax(70px, 1fr)',
                      'minmax(70px, 1fr)',
                      'minmax(75px, 1fr)',
                      'minmax(105px, 1fr)',
                      'minmax(105px, 1fr)',
                      'minmax(80px, 1fr)'
                    ]}
                    minWidth={10 + 10 + 24 + 24 + 180 + 70 + 60 + 60 + 75 + 70 + 70 + 75 + 105 + 105 + 80}>
                    <TableHeader>
                      <HeaderCell {...getHeaderCellProps(SortByColumn.PAIR)}>Pair</HeaderCell>
                      <HeaderCell {...getHeaderCellProps(SortByColumn.TRADES)}>Trades</HeaderCell>
                      <HeaderCell {...getHeaderCellProps(SortByColumn.BUYS)}>Buys</HeaderCell>
                      <HeaderCell {...getHeaderCellProps(SortByColumn.SELLS)}>Sells</HeaderCell>
                      <HeaderCell {...getHeaderCellProps(SortByColumn.TRADERS)}>Traders</HeaderCell>
                      <HeaderCell {...getHeaderCellProps(SortByColumn.BUYERS)}>Buyers</HeaderCell>
                      <HeaderCell {...getHeaderCellProps(SortByColumn.SELLERS)}>Sellers</HeaderCell>
                      <HeaderCell {...getHeaderCellProps(SortByColumn.VOLUME)}>Volume</HeaderCell>
                      <HeaderCell {...getHeaderCellProps(SortByColumn.VOLUME_BUY)}>Volume Buy</HeaderCell>
                      <HeaderCell {...getHeaderCellProps(SortByColumn.VOLUME_SELL)}>Volume Sell</HeaderCell>
                      <HeaderCell {...getHeaderCellProps(SortByColumn.LIQUIDITY)}>Liquidity</HeaderCell>
                    </TableHeader>
                    {
                      /*!dataPools.length
                        ? <Loader/>*/
                      /*: (*/dataPools.length
                      ? (
                        <TableContent>
                          {dataPools?.sort((a, b) => {
                            return sortDescending
                              ? String(b[sortBy]).localeCompare(String(a[sortBy]), undefined, {
                                numeric: true,
                                sensitivity: 'base'
                              })
                              : String(a[sortBy]).localeCompare(String(b[sortBy]), undefined, {
                                numeric: true,
                                sensitivity: 'base'
                              });
                          })
                            .slice(Number(offset), Number(limit) + Number(offset))
                            .map((pool, i) => {
                              return (
                                <TableRowLink key={pool.pair}>
                                  <Pair icons={pool.icons}>{pool.pair}</Pair>
                                  <RowText>{valueOrDash(millify(pool.trades))}</RowText>
                                  <RowText>{valueOrDash(millify(pool.buys))}</RowText>
                                  <RowText>{valueOrDash(millify(pool.sells))}</RowText>
                                  <RowText>{valueOrDash(millify(pool.traders))}</RowText>
                                  <RowText>{valueOrDash(millify(pool.buyers))}</RowText>
                                  <RowText>{valueOrDash(millify(pool.sellers))}</RowText>
                                  <RowText>{valueOrDash(millify(pool.volume))}</RowText>
                                  <RowText>{valueOrDash(millify(pool.volumeBuy))}</RowText>
                                  <RowText>{valueOrDash(millify(pool.volumeSell))}</RowText>
                                  <RowText>{valueOrDash(millify(pool.liquidity))}</RowText>
                                </TableRowLink>
                              );
                            })}
                        </TableContent>
                      ) : null/*)*/
                    }
                  </Table>
                </div>
                <TableFooter
                  hideQuery={true}
                  showFrom={rowsShow * (page - 1) + 1}
                  showTo={dataPools.length && Math.min(page * rowsShow, dataPools.length)}
                  totalCount={dataPools.length}
                  query={search}
                  onQueryChange={setSearch}
                  currentPage={page}
                  onFirstPage={() => page > 1 && setPage(1)}
                  onPreviousPage={() => page > 1 && setPage((page) => page - 1)}
                  onNextPage={() => pages && pages > page && setPage((page) => page + 1)}
                  onLastPage={() => pages && pages > page && setPage(pages)}
                />
              </div>
              <TotalLiquidity liquidity={totalLiquidity}/>
            </PairPageStyled.TransactionGroup>
          </TableStyled.Component>
        </TableStyled.Wrapper>
      </TableStyled.Offset>
    );
  })
;
