import React from 'react';
import {
  TransactionsBurnsUniswap3Query,
  TransactionsMintsUniswap3Query,
  TransactionsSwapsUniswap3Query,
  useTransactionsBurnsUniswap3LazyQuery,
  useTransactionsMintsUniswap3LazyQuery,
  useTransactionsSwapsUniswap3LazyQuery
} from '../../graphql/generated/schema-uniswap';
import {clientUniswap} from '../../graphql/clients/client-uniswap';
import {
  TransactionsBurnsPancakeQuery,
  TransactionsMintsPancakeQuery,
  TransactionsSwapsPancakeQuery,
  useTransactionsBurnsPancakeLazyQuery,
  useTransactionsMintsPancakeLazyQuery,
  useTransactionsSwapsPancakeLazyQuery
} from '../../graphql/generated/schema-pancake';
import {clientPancake} from '../../graphql/clients/client-pancake';
import {fromUnixTime} from 'date-fns';
import millify from 'millify';
import {hashShorten} from '../../utils/hashShorten';
import UniswapIcon from '../../assets/icons/dex/uniswap.png';
import PancakeIcon from '../../assets/icons/dex/pancake.png';
import EtherScanIcon from '../../assets/icons/dex/etherscan.jpg';
import BscScanIcon from '../../assets/icons/dex/bscscan.jpg';
import {VirtualTable} from '../App/UI/Table/VirtualTable';
import {toFixedToken} from '../../utils/diff';

type TransactionType = {
  id: string
  date: Date
  type: 'Sell' | 'Buy' | 'Add' | 'Remove'
  totalValue: string
  tokenValue0: string
  tokenValue1: string
  maker: string
  exchange: 'uniswap' | 'pancake'
  tx: string
}

type TransactionsProps = {
  pairUniswap: string
  pairPancake: string
  limit: number
}
const Transactions: React.FC<TransactionsProps> = React.memo<TransactionsProps>(({
                                                                                   pairUniswap: PAIR_UNISWAP,
                                                                                   pairPancake: PAIR_PANCAKE,
                                                                                   limit: PAGINATION_LIMIT
                                                                                 }) => {
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
  ] = useTransactionsSwapsUniswap3LazyQuery({
    client: clientUniswap
  });
  const [getTransactionsMintsUniswap,
    {data: dataMintsUniswapReceived, loading: loadingMintsUniswap}
  ] = useTransactionsMintsUniswap3LazyQuery({
    client: clientUniswap
  });
  const [getTransactionsBurnsUniswap,
    {data: dataBurnsUniswapReceived, loading: loadingBurnsUniswap}
  ] = useTransactionsBurnsUniswap3LazyQuery({
    client: clientUniswap
  });
  const [
    getTransactionsSwapsPancake,
    {data: dataSwapsPancakeReceived, loading: loadingSwapsPancake}
  ] = useTransactionsSwapsPancakeLazyQuery({
    client: clientPancake
  });
  const [
    getTransactionsBurnsPancake,
    {data: dataBurnsPancakeReceived, loading: loadingBurnsPancake}
  ] = useTransactionsBurnsPancakeLazyQuery({
    client: clientPancake
  });
  const [
    getTransactionsMintsPancake,
    {data: dataMintsPancakeReceived, loading: loadingMintsPancake}
  ] = useTransactionsMintsPancakeLazyQuery({
    client: clientPancake
  });

  const isLoading =
    loadingSwapsUniswap || loadingMintsUniswap || loadingBurnsUniswap
    || loadingSwapsPancake || loadingBurnsPancake || loadingMintsPancake;

  React.useEffect(() => {
    if(!dataSwapsUniswapReceived) {
      return;
    }
    const dataSwapsReceived = Object.values(dataSwapsUniswapReceived || {})
    .flatMap<any>(_ => _)
    .filter(_ => dataUniswap.findIndex(__ => _.id === __.id) === -1);
    const data = dataSwapsReceived
    .reduce<TransactionType[]>((prev, _: TransactionsSwapsUniswap3Query['swaps'][0]) => {
      switch(_['__typename']) {
        case 'Swap': {
          return [...prev, {
            id: _.id,
            date: fromUnixTime(_.timestamp),
            type: Number(_.amount0) < 0 ? 'Buy' : 'Sell',
            totalValue: `$${millify(toFixedToken(_.amountUSD, 2), {precision: 2})}`,
            tokenValue0: `${millify(toFixedToken(String(_.amount0).replace('-', ''), 2), {precision: 2})}`,
            tokenValue1: `${millify(toFixedToken(String(_.amount1).replace('-', ''), 2), {precision: 2})}`,
            maker: `${_.origin}`,
            exchange: `uniswap`,
            tx: `${_.transaction.id}`
          }];
        }
      }
    }, []);
    if(!dataSwapsReceived.length) {
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
    if(!dataBurnsUniswapReceived) {
      return;
    }
    const dataBurnsReceived = Object.values(dataBurnsUniswapReceived || {})
    .flatMap<any>(_ => _)
    .filter(_ => dataUniswap.findIndex(__ => _.id === __.id) == -1);
    const data = dataBurnsReceived
    .reduce<TransactionType[]>((prev, _: TransactionsBurnsUniswap3Query['burns'][0]) => {
      switch(_['__typename']) {
        case 'Burn': {
          return [...prev, {
            id: _.id,
            date: fromUnixTime(_.timestamp),
            type: `Remove`,
            totalValue: `$${millify(toFixedToken(_.amountUSD, 2), {precision: 2})}`,
            tokenValue0: `${millify(toFixedToken(_.amount0, 2), {precision: 2})}`,
            tokenValue1: `${millify(toFixedToken(_.amount1, 2), {precision: 2})}`,
            maker: `${_.owner}`,
            exchange: `uniswap`,
            tx: `${_.transaction.id}`
          }];
        }
      }
    }, []);
    if(!dataBurnsReceived.length) {
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
    if(!dataMintsUniswapReceived) {
      return;
    }
    const dataMintsReceived = Object.values(dataMintsUniswapReceived || {})
    .flatMap<any>(_ => _)
    .filter(_ => dataUniswap.findIndex(__ => _.id === __.id) == -1);
    const data = dataMintsReceived
    .reduce<TransactionType[]>((prev, _: TransactionsMintsUniswap3Query['mints'][0]) => {
      switch(_['__typename']) {
        case 'Mint': {
          return [...prev, {
            id: _.id,
            date: fromUnixTime(_.timestamp),
            type: `Add`,
            totalValue: `$${millify(toFixedToken(_.amountUSD, 2), {precision: 2})}`,
            tokenValue0: `${millify(toFixedToken(_.amount0, 2), {precision: 2})}`,
            tokenValue1: `${millify(toFixedToken(_.amount1, 2), {precision: 2})}`,
            maker: `${_.sender}`,
            exchange: `uniswap`,
            tx: `${_.transaction.id}`
          }];
        }
      }
    }, []);
    if(!dataMintsReceived.length) {
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
    if(!dataSwapsPancakeReceived) {
      return;
    }
    const dataSwapsReceived = Object.values(dataSwapsPancakeReceived || {})
    .flatMap<any>(_ => _)
    .filter(_ => dataUniswap.findIndex(__ => _.id === __.id) === -1);
    const data = dataSwapsReceived
    .reduce<TransactionType[]>((prev, _: TransactionsSwapsPancakeQuery['swaps'][0]) => {
      switch(_['__typename']) {
        case 'Swap': {
          const isBuy = Number(_.amount0In) > 0;
          return [...prev, {
            id: _.id,
            date: fromUnixTime(_.timestamp),
            type: isBuy ? 'Buy' : 'Sell',
            totalValue: `$${millify(toFixedToken(_.amountUSD, 2), {precision: 2})}`,
            tokenValue0: `${
              millify(
                isBuy ?
                  toFixedToken(String(_.amount0In).replace('-', ''), 2)
                  : toFixedToken(String(_.amount0Out).replace('-', ''), 2)
                , {precision: 2})
            }`,
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
    if(!dataSwapsReceived.length) {
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
    if(!dataBurnsPancakeReceived) {
      return;
    }
    const dataBurnsReceived = Object.values(dataBurnsPancakeReceived || {})
    .flatMap<any>(_ => _)
    .filter(_ => dataUniswap.findIndex(__ => _.id === __.id) == -1);
    const data = dataBurnsReceived
    .reduce<TransactionType[]>((prev, _: TransactionsBurnsPancakeQuery['burns'][0]) => {
      switch(_['__typename']) {
        case 'Burn': {
          return [...prev, {
            id: _.id,
            date: fromUnixTime(_.timestamp),
            type: `Remove`,
            totalValue: `$${millify(toFixedToken(_.amountUSD, 2), {precision: 2})}`,
            tokenValue0: `${millify(toFixedToken(_.amount0, 2), {precision: 2})}`,
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
    if(!dataBurnsReceived.length) {
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
    if(!dataMintsPancakeReceived) {
      return;
    }
    const dataMintsReceived = Object.values(dataMintsPancakeReceived || {})
    .flatMap<any>(_ => _)
    .filter(_ => dataUniswap.findIndex(__ => _.id === __.id) == -1);
    const data = dataMintsReceived
    .reduce<TransactionType[]>((prev, _: TransactionsMintsPancakeQuery['mints'][0]) => {
      switch(_['__typename']) {
        case 'Mint': {
          return [...prev, {
            id: _.id,
            date: fromUnixTime(_.timestamp),
            type: `Add`,
            totalValue: `$${millify(toFixedToken(_.amountUSD, 2), {precision: 2})}`,
            tokenValue0: `${millify(toFixedToken(_.amount0, 2), {precision: 2})}`,
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
    if(!dataMintsReceived.length) {
      return setMintsPagePancake(null);
    }
    setDataPancake(
      [
        ...dataPancake,
        ...data
      ]
    );
  }, [dataMintsPancakeReceived]);

  const transactions = [
    ...dataUniswap,
    ...dataPancake
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  React.useEffect(() => {
    if(!pageSwapsUniswap) {
      return;
    }
    getTransactionsSwapsUniswap({
      variables: {
        address: PAIR_UNISWAP,
        first: PAGINATION_LIMIT,
        skip: (pageSwapsUniswap - 1) * PAGINATION_LIMIT
      }
    }).finally();
  }, [pageSwapsUniswap]);
  React.useEffect(() => {
    if(!pageBurnsUniswap) {
      return;
    }
    getTransactionsBurnsUniswap({
      variables: {
        address: PAIR_UNISWAP,
        first: PAGINATION_LIMIT,
        skip: (pageBurnsUniswap - 1) * PAGINATION_LIMIT
      }
    }).finally();
  }, [pageBurnsUniswap]);
  React.useEffect(() => {
    if(!pageMintsUniswap) {
      return;
    }
    getTransactionsMintsUniswap({
      variables: {
        address: PAIR_UNISWAP,
        first: PAGINATION_LIMIT,
        skip: (pageMintsUniswap - 1) * PAGINATION_LIMIT
      }
    }).finally();
  }, [pageMintsUniswap]);
  React.useEffect(() => {
    if(!pageSwapsPancake) {
      return;
    }
    getTransactionsSwapsPancake({
      variables: {
        address: PAIR_PANCAKE,
        first: PAGINATION_LIMIT,
        skip: (pageSwapsPancake - 1) * PAGINATION_LIMIT
      }
    }).finally();
  }, [pageSwapsPancake]);
  React.useEffect(() => {
    if(!pageBurnsPancake) {
      return;
    }
    getTransactionsBurnsPancake({
      variables: {
        address: PAIR_PANCAKE,
        first: PAGINATION_LIMIT,
        skip: (pageBurnsPancake - 1) * PAGINATION_LIMIT
      }
    }).finally();
  }, [pageBurnsPancake]);
  React.useEffect(() => {
    if(!pageMintsPancake) {
      return;
    }
    getTransactionsMintsPancake({
      variables: {
        address: PAIR_PANCAKE,
        first: PAGINATION_LIMIT,
        skip: (pageMintsPancake - 1) * PAGINATION_LIMIT
      }
    }).finally();
  }, [pageMintsPancake]);

  React.useEffect(() => {
    if(!tableRefOuter.current) {
      return;
    }
    if(isLoading && !tableRefOuter.current.classList.contains('!overflow-hidden')) {
      tableRefOuter.current.classList.add('!overflow-hidden');
    } else {
      tableRefOuter.current.classList.remove('!overflow-hidden');
    }
  }, [
    `${pageMintsUniswap}:${pageBurnsUniswap}:${pageSwapsUniswap}:${isLoading}`,
    `${pageMintsPancake}:${pageBurnsPancake}:${pageSwapsPancake}:${isLoading}`
  ]);
  const checkPagination = React.useCallback((index: number) => {
    const filterUniswapSwaps = pageSwapsUniswap ? transactions
    .filter(({type, exchange}, i) => {
      return i <= index &&
        (type === 'Sell' || type === 'Buy') && exchange === 'uniswap';
    }) : [];
    if(pageSwapsUniswap
      && filterUniswapSwaps.length === (pageSwapsUniswap * PAGINATION_LIMIT)
    ) {
      setSwapsPageUniswap(pageSwapsUniswap + 1);
    }
    const filterUniswapBurns = pageBurnsUniswap ? transactions
    .filter(({type, exchange}, i) => {
      return i <= index
        && type === 'Remove' && exchange === 'uniswap';
    }) : [];
    if(pageBurnsUniswap && filterUniswapBurns.length === PAGINATION_LIMIT) {
      setBurnsPageUniswap(pageBurnsUniswap + 1);
    }
    const filterUniswapMints = pageMintsUniswap ? transactions
    .filter(({type, exchange}, i) => {
      return i <= index
        && type === 'Add' && exchange === 'uniswap';
    }) : [];
    if(pageMintsUniswap && filterUniswapMints.length === PAGINATION_LIMIT) {
      setMintsPageUniswap(pageMintsUniswap + 1);
    }
    const filterPancakeSwaps = pageSwapsPancake ? transactions
    .filter(({type, exchange}, i) => {
      return i <= index &&
        (type === 'Sell' || type === 'Buy') && exchange === 'pancake';
    }) : [];
    if(pageSwapsPancake
      && filterPancakeSwaps.length === (pageSwapsPancake * PAGINATION_LIMIT)
    ) {
      setSwapsPagePancake(pageSwapsPancake + 1);
    }
    const filterPancakeBurns = pageBurnsPancake ? transactions
    .filter(({type, exchange}, i) => {
      return i <= index
        && type === 'Remove' && exchange === 'pancake';
    }) : [];
    if(pageBurnsPancake && filterPancakeBurns.length === PAGINATION_LIMIT) {
      setBurnsPagePancake(pageBurnsPancake + 1);
    }
    const filterPancakeMints = pageMintsPancake ? transactions
    .filter(({type, exchange}, i) => {
      return i <= index
        && type === 'Add' && exchange === 'pancake';
    }) : [];
    if(pageMintsPancake && filterPancakeMints.length === PAGINATION_LIMIT) {
      setMintsPagePancake(pageMintsPancake + 1);
    }
  }, [
    `${pageMintsUniswap}:${pageBurnsUniswap}:${pageSwapsUniswap}:${transactions.length}`,
    `${pageMintsPancake}:${pageBurnsPancake}:${pageSwapsPancake}:${transactions.length}`
  ]);
  const Row = ({index}: any) => {
    const transaction: TransactionType = transactions[index];
    if(!transaction) return null;
    return (
      <tr key={transaction.id}>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-[#dbdfe6] font-semibold sm:pl-6">
          {`${new Date(transaction.date).toLocaleDateString()} ${new Date(transaction.date).toLocaleTimeString()}`}
        </td>
        <td className={
          `whitespace-nowrap px-3 py-4 text-sm font-semibold
                        ${(() => {
            switch(transaction.type) {
              case 'Buy': {
                return 'text-green-600';
              }
              case 'Sell': {
                return 'text-red-600';
              }
              case 'Add': {
                return 'text-yellow-600';
              }
              case 'Remove': {
                return 'text-blue-600';
              }
              default: {
                return 'text-[#dbdfe6]';
              }
            }
          })()}
                        `}>{transaction.type}</td>
        <td
          className="whitespace-nowrap px-3 py-4 text-sm font-semibold text-[#dbdfe6]">{transaction.totalValue}</td>
        <td
          className="whitespace-nowrap px-3 py-4 text-sm font-semibold text-[#dbdfe6]">{transaction.tokenValue0}</td>
        <td
          className="whitespace-nowrap px-3 py-4 text-sm font-semibold text-[#dbdfe6]">{transaction.tokenValue1}</td>
        <td
          className="whitespace-nowrap px-3 py-4 text-sm font-semibold text-[#dbdfe6]">{hashShorten(transaction.maker)}</td>
        <td className="whitespace-nowrap px-3 py-4 text-sm font-semibold text-[#dbdfe6]">
          <div
            className="h-[32px] w-[32px] bg-no-repeat bg-center bg-contain"
            style={{
              backgroundImage: `url(${transaction.exchange === 'uniswap'
                ? UniswapIcon
                : PancakeIcon})`
            }}
          />
        </td>
        <td
          className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-semibold sm:pr-6 text-[#dbdfe6]">
          <a href={`${
            transaction.exchange === 'uniswap'
              ? 'https://etherscan.io/tx/'
              : 'https://bscscan.com/tx/'
          }${transaction.tx}`} target="_blank">
            <div
              className="h-[32px] w-[32px] bg-no-repeat bg-center bg-contain rounded-full"
              style={{
                backgroundImage: `url(${transaction.exchange === 'uniswap'
                  ? EtherScanIcon
                  : BscScanIcon})`
              }}
            />
          </a>
        </td>
      </tr>
    );
  };
  return (
    <>
      <div className="sm:flex sm:items-center my-4">
        <div className="sm:flex-auto">
          <h3 className="text-h3 font-semibold text-white">Transactions</h3>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="min-w-full align-middle ">
          <div className="w-full h-full my-0 mx-auto self-center bg-[#0c0e1d] rounded-2xl relative">
            <VirtualTable
              outerRef={tableRefOuter}
              height={624}
              width="100%"
              itemCount={transactions.length}
              itemSize={64}
              header={
                <thead className="bg-[#1f2037] sticky top-0 z-10">
                <tr>
                  <th scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-bold text-[#9292ab] sm:pl-6 whitespace-nowrap">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-bold text-[#9292ab] whitespace-nowrap">
                    <a href="#" className="group inline-flex">
                      Side
                      {/*<span className="ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300">
                          <ChevronDownIcon className="h-5 w-5" aria-hidden="true"/>
                        </span>*/}
                    </a>
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-bold text-[#9292ab] whitespace-nowrap">
                    Total Value
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-bold text-[#9292ab] whitespace-nowrap">
                    Token Amount
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-bold text-[#9292ab] whitespace-nowrap">
                    Token Amount
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-bold text-[#9292ab] whitespace-nowrap">
                    Maker
                  </th>
                  <th scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-left text-sm font-bold text-[#9292ab] whitespace-nowrap">
                    Other
                  </th>
                </tr>
                </thead>
              }
              tableProps={{
                className: 'min-w-full'
              }}
              tbodyProps={{
                className: `${isLoading ? 'opacity-10' : ''}`
              }}
              footer={null}
              row={Row}
              onItemsRendered={({visibleStopIndex}) => {
                checkPagination(visibleStopIndex);
              }}
            />
            <div className={`absolute top-[50%] left-[50%] ${isLoading ? '' : 'hidden'}`}>
              <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg"
                   fill="none"
                   viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
export default Transactions;
