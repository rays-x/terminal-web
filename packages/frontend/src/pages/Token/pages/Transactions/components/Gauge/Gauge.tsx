import React, {FC, useMemo} from 'react';
import Icons from '../../../../../../assets';
import {GaugeStyled} from './Gauge-styled';
import GaugeIcon from '../../../../../../assets/icons/Gauge';
import GaugeArrow from '../../../../../../assets/icons/GaugeArrow';
import {CurrentCoinData} from '../../../../CoinPage';
import {useFetch} from '../../../../../../hooks';
import {TokenTransfersResponse} from '../../../../../../types/api/TokenTransfersResponse';
import {dateMapF} from '../../../../../../presets/helpers/charts';
import millify from 'millify';
import {chooseNumeralFormat, formatNumeral} from '../../../../../../utils/numbers';

export type BuySellPressureType = {
  buy?: number;
  sell?: number;
  status?: number;
}

interface GaugeProps extends BuySellPressureType {
}

export const Gauge: FC<GaugeProps> = React.memo(({status, buy, sell}) => {
  const currentCoinData = React.useContext(CurrentCoinData);

  const {data} = useFetch<TokenTransfersResponse>({
    url: `${import.meta.env.VITE_BACKEND_URL}/token/${currentCoinData?.id}/transfers`,
    withCredentials: false
  });

  const chartData = useMemo(() => {
    if(!data) {
      return [];
    }
    return data.items.map(item => ({
      date: item.date,
      transferCount: item.transferCount,
      totalAmountUsd: item.totalAmountUsd
    })).map(dateMapF).reverse();
  }, [data]);

  const fields = chartData.reduce((prev, next) => {
    prev['totalAmountUsd'] = next['totalAmountUsd'] + prev['totalAmountUsd'];
    prev['transferCount'] = next['transferCount'] + prev['transferCount'];
    return prev;
  }, {
    totalAmountUsd: 0,
    transferCount: 0
  });
  return (
    <GaugeStyled.Wrapper>
      <GaugeStyled.Title>Total transactions</GaugeStyled.Title>
      <GaugeStyled.SubTitle>
        {formatNumeral(
          fields?.transferCount,
          chooseNumeralFormat({value: fields?.transferCount})
        )}
      </GaugeStyled.SubTitle>
      <GaugeStyled.SubSubTitle>
        ${millify(fields.totalAmountUsd, {
        precision: 2
      })}
      </GaugeStyled.SubSubTitle>
    </GaugeStyled.Wrapper>
  );
  return (
    <GaugeStyled.Wrapper>
      <GaugeStyled.Title>Buy / Sell Pressure</GaugeStyled.Title>
      <GaugeStyled.Component>
        <GaugeIcon/>
        <GaugeStyled.Arrow status={(status || 0) * 1.8}>
          <GaugeArrow/>
        </GaugeStyled.Arrow>
      </GaugeStyled.Component>
      <GaugeStyled.Buttons>
        <GaugeStyled.BuyButton>
          <Icons.Rise style={{width: 10, height: 10}}/>
          {buy}%
        </GaugeStyled.BuyButton>
        <GaugeStyled.SellButton>
          <Icons.Fall style={{width: 10, height: 10}}/>
          {sell}%
        </GaugeStyled.SellButton>
      </GaugeStyled.Buttons>
    </GaugeStyled.Wrapper>
  );
});
