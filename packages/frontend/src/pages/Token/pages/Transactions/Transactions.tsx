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
import {TransactionsPairsResponse, TransactionsResponse, TransactionType} from '../../types';
import UniswapIcon from '../../../../assets/icons/dex/uniswap.png';
import PancakeIcon from '../../../../assets/icons/dex/pancake.png';
import {useLazyFetch} from '../../../../hooks/useFetch';
import {useCmcTokenSocket} from '../../../../store/cmcTokenSocket';
import {JsonValue} from 'react-use-websocket/src/lib/types';

const TRANSACTIONS_PAIRS_SLICE = 10;

export const Transactions: React.FC = React.memo(() => {
  const currentCoinData = React.useContext(CurrentCoinData);
  const {sendMessage, lastMessage} = useCmcTokenSocket();
  const [{data: dataTransactionPairs}, getTransactionPairs] = useLazyFetch<TransactionsPairsResponse>({
    url: `${import.meta.env.VITE_BACKEND_URL}/cmc/dex/pairs-list`,
    withCredentials: false
  });
  const [{data: dataTransactions}, getTransactions] = useLazyFetch<TransactionsResponse[]>({
    url: `${import.meta.env.VITE_BACKEND_URL}/cmc/dex/transactions`,
    method: 'POST',
    withCredentials: false
  });
  const [dataMapTransactions, setDataMapTransactions] = React.useState<TransactionType[]>([]);
  React.useEffect(() => {
    if (!currentCoinData?.id) {
      return;
    }
    getTransactionPairs({
      params: {
        ethAddress: currentCoinData.platform_ethereum,
        btcAddress: currentCoinData.platform_binance
      }
    }).finally();
  }, [currentCoinData?.id]);
  React.useEffect(() => {
    if (!dataTransactionPairs) {
      return;
    }
    getTransactions({
      data: {
        ethPairs: take(dataTransactionPairs.ethPairs, TRANSACTIONS_PAIRS_SLICE)
          .map(pair => {
            return `${pair.poolId}_${pair.quoteToken.address.toLowerCase() === currentCoinData.platform_ethereum}`;
          }),
        btcPairs: take(dataTransactionPairs.btcPairs, TRANSACTIONS_PAIRS_SLICE)
          .map(pair => {
            return `${pair.poolId}_${pair.quoteToken.address.toLowerCase() === currentCoinData.platform_binance}`;
          })
      }
    }).finally();
  }, [dataTransactionPairs]);

  React.useEffect(() => {
    if (!dataTransactions) {
      return;
    }
    setDataMapTransactions(take(dataTransactions, 300).map(transaction => {
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
        exchange: transaction.exchange,//'uniswap' | 'pancakeswap'
        tx: transaction.txn//string
      };
    }).sort((a, b) => b.date.getTime() - a.date.getTime()));
  }, [dataTransactions]);
  React.useEffect(() => {
    if (!dataTransactionPairs) {
      return;
    }
    const ethPairs = take(dataTransactionPairs.ethPairs, TRANSACTIONS_PAIRS_SLICE);
    const btcPairs = take(dataTransactionPairs.btcPairs, TRANSACTIONS_PAIRS_SLICE);
    const pairsMergedParams = [
      ...ethPairs.map(pair => {
        const reverse = `${pair.quoteToken.address.toLowerCase() === currentCoinData.platform_ethereum}`;
        return `dexscan@transaction@${pair.platform.id}@${pair.poolId}@${reverse}`;
      }),
      ...btcPairs.map(pair => {
        const reverse = `${pair.quoteToken.address.toLowerCase() === currentCoinData.platform_binance}`;
        return `dexscan@transaction@${pair.platform.id}@${pair.poolId}@${reverse}`;
      })
    ];
    pairsMergedParams.forEach((pairParams) => {
      sendMessage({
        method: 'SUBSCRIPTION',
        params: [pairParams as unknown as JsonValue]
      });
    });
    return () => {
      pairsMergedParams.forEach((pairParams) => {
        sendMessage({
          method: 'UNSUBSCRIPTION',
          params: [pairParams as unknown as JsonValue]
        });
      });
    };
  }, [dataTransactionPairs]);
  React.useEffect(() => {
    if (!lastMessage) {
      return;
    }
    const vars = lastMessage;
    if (!vars.d
      || !String(vars.c).includes('transaction')) {
      return;
    }
    const [, , platformId] = String(vars.c).split('@');
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
        exchange: platformId === '1' ? 'uniswap' : 'pancakeswap',//'uniswap' | 'pancakeswap'
        tx: transaction.txn//string
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
        exchange_image: _.exchange === 'uniswap' ? UniswapIcon : PancakeIcon,
        explorer_link: `${
          _.exchange === 'uniswap'
            ? 'https://etherscan.io/tx/'
            : 'https://bscscan.com/tx/'
        }${_.tx}`
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
