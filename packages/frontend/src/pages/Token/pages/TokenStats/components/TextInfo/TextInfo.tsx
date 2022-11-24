import React from 'react';
import {TextInfoStyled} from './TextInfo-styled';
import {StatsTransfersResponse} from '../../../../types';
import {CurrentCoinData} from '../../../../CoinPage';
import {useLazyFetch} from '../../../../../../hooks/useFetch';
import {get, take, takeRight} from 'lodash';
import {differenceInDays, format} from 'date-fns';

export const TextInfo = React.memo(() => {
  const currentCoinData = React.useContext(CurrentCoinData);
  const [{data, loading}, getLazyStatsTransfers] = useLazyFetch<StatsTransfersResponse[]>({
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


  const dateTransferFirst = React.useMemo(() => {
    if (!currentCoinData?.dateLaunched) {
      return;
    }
    return format(currentCoinData.dateLaunched, 'yyyy-MM-dd');
  }, [currentCoinData?.dateLaunched]);
  const dateTransferLast = get(take(data, 1), '0.date');
  const dateTransferDays = React.useMemo(() => {
    if (!dateTransferLast || !dateTransferFirst) {
      return;
    }
    return differenceInDays(new Date(dateTransferLast), new Date(dateTransferFirst));
  }, [dateTransferLast, dateTransferFirst]);

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
