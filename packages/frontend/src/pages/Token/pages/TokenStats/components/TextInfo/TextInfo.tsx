import React from 'react';
import {TextInfoStyled} from './TextInfo-styled';
import {StatsTransferResponse} from '../../../../types';
import {CurrentCoinData} from '../../../../CoinPage';
import {useLazyFetch} from '../../../../../../hooks/useFetch';
import {get, take, takeRight} from 'lodash';

export const TextInfo = React.memo(() => {
  const currentCoinData = React.useContext(CurrentCoinData);
  const [{data, loading}, getLazyStatsTransfers] = useLazyFetch<StatsTransferResponse[]>({
    url: `${import.meta.env.VITE_BACKEND_URL}/bq/stats/transfers`,
    withCredentials: false
  });

  React.useEffect(() => {
    if (!currentCoinData?.id) {
      return;
    }
    getLazyStatsTransfers({
      params: {
        btcAddress: currentCoinData.platform_binance,
        ethAddress: currentCoinData.platform_ethereum
      }
    }).catch();
  }, [currentCoinData?.id]);


  const dateTransferFirst = get(takeRight(data, 1), '0.date');
  const dateTransferLast = get(take(data, 1), '0.date');
  const dateTransferDays = data?.length;/*first_transfer_date && last_transfer_date
    ? differenceInDays(new Date(last_transfer_date), new Date(first_transfer_date))
    : undefined;*/

  return (
    <TextInfoStyled.Component>
      <TextInfoStyled.Item>
        <div>First Transfer Date</div>
        <div>{dateTransferFirst}</div>
      </TextInfoStyled.Item>
      <TextInfoStyled.Item>
        <div>Last Transfer Date</div>
        <div>{dateTransferLast}</div>
      </TextInfoStyled.Item>
      <TextInfoStyled.Item>
        <div>Days Token transferred</div>
        <div>{dateTransferDays}</div>
      </TextInfoStyled.Item>
    </TextInfoStyled.Component>
  );
});
