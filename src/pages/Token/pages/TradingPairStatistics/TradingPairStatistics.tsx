import React, { useState } from 'react'
import { CurrentCoinData } from '../../CoinPage'
import { TotalLiquidity } from './components/TotalLiquidity/TotalLiquidity'
import { HeaderStyled } from '../../../../components/_old/ui/Header/Header-styled'
import { TableStyled } from '../../../../components/_old/ui/Table/Table-styled'
import { HeaderVariant } from '../../../../components/_old/ui/Header/types'
import useFetch from '../../../../hooks/useFetch'
import s from '../../../Home/components/TokenList.module.scss'
import {
  HeaderCell,
  Table,
  TableContent,
  TableFooter,
  TableHeader,
  TableRowLink,
} from '../../../../components/_old2/Table'
import { RowText } from '../../../../components/_old2/Table/RowText/RowText'
import millify from 'millify'
import { EMDASH } from '../../../../utils/UTF'
import { Pair } from '../../../../components/_old2/Table/Pair/Pair'
import { PairPageStyled } from '../../Pair-styled'
import { TokenPairsResponse } from '../../../../types/api/TokenPairsResponse'

enum SortByColumn {
  PAIR = 'name',
  TRADES = 'tradesCount',
  BUYS = 'buysCount',
  SELLS = 'sellsCount',
  TRADERS = 'tradesCount',
  BUYERS = 'buyersCount',
  SELLERS = 'sellersCount',
  VOLUME = 'volume',
  // VOLUME_BUY = 'volumeBuy',
  // VOLUME_SELL = 'volumeSell',
  LIQUIDITY = 'liquidity',
}

enum Show {
  SHOW5 = 5,
}

const valueOrDash = (value) =>
  value === '0' ? EMDASH : value

export const TradingPairStatistics: React.FC = React.memo(
  () => {
    const currentCoinData =
      React.useContext(CurrentCoinData)

    const { data } = useFetch<TokenPairsResponse>({
      baseURL: `${import.meta.env.VITE_BACKEND_URL}/token/${
        currentCoinData.id
      }/pairs`,
      withCredentials: false,
      params: { limit: 20 },
    })

    const [search, setSearch] = useState('')
    const [rowsShow] = useState(Show.SHOW5)
    const [page, setPage] = useState(1)
    const pages = React.useMemo(
      () => Math.ceil(data?.count / rowsShow),
      [data?.count, rowsShow],
    )
    const [sortBy, setSortBy] = useState(
      SortByColumn.VOLUME,
    )
    const [sortDescending, setSortDescending] =
      useState(true)
    const limit = rowsShow
    const offset = rowsShow * (page - 1)

    const getHeaderCellProps = React.useCallback(
      (column: SortByColumn) => ({
        isSorted: sortBy === column,
        sortDescending,
        onSort: () => {
          if (sortBy === column) {
            setSortDescending(
              (sortDescending) => !sortDescending,
            )
          } else {
            setSortBy(column)
            setSortDescending(true)
          }
        },
      }),
      [sortBy, sortDescending],
    )

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
                <div
                  className={
                    s.TokenListPage__scrollContainer
                  }
                >
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
                      'minmax(80px, 1fr)',
                    ]}
                    minWidth={
                      10 +
                      10 +
                      24 +
                      24 +
                      180 +
                      70 +
                      60 +
                      60 +
                      75 +
                      70 +
                      70 +
                      75 +
                      80
                    }
                  >
                    <TableHeader>
                      <HeaderCell
                        {...getHeaderCellProps(
                          SortByColumn.PAIR,
                        )}
                      >
                        Pair
                      </HeaderCell>
                      <HeaderCell
                        {...getHeaderCellProps(
                          SortByColumn.TRADES,
                        )}
                      >
                        Trades
                      </HeaderCell>
                      <HeaderCell
                        {...getHeaderCellProps(
                          SortByColumn.BUYS,
                        )}
                      >
                        Buys
                      </HeaderCell>
                      <HeaderCell
                        {...getHeaderCellProps(
                          SortByColumn.SELLS,
                        )}
                      >
                        Sells
                      </HeaderCell>
                      <HeaderCell
                        {...getHeaderCellProps(
                          SortByColumn.TRADERS,
                        )}
                      >
                        Traders
                      </HeaderCell>
                      <HeaderCell
                        {...getHeaderCellProps(
                          SortByColumn.BUYERS,
                        )}
                      >
                        Buyers
                      </HeaderCell>
                      <HeaderCell
                        {...getHeaderCellProps(
                          SortByColumn.SELLERS,
                        )}
                      >
                        Sellers
                      </HeaderCell>
                      <HeaderCell
                        {...getHeaderCellProps(
                          SortByColumn.VOLUME,
                        )}
                      >
                        Volume
                      </HeaderCell>
                      {/* <HeaderCell {...getHeaderCellProps(SortByColumn.VOLUME_BUY)}>Volume Buy</HeaderCell>
                      <HeaderCell {...getHeaderCellProps(SortByColumn.VOLUME_SELL)}>Volume Sell</HeaderCell> */}
                      <HeaderCell
                        {...getHeaderCellProps(
                          SortByColumn.LIQUIDITY,
                        )}
                      >
                        Liquidity
                      </HeaderCell>
                    </TableHeader>
                    {
                      data?.count ? (
                        <TableContent>
                          {data?.items
                            ?.sort((a, b) => {
                              return sortDescending
                                ? String(
                                    b[sortBy],
                                  ).localeCompare(
                                    String(a[sortBy]),
                                    undefined,
                                    {
                                      numeric: true,
                                      sensitivity: 'base',
                                    },
                                  )
                                : String(
                                    a[sortBy],
                                  ).localeCompare(
                                    String(b[sortBy]),
                                    undefined,
                                    {
                                      numeric: true,
                                      sensitivity: 'base',
                                    },
                                  )
                            })
                            .slice(
                              Number(offset),
                              Number(limit) +
                                Number(offset),
                            )
                            .map((pool, i) => {
                              return (
                                <TableRowLink
                                  key={pool.name + i}
                                >
                                  <Pair icons={[pool.base.image, pool.quote.image]}>
                                    {pool.name}
                                  </Pair>
                                  <RowText>
                                    {valueOrDash(
                                      millify(
                                        pool.tradesCount,
                                      ),
                                    )}
                                  </RowText>
                                  <RowText>
                                    {valueOrDash(
                                      millify(
                                        pool.buysCount,
                                      ),
                                    )}
                                  </RowText>
                                  <RowText>
                                    {valueOrDash(
                                      millify(
                                        pool.sellsCount,
                                      ),
                                    )}
                                  </RowText>
                                  <RowText>
                                    {valueOrDash(
                                      millify(
                                        pool.tradesCount,
                                      ),
                                    )}
                                  </RowText>
                                  <RowText>
                                    {valueOrDash(
                                      millify(
                                        pool.buyersCount,
                                      ),
                                    )}
                                  </RowText>
                                  <RowText>
                                    {valueOrDash(
                                      millify(
                                        pool.sellersCount,
                                      ),
                                    )}
                                  </RowText>
                                  <RowText>
                                    {valueOrDash(
                                      millify(pool.volume),
                                    )}
                                  </RowText>
                                  {/* <RowText>{valueOrDash(millify(pool.volumeBuy))}</RowText>
                                <RowText>{valueOrDash(millify(pool.volumeSell))}</RowText> */}
                                  <RowText>
                                    {valueOrDash(
                                      millify(
                                        pool.liquidity,
                                      ),
                                    )}
                                  </RowText>
                                </TableRowLink>
                              )
                            })}
                        </TableContent>
                      ) : null /*)*/
                    }
                  </Table>
                </div>
                <TableFooter
                  hideQuery={true}
                  showFrom={rowsShow * (page - 1) + 1}
                  showTo={
                    data?.items.length &&
                    Math.min(
                      page * rowsShow,
                      data?.items.length,
                    )
                  }
                  totalCount={data?.items.length}
                  query={search}
                  onQueryChange={setSearch}
                  currentPage={page}
                  onFirstPage={() => page > 1 && setPage(1)}
                  onPreviousPage={() =>
                    page > 1 && setPage((page) => page - 1)
                  }
                  onNextPage={() =>
                    pages &&
                    pages > page &&
                    setPage((page) => page + 1)
                  }
                  onLastPage={() =>
                    pages && pages > page && setPage(pages)
                  }
                />
              </div>
              <TotalLiquidity liquidity={currentCoinData.fully_diluted_mc} />
            </PairPageStyled.TransactionGroup>
          </TableStyled.Component>
        </TableStyled.Wrapper>
      </TableStyled.Offset>
    )
  },
)
