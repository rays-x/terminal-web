import React from 'react';
import {TextInfoStyled} from './TextInfo-styled';
import {CurrentCoinData} from '../../../../CoinPage';
import {useFetch} from '../../../../../../hooks';
import { BQ_API_KEY } from '../../../../../../constants';
import { gqlQuery } from './constants';
import { TransferDateStats } from './types';

export const TextInfo = React.memo(() => {
  const currentCoinData = React.useContext(CurrentCoinData);

  const { data } = useFetch<TransferDateStats>({
    url: 'https://graphql.bitquery.io/',
    withCredentials: false,
    method: 'POST',
    headers: {
      'X-Api-Key': BQ_API_KEY,
    },
    data: {
      query: gqlQuery,
      variables: {
        network: currentCoinData?.platforms[0].blockchain.bqSlug,
        token: currentCoinData?.platforms[0].address,
      },
    }
  });

  return (
    <TextInfoStyled.Component>
      <TextInfoStyled.Item>
        <div>First Transfer Date</div>
        <div>{data?.data?.ethereum?.transfers?.[0]?.minimum || 0}</div>
      </TextInfoStyled.Item>
      <TextInfoStyled.Item>
        <div>Last Transfer Date</div>
        <div>{data?.data?.ethereum?.transfers?.[0]?.maximum || 0}</div>
      </TextInfoStyled.Item>
      <TextInfoStyled.Item>
        <div>Days Token transferred</div>
        <div>{data?.data?.ethereum?.transfers?.[0]?.count || 0}</div>
      </TextInfoStyled.Item>
    </TextInfoStyled.Component>
  );
});
