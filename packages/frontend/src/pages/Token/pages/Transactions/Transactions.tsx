import React, {FC, useContext, useMemo} from 'react';
import {useParams} from 'react-router';
import {CoinPageStyled} from '../../Coin-styled';
import {CurrentCoinData} from '../../CoinPage';
import {TransactionRow} from './components/TableRow/TransactionRow';
import {Gauge} from './components/Gauge/Gauge';
import {Columns, TableCore} from '../../../../components/_old/ui/Table/Table';


import {formatDate} from '../../../../hooks/useFormatDate';
import {HeaderStyled} from '../../../../components/_old/ui/Header/Header-styled';
import {TableStyled} from '../../../../components/_old/ui/Table/Table-styled';
import {HeaderVariant} from '../../../../components/_old/ui/Header/types';

const today = new Date();

export const Transactions: FC = () => {
  const currentCoinData = useContext(CurrentCoinData);
  const coinIndex = currentCoinData?.index;

  const {token: coinId} = useParams();

  const data = {
    transactions: {
      transactions: [],
      buySellPressure: {
        buy: undefined,
        sell: undefined,
        status: undefined
      }
    }
  }/*useMerge(QUERY_TRANSACTIONS_TABLE, SUB_TRANSACTIONS_TABLE, {
    variables: {coinId},
    skip: !coinId
    /!**
     * apollo cache duplicates array elements with the same "__typename" and "id" fields..
     * https://stackoverflow.com/questions/48840223/apollo-duplicates-first-result-to-every-node-in-array-of-edges
     *!/
    // fetchPolicy: 'no-cache'
  })*/;

  const transactions = useMemo(() => {
    return (data?.transactions?.transactions || []).slice(0, 10);
  }, [data]);

  const buySellPressure = data?.transactions?.buySellPressure;

  const columns: Columns[] = useMemo(() => {
    return [
      {
        Header: `Date (${formatDate(today, 'zzzz')})`,
        accessor: 'date',
        width: 70,
        justify: 'center'
      },
      {Header: 'Side', accessor: 'side', width: 10},
      {Header: 'Price USD', accessor: 'price_usd', width: 45},
      {
        Header: `Amount ${coinIndex?.toUpperCase() || ''}`,
        accessor: 'amount',
        width: 45
      },
      {Header: 'Total USD', accessor: 'total_usd', width: 45},
      {Header: 'Maker', accessor: 'maker', width: 60},
      {Header: 'Ex', accessor: 'exchange_link', width: 10, justify: 'center'},
      {Header: 'Other', accessor: 'other_link', width: 10, justify: 'center'}
    ];
  }, [coinIndex]);

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
              data={transactions}
              RowParcer={TransactionRow}
            />
            <Gauge {...buySellPressure} />
          </CoinPageStyled.TransactionGroup>
        </TableStyled.Component>
      </TableStyled.Wrapper>
    </TableStyled.Offset>
  );
};
