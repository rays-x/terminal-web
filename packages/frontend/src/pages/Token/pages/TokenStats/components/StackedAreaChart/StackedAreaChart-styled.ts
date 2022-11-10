import styled, { css } from 'styled-components';
import { colors } from '../../../../../../presets/base';
import { mixins } from '../../../../../../presets/mixins';

const valuesMaxWidth = 650;

const Component = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(3, fit-content(100%));
  justify-content: space-between;
  gap: 10px 20px;
  width: 100%;
  margin-bottom: 26px;
  max-width: ${valuesMaxWidth}px;

  ${mixins.isMobile(css`
    grid-template-columns: 100%;
  `)}
`;

const HeaderItem = styled.div`
  display: grid;
  grid-template-rows: 1fr min-content;
  gap: 10px;
  padding: 2px 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  color: ${colors.text.secondary};
  :not(:first-child) {
    padding-left: 20px;
    border-left: 1px solid rgba(255, 255, 255, 0.14);
  }
  span:last-child {
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    white-space: nowrap;
  }

  ${mixins.isMobile(css`
    :not(:first-child) {
      padding-left: 0;
      padding-top: 10px;
      border-left: 0;
      border-top: 1px solid rgba(255, 255, 255, 0.14);
    }
  `)}
`;

const Body = styled.div`
  flex-grow: 1;
  min-height: 270px;
`;

const Legend = styled.div`
  display: grid;
  grid-template-columns: repeat(3, fit-content(100%));
  gap: 10px 32px;
  justify-content: space-between;
  padding-top: 18px;
  padding-left: 16px;
  min-height: 46px;
  max-width: ${valuesMaxWidth}px;

  ${mixins.isMobile(css`
    grid-template-columns: 100%;
  `)}
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ffffff;
  font-size: 13px;
  line-height: 14px;
  font-weight: 600;
  ::before {
    content: '';
    display: block;
    width: 24px;
    height: 3px;
    background-color: #fff;
    border-radius: 13px;
  }
  :nth-child(1) {
    ::before {
      background: linear-gradient(
        95.5deg,
        #27e65c 0.5%,
        #587bff 50.22%,
        #b518ff 97.9%
      );
    }
  }
  :nth-child(2) {
    ::before {
      background-color: #06e907;
    }
  }
  :nth-child(3) {
    ::before {
      background-color: #3d51fd;
    }
  }
`;

const Tooltip = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: ${colors.text.secondary};
  span:first-child {
    color: ${colors.text.gray};
  }
`;

export const StackedAreaChartStyled = {
  Component,
  Header,
  HeaderItem,
  Body,
  LegendItem,
  Legend,
  Tooltip
};
