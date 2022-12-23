import React, {useState} from 'react';
import s from './TokenList.module.scss';
import {Select} from '../../../components/_old2/Dropdown';
import {useNetworkExchanges} from '../../../store/networkExchanges';
import {
  HeaderCell,
  PercentageChange,
  RowNumber,
  Table,
  TableContent,
  TableFooter,
  TableHeader,
  TableRowLink,
  Token
} from '../../../components/_old2/Table';
import {PrototypePair, TableData} from '../types';
import useWebSocket from 'react-use-websocket';
import millify from 'millify';
import {toFixedToken} from '../../../utils/diff';
import {RowText} from '../../../components/_old2/Table/RowText/RowText';
import {get} from 'lodash';
import {useLazyFetch} from '../../../hooks/useFetch';
import qs from 'qs';
import {EMDASH} from '../../../utils/UTF';
import {JsonPrimitive} from 'react-use-websocket/dist/lib/types';
import {useCmcSocket} from '../../../store/cmcSocket';
import {Loader} from '../../../components/_old/ui/Loader/Loader';
import SearchIcon from '../../../assets/icons/new/SearchIcon';
import {
  AnimatedGradientButton
} from '../../../components/_old/ui/Buttons/AnimatedGradientButton/AnimatedGradientButton';
import {NavigationStyled} from '../../../components/_old/ui/Navigation/Navigation-styled';
import {NetworkSelect} from '../../../components/_old2/NetworkSelect';

enum Show {
  SHOW20 = 20,
  SHOW50 = 50,
  SHOW100 = 100
}

enum SortByColumn {
  NAME = 'symbol',
  LIQUIDITY = 'liquidity',
  VOLUME = 'volume',
  // VOLUME_CHANGE_1H = 'volume_change_1h',
  VOLUME_CHANGE_24H = 'volumeChangePercentage24h',
  MARKET_CAP = 'marketCap',
  CIRCULATION_SUPPLY = 'circulatingSupply',
  PRICE = 'price',
  PRICE_CHANGE_1H = 'priceChangePercentage1h',
  PRICE_CHANGE_24H = 'priceChangePercentage24h'
}

const valueOrDash = (value) => value === '0' ? EMDASH : value;

const TokenList = React.memo(() => {
    const [rowsShow, setRowsShow] = useState(Show.SHOW20);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState(SortByColumn.MARKET_CAP);
    const [sortDescending, setSortDescending] = useState(true);
    const {networks} = useNetworkExchanges();
    const [tableData, setTableData] = React.useState<TableData>({
      tokens: [],
      tokensCount: 0
    });
    const dataUri = React.useMemo(() => {
      const params = qs.stringify({
        chains: networks,
        limit: rowsShow,
        offset: rowsShow * (page - 1),
        sortBy,
        sortOrder: sortDescending ? 'desc' : 'asc',
        search
      }, {
        addQueryPrefix: true
      });
      return `${import.meta.env.VITE_BACKEND_URL}/tokens/${params}`;
    }, [page, rowsShow, sortBy, sortDescending, search, networks]);
    const {sendMessage, lastMessage} = useCmcSocket();
    const [{data, loading}, getData] = useLazyFetch<{
      tokens: PrototypePair[],
      tokensCount: number
    }>({
      withCredentials: false
    });
    React.useEffect(() => {
      if (!data) {
        return;
      }
      const tokens = data.tokens.map((token: PrototypePair) => {
        return {
          id: token.id,
          symbol: token.symbol,
          slug: token.slug,
          image: token.logoURI,
          priceChangePercentage1h: token.priceChangePercentage1h,
          priceChangePercentage24h: token.priceChangePercentage24h,
          price: token.price,
          volumeChangePercentage24h: token.volumeChangePercentage24h,
          volume: token.volume,
          marketCap: token.marketCap,
          liquidity: token.liquidity,
          circulatingSupply: token.circulatingSupply,
          cmcId: token.cmcId,
          platforms: token.platforms
        };
      });
      if (tokens.length) {
        sendMessage({
          method: 'subscribe',
          id: 'price',
          data: {
            cryptoIds: tokens.flatMap(t => t.cmcId) as unknown as JsonPrimitive,
            index: 'detail'
          }
        });
      }
      setTableData({
        tokens,
        tokensCount: data.tokensCount
      });
    }, [data]);
    React.useEffect(() => {
      if (!lastMessage) {
        return;
      }
      const {id, d} = lastMessage;
      switch (id) {
        case 'price': {
          const {cr} = d;
          setTableData(prev => {
            const tokenIndex = prev.tokens.findIndex(t => t.cmcId === cr.id);
            if (tokenIndex === -1) {
              return prev;
            }
            Object.keys(cr).forEach(key => {
              switch (key) {
                case 'p': {
                  prev.tokens[tokenIndex]['price'] = cr.p;
                  break;
                }
                case 'p1h': {
                  prev.tokens[tokenIndex]['priceChangePercentage1h'] = cr.p1h;
                  break;
                }
                case 'p24h': {
                  prev.tokens[tokenIndex]['priceChangePercentage24h'] = cr.p24h;
                  break;
                }
                case 'v': {
                  prev.tokens[tokenIndex]['volume'] = cr.v;
                  break;
                }
                case 'vol24hpc': {
                  prev.tokens[tokenIndex]['volumeChangePercentage24h'] = cr.vol24hpc;
                  break;
                }
                case 'mc': {
                  prev.tokens[tokenIndex]['marketCap'] = cr.mc;
                  break;
                }
              }
            });
            return {
              tokens: prev.tokens,
              tokensCount: prev.tokensCount
            };
          });
          break;
        }
      }

    }, [lastMessage]);
    React.useEffect(() => {
      setPage(1);
    }, [search, networks]);
    React.useEffect(() => {
      getData({url: dataUri}).finally();
      return () => {
        sendMessage({
          method: 'unsubscribe',
          id: 'unsubscribePrice'
        });
      };
    }, [dataUri]);
    const pages = React.useMemo(() => Math.ceil(tableData.tokensCount / rowsShow), [tableData.tokensCount, rowsShow]);
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
      <>
        <div className={s.TokenListPage__headingContainer}>
          <h1 className={s.TokenListPage__heading}>DEX Rank</h1>
          <div className={s.TokenListPage__headingInputContainer}>
            <div className={s.TokenListPage__headingInputContainerBackground}/>
            <div className={s.TokenListPage__headingInputContainerIcon}>
              <SearchIcon/>
            </div>
            <input className={s.TokenListPage__headingInput}
                   placeholder="Search Pair by Symbol, Name, Pair Contract or Token Contract"
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className={s.TokenListPage__headingSelectorContainer}>
          <NetworkSelect/>
          <div className={s.TokenListPage__selectContainer}>
            <div className={s.TokenListPage__selectLabel}>Show:</div>
            <Select
              itemList={[
                {id: Show.SHOW20, text: '20 rows'},
                {id: Show.SHOW50, text: '50 rows'},
                {id: Show.SHOW100, text: '100 rows'}
              ]}
              value={rowsShow}
              onChange={(show) => {
                setRowsShow(show);
                setPage(1);
              }}
            />
          </div>
        </div>
        <div className={s.TokenListPage__scrollContainer}>
          <Table
            columns={[
              '40px',
              'minmax(140px, 1fr)',
              'minmax(120px, 1fr)',
              'minmax(120px, 1fr)',
              // 'minmax(115px, 1fr)',
              'minmax(115px, 1fr)',
              'minmax(160px, 1fr)',
              'minmax(130px, 1fr)',
              'minmax(100px, 1fr)',
              'minmax(60px, 1fr)',
              'minmax(60px, 1fr)'
            ]}
            minWidth={10 + 10 + 24 + 24 + 40 + 140 + 120 + 120 /*+ 115*/ + 115 + 190 + 130 + 100 + 60 + 60}>
            <TableHeader>
              <HeaderCell>#</HeaderCell>
              <HeaderCell {...getHeaderCellProps(SortByColumn.NAME)}>Name</HeaderCell>
              <HeaderCell {...getHeaderCellProps(SortByColumn.LIQUIDITY)}>Liquidity</HeaderCell>
              <HeaderCell {...getHeaderCellProps(SortByColumn.VOLUME)}>Volume, 24H</HeaderCell>
              {/*<HeaderCell {...getHeaderCellProps(SortByColumn.VOLUME_CHANGE_1H)}>1H Change</HeaderCell>*/}
              <HeaderCell {...getHeaderCellProps(SortByColumn.VOLUME_CHANGE_24H)}>24H Change</HeaderCell>
              <HeaderCell {...getHeaderCellProps(SortByColumn.CIRCULATION_SUPPLY)}>Circulation Supply</HeaderCell>
              <HeaderCell {...getHeaderCellProps(SortByColumn.MARKET_CAP)}>Market Cap</HeaderCell>
              <HeaderCell {...getHeaderCellProps(SortByColumn.PRICE)}>Price</HeaderCell>
              <HeaderCell {...getHeaderCellProps(SortByColumn.PRICE_CHANGE_24H)}>24H</HeaderCell>
              <HeaderCell {...getHeaderCellProps(SortByColumn.PRICE_CHANGE_1H)}>1H</HeaderCell>
            </TableHeader>
            {
              loading
                ? <Loader/>
                : (tableData.tokens.length
                  ? (
                    <TableContent>
                      {tableData.tokens?.sort((a, b) => {
                        return sortDescending
                          ? String(b[sortBy]).localeCompare(String(a[sortBy]), undefined, {
                            numeric: true,
                            sensitivity: 'base'
                          })
                          : String(a[sortBy]).localeCompare(String(b[sortBy]), undefined, {
                            numeric: true,
                            sensitivity: 'base'
                          });
                      }).map((token, i) => {
                        const icons = [token.image];
                        // if (token.additional_logo_url) icons.push(token.additional_logo_url);
                        return (
                          <TableRowLink key={token.id} to={`/token/${token.slug}`}>
                            <RowNumber>{rowsShow * (page - 1) + 1 + i}</RowNumber>
                            <Token icons={icons} platforms={token.platforms}>{token.symbol}</Token>
                            <RowText>{valueOrDash(millify(token.liquidity))}</RowText>
                            <RowText>{valueOrDash(millify(token.volume))}</RowText>
                            {/*<PercentageChange>{token.volume_change_1h}</PercentageChange>*/}
                            <PercentageChange>{token.volumeChangePercentage24h}</PercentageChange>
                            <RowText>{valueOrDash(millify(token.circulatingSupply))}</RowText>
                            <RowText>{valueOrDash(millify(token.marketCap))}</RowText>
                            {(() => {
                              if (typeof token.price === 'number') {
                                const regex = String(token.price).match(/.+\.0+[1-9]{1,2}(?<replace>.+)/);
                                const replace = get(regex, 'groups.replace');
                                if (replace) {
                                  token.price = String(token.price).replace(replace, '');
                                } else {
                                  token.price = toFixedToken(Number(token.price), 2);
                                }
                              }
                              const zeros = get(String(token.price).match(/.0+/), 0, []).length - 2;
                              if (zeros > 1) {
                                return (
                                  <RowText
                                    className={s.TokenListPage__tablePrice}
                                    dangerouslySetInnerHTML={{__html: String(token.price).replace(/.0+/, `.0<span class="zeros">${zeros}</span>`)}}
                                  />
                                );
                              }
                              return (
                                <RowText className={s.TokenListPage__tablePrice}>{token.price}</RowText>
                              );
                            })()}
                            <PercentageChange>{token.priceChangePercentage24h}</PercentageChange>
                            <PercentageChange>{token.priceChangePercentage1h}</PercentageChange>
                          </TableRowLink>
                        );
                      })}
                    </TableContent>
                  ) : null)
            }
          </Table>
        </div>
        <TableFooter
          hideQuery={true}
          showFrom={rowsShow * (page - 1) + 1}
          showTo={tableData.tokensCount && Math.min(page * rowsShow, tableData.tokensCount)}
          totalCount={tableData.tokensCount}
          query={search}
          onQueryChange={setSearch}
          currentPage={page}
          onFirstPage={() => page > 1 && setPage(1)}
          onPreviousPage={() => page > 1 && setPage((page) => page - 1)}
          onNextPage={() => pages && pages > page && setPage((page) => page + 1)}
          onLastPage={() => pages && pages > page && setPage(pages)}
        />
      </>
    );
  })
;

export default TokenList;