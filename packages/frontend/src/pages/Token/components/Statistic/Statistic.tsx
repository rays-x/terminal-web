import React, {FC, useContext} from 'react';
import {isNil} from 'lodash-es';
import {CurrentCoinData} from '../../CoinPage';
import {EMDASH} from '../../../../utils/data/utf';
import {chooseNumeralFormat, formatNumeral} from '../../../../utils/numbers';
import {StatisticStyled} from './Statistic-styled';
import {LinkButton} from '../../../../components/_old/ui/Buttons/LinkButton/LinkButton';
import {TypographyArrow} from '../../../../components/_old/ui/Typography/Typography';
import {ColorVariant} from '../../../../components/_old/ui/Typography/Typography-styled';
import CirculationSupply from '../../../../assets/icons/CirculationSupply';
import TotalSupply from '../../../../assets/icons/TotalSupply';
import MarketCap from '../../../../assets/icons/MarketCap';
import FullyDiluted from '../../../../assets/icons/FullyDiluted';
import DailyVolume from '../../../../assets/icons/DailyVolume';

interface StatsProps {
  label: string;
  icon: React.ReactNode;
  valueKey: string;
  changeKey?: string;
}

const stats: StatsProps[] = [
  {
    label: 'Circulation Supply',
    icon: <CirculationSupply/>,
    valueKey: 'circulation_supply'
  },
  {
    label: 'Total Supply',
    icon: <TotalSupply/>,
    valueKey: 'total_supply'
  },
  {
    label: 'Market Cap',
    icon: <MarketCap/>,
    valueKey: 'market_cap'
  },
  {
    label: 'Fully Diluted MC',
    icon: <FullyDiluted/>,
    valueKey: 'fully_diluted_mc',
    changeKey: 'fully_diluted_mc_change'
  },
  {
    label: 'Daily Volume',
    icon: <DailyVolume/>,
    valueKey: 'daily_volume',
    changeKey: 'daily_volume_change'
  }
];

export const Statistic: FC = () => {
  const currentCoinData = useContext(CurrentCoinData);

  return (
    <StatisticStyled.Component>
      {stats.map((item) => {
        const value = currentCoinData?.[item.valueKey];
        const valueChange = item.changeKey
          ? currentCoinData?.[item.changeKey]?.toFixed(0)
          : null;

        return (
          <StatisticStyled.StatisticGroup key={item.valueKey}>
            <StatisticStyled.StatisticGroupIcon>
              <LinkButton size={'100%'}>{item.icon}</LinkButton>
            </StatisticStyled.StatisticGroupIcon>

            <StatisticStyled.StatisticFieldGroup>
              <StatisticStyled.StatisticGroupTitle>
                {item.label}
              </StatisticStyled.StatisticGroupTitle>

              <StatisticStyled.StatisticGroupValue>
                {value
                  ? formatNumeral(
                    +value,
                    chooseNumeralFormat({value: +value})
                  )
                  : EMDASH}
              </StatisticStyled.StatisticGroupValue>

              {!isNil(valueChange) && (
                <TypographyArrow
                  lineHeight={11}
                  fontSize={12}
                  color={
                    valueChange && valueChange >= 0
                      ? ColorVariant.rise
                      : ColorVariant.fall
                  }
                >
                  {Math.abs(valueChange)}%
                </TypographyArrow>
              )}
            </StatisticStyled.StatisticFieldGroup>
          </StatisticStyled.StatisticGroup>
        );
      })}
    </StatisticStyled.Component>
  );
};
