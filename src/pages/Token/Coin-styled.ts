import styled, {css} from 'styled-components';
import {animated} from '@react-spring/web';
import {colors, fonts, gap, radius} from '../../presets/base';
import {mixins} from '../../presets/mixins';

export const Component = styled.div``;

export const Group = styled.div`
  @media (min-width: 1120px) {
    display: grid;
    grid-template-columns: 2fr 2fr;
    grid-template-areas: '. .';
  }


  @media (min-width: 1240px) {
    grid-template-columns: 2.25fr 2fr;
  }

  @media (min-width: 1560px) {
    grid-template-columns: 2.5fr 2fr;
  }

  ${mixins.isMobile(css`
    display: flex;
    flex-direction: column;
  `)}

  margin-top: 24px;
  gap: ${gap[14]};
`;
export const TransactionGroup = styled.div`
  padding: 0 8px;
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 4fr 1fr;
    grid-template-areas: '. .';
  }

  ${mixins.isDesktopSmall(css`
    display: flex;
    flex-direction: column;
  `)}

  gap: ${gap[14]};
`;

export const VerticalGroup = styled.div`
  display: flex;
  flex-direction: column;
  ${mixins.isMobile(css`
    flex-direction: column;
  `)}
  gap: ${gap[14]};
`;

export const CurrentCoinImage = styled(animated.img)`
  ${mixins.size(41)}
  border-radius: ${radius.circle};
`;

export const CurrentCoinTitle = styled.div`
  height: 56px;

  display: flex;
  align-items: center;
  gap: ${gap[8]};

  div {
    font-weight: ${fonts.fontWeight._bold};
    font-size: 30px;
    line-height: ${fonts.lineHeight._56};
  }
`;

export const CurrentCoinNavigation = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${gap[18]};
`;

export const CurrentCoinLinks = styled.div`
  display: flex;
  align-items: center;

  gap: ${gap[8]};
`;

export const CoinRangButton = styled.button`
  ${mixins.buttonReset}

  padding: 3px 11px;

  min-width: 117px;
  height: 32px;

  display: flex;
  align-items: center;

  font-weight: ${fonts.fontWeight._600};
  font-size: ${fonts.fontSize._14};
  line-height: ${fonts.lineHeight._20};

  border-radius: ${radius['14']};
  color: ${colors.text.secondary};
  background: ${colors.button.gradient};
`;

export const CurrentCoinRefs = styled.div`
  display: flex;
  align-items: center;

  gap: ${gap[12]};
`;

export const CurrentCoinAddresses = styled.div`
  display: flex;
  ${mixins.isDesktopSmall(css`
    flex-direction: column;
  `)}
  gap: ${gap[8]};
`;

export const CoinAddress = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 5px 10px;

  display: flex;
  align-items: center;

  justify-content: space-between;

  gap: ${gap[6]};
  border-radius: ${radius['12']};

  div {
    font-weight: ${fonts.fontWeight._600};
    font-size: ${fonts.fontSize._12};

    span {
      color: #8e91a5;
    }

    color: white;
  }

  max-width: 192px;
`;

export const CoinStatsGroup = styled.div`
  display: flex;

  gap: ${gap[24]};
  margin: 0 auto;
  ${mixins.isMobile(css`
    margin: 0;
  `)};

`;

export const CurrentCoinScore = styled.div`
  width: 197px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CurrentCoinStats = styled.div`
  display: flex;
  flex-direction: column;

  gap: ${gap[12]};
`;

export const CoinStatsTitleGroup = styled.div`
  display: flex;
  align-items: center;

  gap: ${gap[12]};
  margin-bottom: -14px;
`;

export enum ColorVariant {
  fall = 'fall',
  rise = 'rise'
}

export interface CoinStatsTitleChangeProps {
  color: ColorVariant;
}

export const CoinStatsTitleLabel = styled.div<CoinStatsTitleChangeProps>`
  font-weight: ${fonts.fontWeight._bold};
  font-size: 30px;
  line-height: ${fonts.lineHeight._56};

  ${({color}) =>
          color === ColorVariant.rise
                  ? css`
                    color: #009e10;
                  `
                  : css`
                    color: #ff2640;
                  `}
  text-overflow: ellipsis;
  overflow: hidden;
  @media (max-width: 618px) {
    max-width: 240px;
  }
`;

export const CoinStatsTitleChange = styled.div<CoinStatsTitleChangeProps>`
  ${({color}) =>
          color === ColorVariant.rise
                  ? css`
                    background-color: #009e10;
                  `
                  : css`
                    background-color: #ff2640;
                  `}

  height: 32px;
  padding: 6px 10px;

  display: flex;
  align-items: center;

  gap: ${gap[6]};
  border-radius: ${radius['12']};

  div {
    height: 11px;
    font-size: ${fonts.fontSize._14};
    line-height: 11px;
    color: ${colors.text.secondary};
  }
`;

export const CoinStatsPriceChange = styled.div`
  display: flex;
  align-items: center;
  gap: ${gap[12]};
`;

export const CoinStatsPriceChangeTitle = styled.div`
  font-weight: ${fonts.fontWeight._600};
  font-size: ${fonts.fontSize._12};
  color: ${colors.text.gray};
`;

export const CoinPriceChangeGroups = styled.div`
  width: 250px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 20px;
`;

export const CoinPriceChangeGroup = styled.div`
  display: flex;
  flex-direction: column;

  gap: ${gap[4]};
`;

export const CoinPriceChangeGroupTitle = styled.div`
  font-weight: ${fonts.fontWeight._600};
  font-size: ${fonts.fontSize._13};
  line-height: ${fonts.lineHeight._18};
`;

export const GraphContainer = styled.div`
  background-color: #1e1f2b;

  display: flex;
  flex-direction: column;

  padding: 18px;
  border-radius: 20px;
`;

export const SubPagesButtons = styled.div`
  display: flex;
  column-gap: 9px;
  row-gap: 20px;
  flex-wrap: wrap;
  margin: 27px 0 20px 0;
`;

export const CoinPageStyled = {
  Component,
  Group,
  TransactionGroup,
  VerticalGroup,
  CurrentCoinNavigation,
  CurrentCoinTitle,
  CurrentCoinImage,
  CurrentCoinLinks,
  CoinRangButton,
  CurrentCoinRefs,
  CurrentCoinAddresses,
  CoinAddress,
  CoinStatsGroup,
  CurrentCoinScore,
  CurrentCoinStats,
  CoinStatsTitleGroup,
  CoinStatsTitleLabel,
  CoinStatsTitleChange,
  CoinStatsPriceChange,
  CoinStatsPriceChangeTitle,
  CoinPriceChangeGroups,
  CoinPriceChangeGroup,
  CoinPriceChangeGroupTitle,
  GraphContainer,
  SubPagesButtons
};
