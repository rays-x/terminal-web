import React from 'react';
import {TextInfoStyled} from './TextInfo-styled';
import {CurrentCoinData} from '../../../../CoinPage';
import {get} from 'lodash';
import {differenceInDays, format} from 'date-fns';
import {useFetch} from '../../../../../../hooks';
import {TokenTransfersResponse} from '../../../../../../types/api/TokenTransfersResponse';

export const TextInfo = React.memo(() => {
  const currentCoinData = React.useContext(CurrentCoinData);

  const {data, loading} = useFetch<TokenTransfersResponse>({
    url: `${import.meta.env.VITE_BACKEND_URL}/token/${currentCoinData?.id}/transfers`,
    withCredentials: false
  });

  const dateTransferFirst = React.useMemo(() => {
    if(!currentCoinData?.dateLaunched) {
      return;
    }
    return format(currentCoinData.dateLaunched, 'yyyy-MM-dd');
  }, [currentCoinData?.dateLaunched]);
  const dateTransferLast = React.useMemo(() => {
    const date = get(data, 'items.0.date');
    return date ? format(new Date(date), 'yyyy-MM-dd') : undefined;
  }, [data]);
  const dateTransferDays = React.useMemo(() => {
    if(!dateTransferLast || !dateTransferFirst) {
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
