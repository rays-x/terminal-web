import styled from 'styled-components';

const Component = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
`;

const Body = styled.div`
  min-height: 235px;
`;

const Legend = styled.div`
  display: grid;
  grid-auto-columns: fit-content(100%);
  grid-auto-flow: column;
  gap: 32px;
  padding-top: 18px;
  padding-left: 16px;
  min-height: 46px;
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
`;

export const UsersChartStyled = {
  Component,
  Body,
  Legend,
  LegendItem
};
