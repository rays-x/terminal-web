import React from 'react';

import {useParams} from 'react-router';
import {TextInfoStyled} from './TextInfo-styled';

export const TextInfo = () => {
  const {token: input} = useParams();

  const mergedFields = {
    transfersStats: {
      overAllData: undefined
    }
  } /*useMerge(
    TRANSFER_STATS_FIELDS_QUERY,
    TRANSFER_STATS_FIELDS,
    {
      variables: { input }
    }
  )*/;

  const fields = mergedFields?.transfersStats?.overAllData;

  return (
    <TextInfoStyled.Component>
      <TextInfoStyled.Item>
        <div>First Transfer Date</div>
        <div>{fields?.first_transfer_date}</div>
      </TextInfoStyled.Item>
      <TextInfoStyled.Item>
        <div>Last Transfer Date</div>
        <div>{fields?.last_transfer_date}</div>
      </TextInfoStyled.Item>
      <TextInfoStyled.Item>
        <div>Days Token transfered</div>
        <div>{fields?.days_token_transfer}</div>
      </TextInfoStyled.Item>
    </TextInfoStyled.Component>
  );
};
