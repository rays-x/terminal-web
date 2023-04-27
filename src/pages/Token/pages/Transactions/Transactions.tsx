import React from 'react';
import {CoinPageStyled} from '../../Coin-styled';
import {CurrentCoinData} from '../../CoinPage';
import {TransactionRow} from './components/TableRow/TransactionRow';
import {Gauge} from './components/Gauge/Gauge';
import {Columns, TableCore} from '../../../../components/_old/ui/Table/Table';
import {formatDate} from '../../../../hooks/useFormatDate';
import {HeaderStyled} from '../../../../components/_old/ui/Header/Header-styled';
import {TableStyled} from '../../../../components/_old/ui/Table/Table-styled';
import {HeaderVariant} from '../../../../components/_old/ui/Header/types';
import {sample, take} from 'lodash';
import millify from 'millify';
import {toFixedToken} from '../../../../utils/diff';
import {TransactionType} from '../../types';
import {useCmcTokenSocket} from '../../../../store/cmcTokenSocket';
import {JsonValue} from 'react-use-websocket/src/lib/types';
import {useFetch} from '../../../../hooks';
import {TokenTransactionsResponse} from '../../../../types/api/TokenTransactionsResponse';
import {TokenPairsResponse} from '../../../../types/api/TokenPairsResponse';

const TRANSACTIONS_PAIRS_SLICE = 10;

export const Transactions: React.FC = React.memo(() => {
  const currentCoinData = React.useContext(CurrentCoinData);
  const {sendMessage, lastMessage} = useCmcTokenSocket();


  const {data: pairs} = useFetch<TokenPairsResponse>({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/token/${currentCoinData.id}/pairs`,
    withCredentials: false
  });
  const {data: dataTransactions, loading} = useFetch<TokenTransactionsResponse>({
    url: `${import.meta.env.VITE_BACKEND_URL}/token/${currentCoinData?.id}/transactions`,
    withCredentials: false
  });
  const [dataMapTransactions, setDataMapTransactions] = React.useState<TransactionType[]>([]);

  const getPairsWsFormat = React.useCallback(() => {
    return Object.fromEntries(pairs?.items.map(pair => [pair.cmc, pair]));
  }, [pairs]);


  React.useEffect(() => {
    if(!dataTransactions || !pairs?.items) {
      return;
    }
    const pairsFormat = Object.fromEntries(pairs?.items.map(pair => [pair.id, pair]));
    setDataMapTransactions(Object.entries(dataTransactions).reduce((prev, [pair, transactions]) => {
      return [
        ...prev,
        ...transactions.map(transaction => ({
          ...transaction,
          pair
        }))
      ];
    }, []).map(transaction => {
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
        exchange: `https://s2.coinmarketcap.com/static/img/exchanges/128x128/${pairsFormat[transaction.pair]?.dex?.cmc}.png`,
        tx: pairsFormat[transaction.pair]?.platform.dexerTxHashFormat?.replace('%s', transaction.txn)
      };
    }).sort((a, b) => b.date.getTime() - a.date.getTime()));
  }, [dataTransactions]);
  React.useEffect(() => {
    if(!pairs) {
      return;
    }
    const pairsWs = take(pairs?.items, 10).map(pair => {
      const reverse = pair.base.id !== currentCoinData.id;
      return `dexscan@transaction@${pair.platform.cmc}@${pair.cmc}@${reverse}`;
    });
    sendMessage({
      method: 'SUBSCRIPTION',
      params: pairsWs.map(_ => _ as unknown as JsonValue)//[pairParams as unknown as JsonValue]
    });
    return () => {
      sendMessage({
        method: 'UNSUBSCRIPTION',
        params: pairsWs.map(_ => _ as unknown as JsonValue)
      });
    };
  }, [pairs]);
  React.useEffect(() => {
    if(!lastMessage) {
      return;
    }
    const vars = lastMessage;
    if(!vars.d
      || !String(vars.c).includes('transaction')) {
      return;
    }
    const pairsWsFormat = getPairsWsFormat();
    const [, , , pairCmc] = String(vars.c).split('@');
    const pair = pairsWsFormat[pairCmc];
    const data = JSON.parse(vars.d);
    const items: TransactionType[] = data.map(transaction => {
      return {
        id: transaction.txn,//string
        date: new Date(Number(transaction.time) * 1000),//Date
        type: transaction.type,//'Sell' | 'Buy' | 'Add' | 'Remove'
        totalValue: millify(toFixedToken(transaction.totalUsd, 2), {
          precision: 2
        }),//string
        tokenValue0: millify(toFixedToken(transaction.amount, 2), {
          precision: 2
        }),//?string
        tokenValue0Price: millify(toFixedToken(transaction.priceUsd, 2), {
          precision: 2
        }),//?string
        tokenValue1: '',//string
        maker: '',//string
        exchange: `https://s2.coinmarketcap.com/static/img/exchanges/128x128/${pair?.dex?.cmc}.png`,
        tx: pair?.platform.dexerTxHashFormat?.replace('%s', transaction.txn)
      };
    });
    setDataMapTransactions((prev) => [
      ...items,
      ...prev.slice(0, -data.length)
    ].sort((a, b) => b.date.getTime() - a.date.getTime()));
    /*const item = {
      id: transaction.txn,//string
      date: new Date(Number(transaction.time) * 1000),//Date
      type: transaction.type,//'Sell' | 'Buy' | 'Add' | 'Remove'
      totalValue: millify(toFixedToken(transaction.totalUsd, 2), {
        precision: 2
      }),//string
      tokenValue0: millify(toFixedToken(transaction.amount, 2), {
        precision: 2
      }),//?string
      tokenValue0Price: millify(toFixedToken(transaction.priceUsd, 2), {
        precision: 2
      }),//?string
      tokenValue1: '',//string
      maker: '',//string
      exchange: platformId === '1' ? 'uniswap' : 'pancakeswap',//'uniswap' | 'pancakeswap'
      tx: transaction.txn//string
    };*/
  }, [lastMessage]);
  const coinIndex = currentCoinData?.index;
  const buy = React.useMemo(() => {
    return sample(Array.from({length: 100}).map((_, i) => i + 1));
  }, [currentCoinData?.id]);

  const buySellPressure = {
    buy: buy,
    sell: 100 - buy,
    status: buy
  };

  const columns: Columns[] = React.useMemo(() => {
    return [
      {
        Header: `Date (${formatDate(new Date(), 'zzzz')})`,
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
      // {Header: 'Maker', accessor: 'maker', width: 60},
      {Header: 'Ex', accessor: 'exchange_image', width: 10, justify: 'center'},
      {Header: 'Explore', accessor: 'explorer_link', width: 10, justify: 'center'}
    ];
  }, [coinIndex]);

  const transactions = dataMapTransactions
  .map(_ => {
    return {
      date: _.date,
      side: _.type,
      price_usd: _.tokenValue0Price,
      amount: _.tokenValue0,
      total_usd: _.totalValue,
      // maker: _.maker,
      exchange_image: _.exchange,
      explorer_link: _.tx
    };
  });

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
});
