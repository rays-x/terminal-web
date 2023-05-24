import React, { useEffect, useState } from 'react'
import { CoinPageStyled } from '../../Coin-styled'
import { CurrentCoinData } from '../../CoinPage'
import { TransactionRow } from './components/TableRow/TransactionRow'
import {
  Columns,
  TableCore,
} from '../../../../components/_old/ui/Table/Table'
import { formatDate } from '../../../../hooks/useFormatDate'
import { HeaderStyled } from '../../../../components/_old/ui/Header/Header-styled'
import { TableStyled } from '../../../../components/_old/ui/Table/Table-styled'
import { HeaderVariant } from '../../../../components/_old/ui/Header/types'
import { useFetch } from '../../../../hooks'
import { TokenPairsResponse } from '../../../../types/api/TokenPairsResponse'
import { TransactionsResponse } from './types'
import BigNumber from 'bignumber.js'
import {
  gqlHeaders,
  gqlRecievingRequests,
  gqlSendingRequests,
} from './gqlRequests'

export const Transactions: React.FC = React.memo(() => {
  const currentCoinData = React.useContext(CurrentCoinData)

  const [txs, setTxs] = useState([])

  useEffect(() => {
    const as = async () => {
      const pairs = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/token/${
          currentCoinData.id
        }/pairs`,
      )

      const { items } =
        (await pairs.json()) as TokenPairsResponse

      const supportedPools = items
        .filter(
          (item) =>
            item.coingeckoPoolId.split('_')[0] === 'bsc',
        )
        .map((item) => item.coingeckoPoolId.split('_')[1])
      const supportedPoolsSet = new Set(supportedPools)

      const responses = await Promise.all(
        [gqlRecievingRequests, gqlSendingRequests].map(
          async (query) =>
            fetch('https://graphql.bitquery.io/', {
              headers: gqlHeaders,
              referrer: 'https://ide.bitquery.io/',
              referrerPolicy:
                'strict-origin-when-cross-origin',
              method: 'POST',
              mode: 'cors',
              credentials: 'omit',
              body: JSON.stringify({
                query,
                variables: {
                  contracts: supportedPools.slice(0, 1),
                  limit: 20,
                  network: 'bsc',
                  baseCurrency:
                    currentCoinData?.platforms.find(
                      (v) =>
                        v.coingecko_slug ===
                        'binance-smart-chain',
                    )?.address,
                },
              }),
            }),
        ),
      )

      const [jsData, jsData2] = await Promise.all(
          responses.map(
            async (res): Promise<TransactionsResponse> => res.json()
          )
        )

      setTxs(
        [
          ...(jsData.data.ethereum.transfers || []),
          ...(jsData2.data.ethereum.transfers || []),
        ]
          .map((transfer) => ({
            id: transfer.transaction.hash, //string
            date: new Date(
              Number.parseInt(
                transfer.block.timestamp.unixtime,
                10,
              ) * 1000,
            ), //Date
            side: supportedPoolsSet.has(
              transfer.sender.address,
            )
              ? 'Buy'
              : 'Sell', //'Sell' | 'Buy' | 'Add' | 'Remove'
            price_usd: new BigNumber(
              currentCoinData.price_usd,
            ).toFixed(2),
            amount: new BigNumber(transfer.amount).toFixed(
              2,
            ),
            total_usd: new BigNumber(
              currentCoinData.price_usd,
            )
              .multipliedBy(transfer.amount)
              .toFixed(2),
            // maker: _.maker,
            exchange_image: '',
            explorer_link: `https://bscscan.com/tx/${transfer.transaction.hash}`,
          }))
          .sort((a, b) => b.date - a.date),
      )
    }

    as()
  }, [])

  const columns: Columns[] = React.useMemo(() => {
    return [
      {
        Header: `Date (${formatDate(new Date(), 'zzzz')})`,
        accessor: 'date',
        width: 70,
        justify: 'center',
      },
      { Header: 'Side', accessor: 'side', width: 10 },
      {
        Header: 'Price USD',
        accessor: 'price_usd',
        width: 45,
      },
      {
        Header: `Amount ${
          currentCoinData.symbol?.toUpperCase() || ''
        }`,
        accessor: 'amount',
        width: 45,
      },
      {
        Header: 'Total USD',
        accessor: 'total_usd',
        width: 45,
      },
      // {Header: 'Maker', accessor: 'maker', width: 60},
      // {Header: 'Ex', accessor: 'exchange_image', width: 10, justify: 'center'},
      {
        Header: 'Explorer',
        accessor: 'explorer_link',
        width: 10,
        justify: 'center',
      },
    ]
  }, [currentCoinData])

  return (
    <TableStyled.Offset>
      <HeaderStyled.Wrapper>
        <HeaderStyled.Text $variant={HeaderVariant.Small}>
          Transactions
        </HeaderStyled.Text>
      </HeaderStyled.Wrapper>
      <TableStyled.Wrapper>
        <TableStyled.Component>
          <CoinPageStyled.TransactionGroup>
            <TableCore
              columns={columns}
              data={txs}
              RowParcer={TransactionRow}
            />
            {/* <Gauge {...buySellPressure} /> */}
          </CoinPageStyled.TransactionGroup>
        </TableStyled.Component>
      </TableStyled.Wrapper>
    </TableStyled.Offset>
  )
})
