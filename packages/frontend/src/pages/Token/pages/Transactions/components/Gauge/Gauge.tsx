import {FC} from 'react';
import Icons from '../../../../../../assets';
import {GaugeStyled} from './Gauge-styled';
import GaugeIcon from '../../../../../../assets/icons/Gauge';
import GaugeArrow from '../../../../../../assets/icons/GaugeArrow';

export type BuySellPressureType = {
  buy?: number;
  sell?: number;
  status?: number;
}

interface GaugeProps extends BuySellPressureType {
}

export const Gauge: FC<GaugeProps> = ({status, buy, sell}) => {
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
};
