import styled, {css} from 'styled-components';
import {SCG} from '../../../../presets/types';
import {gap} from '../../../../presets/base';
import {mixins} from '../../../../presets/mixins';

export const Container = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2.7fr 1fr;
    grid-template-areas: '. .';
    display: flex;
    flex-direction: column;
  }
  ${mixins.isMobile(css`
    display: flex;
    flex-direction: column;
  `)}
  gap: ${gap[14]};
`;

export const GraphContainer = styled.div`
  background-color: #1e1f2b;
  display: flex;
  flex-direction: column;
  padding: 25px;
  ${mixins.isMobile(css`
    padding: 10px;
  `)}
  gap: 25px;
  border-radius: 20px;
`;

export const CurrentCoin = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 23px;
  background-color: #1e1f2b;
  border-radius: 20px;
`;

export const CoinPairs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${gap[14]};
  max-height: 80px;
  overflow: auto;
`;

export enum PriceChert {
  Container = 'Container',
  GraphContainer = 'GraphContainer',
  CurrentCoin = 'CurrentCoin',
  CoinPairs = 'CoinPairs'
}

export const PriceChartStyled: SCG<PriceChert> = {
  Container,
  GraphContainer,
  CurrentCoin,
  CoinPairs
};
