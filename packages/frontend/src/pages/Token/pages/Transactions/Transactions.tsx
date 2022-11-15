import React from 'react';
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
import {sample} from 'lodash';
import {
  TransactionsBurnsUniswapQuery, TransactionsMintsUniswapQuery,
  TransactionsSwapsUniswapQuery,
  useTransactionsBurnsUniswapLazyQuery,
  useTransactionsMintsUniswapLazyQuery,
  useTransactionsSwapsUniswapLazyQuery
} from '../../../../graphql/generated/schema-uniswap';
import {clientUniswap} from '../../../../graphql/clients/client-uniswap';
import {
  TransactionsBurnsPancakeQuery,
  TransactionsMintsPancakeQuery,
  TransactionsSwapsPancakeQuery,
  useTransactionsBurnsPancakeLazyQuery,
  useTransactionsMintsPancakeLazyQuery,
  useTransactionsSwapsPancakeLazyQuery
} from '../../../../graphql/generated/schema-pancake';
import {clientPancake} from '../../../../graphql/clients/client-pancake';
import {fromUnixTime} from 'date-fns';
import millify from 'millify';
import {toFixedToken} from '../../../../utils/diff';
import {CmcDetail, TransactionsPairsResponse, TransactionType} from '../../types';
import {useFetch} from '../../../../hooks';
import {useNetworkExchanges} from '../../../../store/networkExchanges';
import {
  CMC_ID_BTC_PLATFORM,
  CMC_ID_ETH_PLATFORM,
  CMC_ID_PANCAKE_V2, CMC_ID_UNISWAP_V2,
  CMC_ID_UNISWAP_V3
} from '../../../../constants/coinmarketcap';
import UniswapIcon from '../../../../assets/icons/dex/uniswap.png';
import PancakeIcon from '../../../../assets/icons/dex/pancake.png';
import {CmcSearch} from '../PriceChart/types';
import {useLazyFetch} from '../../../../hooks/useFetch';
import {CmcPairInfo} from '../PriceChart/chart/types';
import next from '../../../../components/_old2/Table/TableFooter/next';

const PAGINATION_LIMIT = 100;
export const Transactions: React.FC = React.memo(() => {
  const currentCoinData = React.useContext(CurrentCoinData);
  const {token, chain} = useParams();
  const [id] = token.split('_');
  const [PAIR_UNISWAP, setPairsUniswap] = React.useState<string[]>([]);
  const [PAIR_PANCAKE, setPairsPancake] = React.useState<string[]>([]);
  /*const {data: _data, loading} = useFetch<TransactionsPairsResponse>({
    url: `${import.meta.env.VITE_BACKEND_URL}/cmc/dex/pairs-list`,
    params: {
      address: id,
      dex: ['uniswap', 'pancakeswap'],
      platform: chain === 'eth' ? CMC_ID_ETH_PLATFORM : CMC_ID_BTC_PLATFORM
    },
    withCredentials: false
  });*/
  const [, getPairs] = useLazyFetch<CmcSearch>({
    url: `${import.meta.env.VITE_BACKEND_PROXY_URL}/dexer/v3/dexer/search/main-site`,
    withCredentials: false
  });
  React.useEffect(() => {
    if (currentCoinData?.platform_ethereum) {
      getPairs({
        params: {
          keyword: currentCoinData.platform_ethereum.toLowerCase(),
          all: true
        }
      }).then(({data: {data}}) => {
        setPairsUniswap(
          data.pairs
            .reduce((prev, pair) => (
              CMC_ID_UNISWAP_V3 === pair.exchangeId
                ? [...prev, pair.pairContractAddress.toLowerCase()]
                : prev
            ), [])
        );
      });
    } else {
      setPairsUniswap([]);
    }
    if (currentCoinData?.platform_binance) {
      getPairs({
        params: {
          keyword: currentCoinData.platform_binance.toLowerCase(),
          all: true
        }
      }).then(({data: {data}}) => {
        setPairsPancake(
          data.pairs
            .reduce((prev, pair) => (
              CMC_ID_PANCAKE_V2 === pair.exchangeId
                ? [...prev, pair.pairContractAddress.toLowerCase()]
                : prev
            ), [])
        );
      });
    } else {
      setPairsPancake([]);
    }

  }, [currentCoinData?.platform_binance, currentCoinData?.platform_ethereum]);
  const coinIndex = currentCoinData?.index;
  const buy = React.useMemo(() => {
    return sample(Array.from({length: 100}).map((_, i) => i + 1));
  }, [currentCoinData?.price_change_24h]);

  const buySellPressure = {
    buy: buy,
    sell: 100 - buy,
    status: buy
  };

  const tableRefOuter = React.useRef<HTMLDivElement>(null);
  const [dataUniswap, setDataUniswap] = React.useState<TransactionType[]>([]);
  const [dataPancake, setDataPancake] = React.useState<TransactionType[]>([]);
  const [pageSwapsUniswap, setSwapsPageUniswap] = React.useState<number | null>(1);
  const [pageMintsUniswap, setMintsPageUniswap] = React.useState<number | null>(1);
  const [pageBurnsUniswap, setBurnsPageUniswap] = React.useState<number | null>(1);
  const [pageSwapsPancake, setSwapsPagePancake] = React.useState<number | null>(1);
  const [pageMintsPancake, setMintsPagePancake] = React.useState<number | null>(1);
  const [pageBurnsPancake, setBurnsPagePancake] = React.useState<number | null>(1);
  const [getTransactionsSwapsUniswap,
    {data: dataSwapsUniswapReceived, loading: loadingSwapsUniswap}
  ] = useTransactionsSwapsUniswapLazyQuery({
    client: clientUniswap,
    fetchPolicy: 'no-cache'
  });
  const [getTransactionsMintsUniswap,
    {data: dataMintsUniswapReceived, loading: loadingMintsUniswap}
  ] = useTransactionsMintsUniswapLazyQuery({
    client: clientUniswap,
    fetchPolicy: 'no-cache'
  });
  const [getTransactionsBurnsUniswap,
    {data: dataBurnsUniswapReceived, loading: loadingBurnsUniswap}
  ] = useTransactionsBurnsUniswapLazyQuery({
    client: clientUniswap,
    fetchPolicy: 'no-cache'
  });
  const [
    getTransactionsSwapsPancake,
    {data: dataSwapsPancakeReceived, loading: loadingSwapsPancake}
  ] = useTransactionsSwapsPancakeLazyQuery({
    client: clientPancake,
    fetchPolicy: 'no-cache'
  });
  const [
    getTransactionsBurnsPancake,
    {data: dataBurnsPancakeReceived, loading: loadingBurnsPancake}
  ] = useTransactionsBurnsPancakeLazyQuery({
    client: clientPancake,
    fetchPolicy: 'no-cache'
  });
  const [
    getTransactionsMintsPancake,
    {data: dataMintsPancakeReceived, loading: loadingMintsPancake}
  ] = useTransactionsMintsPancakeLazyQuery({
    client: clientPancake,
    fetchPolicy: 'no-cache'
  });

  React.useEffect(() => {
    if (!dataSwapsUniswapReceived) {
      return;
    }
    const dataSwapsReceived = Object.values(dataSwapsUniswapReceived || {})
      .flatMap<any>(_ => _)
      .filter(_ => dataUniswap.findIndex(__ => _.id === __.id) === -1);
    const data = dataSwapsReceived
      .reduce<TransactionType[]>((prev, _: TransactionsSwapsUniswapQuery['swaps'][0]) => {
        switch (_['__typename']) {
          case 'Swap': {
            return [...prev, {
              id: _.id,
              date: fromUnixTime(_.timestamp),
              type: Number(_.amount0) < 0 ? 'Buy' : 'Sell',
              totalValue: `$${millify(toFixedToken(_.amountUSD, 2), {precision: 2})}`,
              tokenValue0: `${millify(toFixedToken(String(_.amount0).replace('-', ''), 2), {precision: 2})}`,
              tokenValue0Price: millify(toFixedToken(Number(_.amountUSD) / Number(_.amount0), 2), {precision: 2}),
              tokenValue1: `${millify(toFixedToken(String(_.amount1).replace('-', ''), 2), {precision: 2})}`,
              maker: `${_.origin}`,
              exchange: `uniswap`,
              tx: `${_.transaction.id}`
            }];
          }
        }
      }, []);
    if (!dataSwapsReceived.length) {
      return setSwapsPageUniswap(null);
    }
    setDataUniswap(
      [
        ...dataUniswap,
        ...data
      ]
    );
  }, [dataSwapsUniswapReceived]);
  React.useEffect(() => {
    if (!dataBurnsUniswapReceived) {
      return;
    }
    const dataBurnsReceived = Object.values(dataBurnsUniswapReceived || {})
      .flatMap<any>(_ => _)
      .filter(_ => dataUniswap.findIndex(__ => _.id === __.id) == -1);
    const data = dataBurnsReceived
      .reduce<TransactionType[]>((prev, _: TransactionsBurnsUniswapQuery['burns'][0]) => {
        switch (_['__typename']) {
          case 'Burn': {
            return [...prev, {
              id: _.id,
              date: fromUnixTime(_.timestamp),
              type: `Remove`,
              totalValue: `$${millify(toFixedToken(_.amountUSD, 2), {precision: 2})}`,
              tokenValue0: `${millify(toFixedToken(_.amount0, 2), {precision: 2})}`,
              tokenValue0Price: millify(toFixedToken(Number(_.amountUSD) / Number(_.amount0), 2), {precision: 2}),
              tokenValue1: `${millify(toFixedToken(_.amount1, 2), {precision: 2})}`,
              maker: `${_.owner}`,
              exchange: `uniswap`,
              tx: `${_.transaction.id}`
            }];
          }
        }
      }, []);
    if (!dataBurnsReceived.length) {
      return setBurnsPageUniswap(null);
    }
    setDataUniswap(
      [
        ...dataUniswap,
        ...data
      ]
    );
  }, [dataBurnsUniswapReceived]);
  React.useEffect(() => {
    if (!dataMintsUniswapReceived) {
      return;
    }
    const dataMintsReceived = Object.values(dataMintsUniswapReceived || {})
      .flatMap<any>(_ => _)
      .filter(_ => dataUniswap.findIndex(__ => _.id === __.id) == -1);
    const data = dataMintsReceived
      .reduce<TransactionType[]>((prev, _: TransactionsMintsUniswapQuery['mints'][0]) => {
        switch (_['__typename']) {
          case 'Mint': {
            return [...prev, {
              id: _.id,
              date: fromUnixTime(_.timestamp),
              type: `Add`,
              totalValue: `$${millify(toFixedToken(_.amountUSD, 2), {precision: 2})}`,
              tokenValue0: `${millify(toFixedToken(_.amount0, 2), {precision: 2})}`,
              tokenValue0Price: millify(toFixedToken(Number(_.amountUSD) / Number(_.amount0), 2), {precision: 2}),
              tokenValue1: `${millify(toFixedToken(_.amount1, 2), {precision: 2})}`,
              maker: `${_.sender}`,
              exchange: `uniswap`,
              tx: `${_.transaction.id}`
            }];
          }
        }
      }, []);
    if (!dataMintsReceived.length) {
      return setMintsPageUniswap(null);
    }
    setDataUniswap(
      [
        ...dataUniswap,
        ...data
      ]
    );
  }, [dataMintsUniswapReceived]);
  React.useEffect(() => {
    if (!dataSwapsPancakeReceived) {
      return;
    }
    const dataSwapsReceived = Object.values(dataSwapsPancakeReceived || {})
      .flatMap<any>(_ => _)
      .filter(_ => dataUniswap.findIndex(__ => _.id === __.id) === -1);
    const data = dataSwapsReceived
      .reduce<TransactionType[]>((prev, _: TransactionsSwapsPancakeQuery['swaps'][0]) => {
        switch (_['__typename']) {
          case 'Swap': {
            const isBuy = Number(_.amount0In) > 0;
            return [...prev, {
              id: _.id,
              date: fromUnixTime(_.timestamp),
              type: isBuy ? 'Buy' : 'Sell',
              totalValue: `$${millify(toFixedToken(_.amountUSD, 2), {precision: 2})}`,
              /*tokenValue0: `${
                millify(
                  isBuy ?
                    toFixedToken(String(_.amount0In).replace('-', ''), 2)
                    : toFixedToken(String(_.amount0Out).replace('-', ''), 2)
                  , {precision: 2})
              }`,
              tokenValue0Price: millify(toFixedToken(Number(_.amountUSD) / Number(isBuy
                ? _.amount0In
                : _.amount0Out
              ), 2), {precision: 2}),*/
              tokenValue1: `${
                millify(
                  isBuy ?
                    toFixedToken(String(_.amount1Out).replace('-', ''), 2)
                    : toFixedToken(String(_.amount1In).replace('-', ''), 2)
                  , {precision: 2})
              }`,
              maker: `${_.from}`,
              exchange: `pancake`,
              tx: `${_.id.split('-').shift()}`
            }];
          }
        }
        return prev;
      }, [])
      .filter(_ => dataPancake.findIndex(__ => _.id === __.id) == -1);
    if (!dataSwapsReceived.length) {
      return setSwapsPagePancake(null);
    }
    setDataPancake(
      [
        ...dataPancake,
        ...data
      ]
    );
  }, [dataSwapsPancakeReceived]);
  React.useEffect(() => {
    if (!dataBurnsPancakeReceived) {
      return;
    }
    const dataBurnsReceived = Object.values(dataBurnsPancakeReceived || {})
      .flatMap<any>(_ => _)
      .filter(_ => dataUniswap.findIndex(__ => _.id === __.id) == -1);
    const data = dataBurnsReceived
      .reduce<TransactionType[]>((prev, _: TransactionsBurnsPancakeQuery['burns'][0]) => {
        switch (_['__typename']) {
          case 'Burn': {
            return [...prev, {
              id: _.id,
              date: fromUnixTime(_.timestamp),
              type: `Remove`,
              totalValue: `$${millify(toFixedToken(_.amountUSD, 2), {precision: 2})}`,
              /*tokenValue0: `${millify(toFixedToken(_.amount0, 2), {precision: 2})}`,
              tokenValue0Price: millify(toFixedToken(Number(_.amountUSD) / Number(_.amount0), 2), {precision: 2}),*/
              tokenValue1: `${millify(toFixedToken(_.amount1, 2), {precision: 2})}`,
              maker: `${_.sender}`,
              exchange: `pancake`,
              tx: `${_.id.split('-').shift()}`
            }];
          }
        }
        return prev;
      }, [])
      .filter(_ => dataPancake.findIndex(__ => _.id === __.id) == -1);
    if (!dataBurnsReceived.length) {
      return setBurnsPagePancake(null);
    }
    setDataPancake(
      [
        ...dataPancake,
        ...data
      ]
    );
  }, [dataBurnsPancakeReceived]);
  React.useEffect(() => {
    if (!dataMintsPancakeReceived) {
      return;
    }
    const dataMintsReceived = Object.values(dataMintsPancakeReceived || {})
      .flatMap<any>(_ => _)
      .filter(_ => dataUniswap.findIndex(__ => _.id === __.id) == -1);
    const data = dataMintsReceived
      .reduce<TransactionType[]>((prev, _: TransactionsMintsPancakeQuery['mints'][0]) => {
        switch (_['__typename']) {
          case 'Mint': {
            return [...prev, {
              id: _.id,
              date: fromUnixTime(_.timestamp),
              type: `Add`,
              totalValue: `$${millify(toFixedToken(_.amountUSD, 2), {precision: 2})}`,
              /*tokenValue0: `${millify(toFixedToken(_.amount0, 2), {precision: 2})}`,
              tokenValue0Price: millify(toFixedToken(Number(_.amountUSD) / Number(_.amount0), 2), {precision: 2}),*/
              tokenValue1: `${millify(toFixedToken(_.amount1, 2), {precision: 2})}`,
              maker: `${_.sender}`,
              exchange: `pancake`,
              tx: `${_.id.split('-').shift()}`
            }];
          }
        }
        return prev;
      }, [])
      .filter(_ => dataPancake.findIndex(__ => _.id === __.id) == -1);
    if (!dataMintsReceived.length) {
      return setMintsPagePancake(null);
    }
    setDataPancake(
      [
        ...dataPancake,
        ...data
      ]
    );
  }, [dataMintsPancakeReceived]);

  const transactionsApi = [
    ...dataUniswap,
    ...dataPancake
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  React.useEffect(() => {
    if (!pageSwapsUniswap || !PAIR_UNISWAP?.length) {
      return;
    }
    getTransactionsSwapsUniswap({
      variables: {
        address: PAIR_UNISWAP,
        first: PAGINATION_LIMIT,
        skip: (pageSwapsUniswap - 1) * PAGINATION_LIMIT
      }
    }).finally();
  }, [pageSwapsUniswap, PAIR_UNISWAP]);
  React.useEffect(() => {
    if (!pageBurnsUniswap || !PAIR_UNISWAP?.length) {
      return;
    }
    getTransactionsBurnsUniswap({
      variables: {
        address: PAIR_UNISWAP,
        first: PAGINATION_LIMIT,
        skip: (pageBurnsUniswap - 1) * PAGINATION_LIMIT
      }
    }).finally();
  }, [pageBurnsUniswap, PAIR_UNISWAP]);
  React.useEffect(() => {
    if (!pageMintsUniswap || !PAIR_UNISWAP?.length) {
      return;
    }
    getTransactionsMintsUniswap({
      variables: {
        address: PAIR_UNISWAP,
        first: PAGINATION_LIMIT,
        skip: (pageMintsUniswap - 1) * PAGINATION_LIMIT
      }
    }).finally();
  }, [pageMintsUniswap, PAIR_UNISWAP]);
  React.useEffect(() => {
    if (!pageSwapsPancake || !PAIR_PANCAKE?.length) {
      return;
    }
    getTransactionsSwapsPancake({
      variables: {
        address: PAIR_PANCAKE,
        first: PAGINATION_LIMIT,
        skip: (pageSwapsPancake - 1) * PAGINATION_LIMIT
      }
    }).finally();
  }, [pageSwapsPancake, PAIR_PANCAKE]);
  React.useEffect(() => {
    if (!pageBurnsPancake || !PAIR_PANCAKE?.length) {
      return;
    }
    getTransactionsBurnsPancake({
      variables: {
        address: PAIR_PANCAKE,
        first: PAGINATION_LIMIT,
        skip: (pageBurnsPancake - 1) * PAGINATION_LIMIT
      }
    }).finally();
  }, [pageBurnsPancake, PAIR_PANCAKE]);
  React.useEffect(() => {
    if (!pageMintsPancake || !PAIR_PANCAKE?.length) {
      return;
    }
    getTransactionsMintsPancake({
      variables: {
        address: PAIR_PANCAKE,
        first: PAGINATION_LIMIT,
        skip: (pageMintsPancake - 1) * PAGINATION_LIMIT
      }
    }).finally();
  }, [pageMintsPancake, PAIR_PANCAKE]);

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
      {Header: 'Maker', accessor: 'maker', width: 60},
      {Header: 'Ex', accessor: 'exchange_image', width: 10, justify: 'center'},
      {Header: 'Explore', accessor: 'explorer_link', width: 10, justify: 'center'}
    ];
  }, [coinIndex]);

  const transactions = transactionsApi.map(_ => {
    return {
      date: _.date,
      side: _.type,
      price_usd: _.tokenValue0Price,
      amount: _.tokenValue0,
      total_usd: _.totalValue,
      maker: _.maker,
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
