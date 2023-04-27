import styled, {css} from 'styled-components';
import {CrosshairMode} from 'lightweight-charts';
import {radius, sizing, spacing} from '../../../../../presets/base';
import {mixins} from '../../../../../presets/mixins';

export const layoutStyles = {
  layout: {
    backgroundColor: '#0f1725',
    textColor: 'rgba(255, 255, 255, 0.9)'
  },
  grid: {
    vertLines: {color: '#334158'},
    horzLines: {color: '#334158'}
  },
  crosshair: {
    mode: CrosshairMode.Magnet
  },
  timeScale: {
    borderColor: '#485c7b'
  }
};

export const candleSeriesStyles = {
  upColor: '#74ada7',
  wickUpColor: '#74ada7',
  downColor: '#d7766b',
  wickDownColor: '#d7766b'
};

export const Component = styled.div<{ $height: number }>`
  position: relative;
  border-radius: ${radius['20']};

  ${mixins.isMobile(css`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
  `)}

  padding: ${spacing['5']};
  background-color: ${layoutStyles.layout.backgroundColor};
  overflow: hidden;

  ${({$height}) =>
  $height &&
  css`
      height: ${$height}px;
    `}
`;

export const ChartContainer = styled.div`
  position: relative;
  width: ${sizing['0']};
`;

export const ChartLoader = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${layoutStyles.layout.backgroundColor};
`;

export const ChartStyled = {
  Component,
  ChartContainer,
  ChartLoader
};
