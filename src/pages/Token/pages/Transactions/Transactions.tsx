import React, { useEffect, useState } from 'react'
import pThrottle from 'p-throttle';
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

  const [txs, setTxs] = useState<Record<string, string | Date>[]>([])

  useEffect(() => {
    const as = async () => {
      const pairs = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/token/${
          currentCoinData.id
        }/pairs`,
      )

      const { items } =
        (await pairs.json()) as TokenPairsResponse;

      const throttledFunc = pThrottle({ limit: 1, interval: 5000 })(
        async (explorerAddr: string, contractAddress: string, address: string) => fetch(
          `${explorerAddr}?module=account&action=tokentx&contractaddress=${contractAddress}&address=${address}&page=1&offset=10&sort=desc`,
        ),
      );

      await Promise.all(
        items.map(async (pair) => {
          const [network, address] =
            pair.coingeckoPoolId.split('_');
          const explorerAddr =
            network === 'bsc'
              ? 'https://api.bscscan.com/api'
              : 'https://api.etherscan.io/api'

          const contractAddress =
            Number.parseInt(pair.base.id, 10) === Number.parseInt(currentCoinData?.id, 10)
              ? pair.base.address
              : pair.quote.address;

          const response = await throttledFunc(explorerAddr, contractAddress, address);

          const parsed =
            await response.json() as unknown as TransactionsResponse;

          const txst = (
            (!!Number.parseInt(parsed.status, 10) &&
              typeof parsed.result !== 'string' &&
              parsed.result?.map((transfer) => ({
                id: transfer.hash,
                date: new Date(Number.parseInt(transfer.timeStamp, 10) * 1000),
                side:
                  transfer.from.toLowerCase() ===
                  address.toLowerCase()
                    ? 'Buy'
                    : 'Sell',
                amount: new BigNumber(
                  transfer.value,
                ).shiftedBy(-+transfer.tokenDecimal).toFixed(Math.min(+transfer.tokenDecimal, 4)),
                price_usd: '1',
                total_usd: '1',
                exchange_image: '',
                explorer_link:
                  network === 'bsc'
                    ? `https://bscscan.com/tx/${transfer.hash}`
                    : `https://etherscan.com/tx/${transfer.hash}`,
              }))) ||
            []
          )

          setTxs(
            (transactions) => [...transactions, ...txst]
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          )
        }),
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
      // {
      //   Header: 'Price USD',
      //   accessor: 'price_usd',
      //   width: 45,
      // },
      {
        Header: `Amount ${
          currentCoinData.symbol?.toUpperCase() || ''
        }`,
        accessor: 'amount',
        width: 45,
      },
      // {
      //   Header: 'Total USD',
      //   accessor: 'total_usd',
      //   width: 45,
      // },
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
