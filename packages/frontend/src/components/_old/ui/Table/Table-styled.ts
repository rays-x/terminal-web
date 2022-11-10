import styled, { css } from 'styled-components';
import { colors, gap, radius, spacing } from '../../../../presets/base';
import { mixins } from '../../../../presets/mixins';

const FilterGroupDefaults = styled.div`
  display: flex;
  font-style: normal;
  width: inherit;
  justify-content: space-around;
  align-items: center;
  font-weight: 700;
  font-size: 14px;
  line-height: 25px;
  color: #ffffff;
`;

export const FilterGroup = styled(FilterGroupDefaults)`
  gap: ${gap[12]} ${gap[32]};
  ${mixins.isDesktopSmall(css`
    padding-bottom: ${spacing[8]};
  `)}
  ${mixins.isMobile(css`
    flex-direction: column;
    align-items: flex-start;
  `)}
`;

export const Filters = styled(FilterGroupDefaults)`
  gap: ${gap[12]};
  ${mixins.isMobile(css`
    justify-content: flex-start;
    flex-wrap: wrap;
  `)}
`;

export const FiltersTitle = styled.div`
  ${mixins.isMobile(css`
    min-width: 50px;
  `)}
`;

export const Offset = styled.div``;

export const Wrapper = styled.div`
  background: ${colors.background.card};
  border-radius: ${radius[20]};
  padding: 18px 0 13px;
`;

export const Component = styled.div`
  width: inherit;
  overflow-x: scroll;
`;

export const ScrollContainer = styled.div`
  display: inline-block;
  vertical-align: top;
  min-width: 100%;
  padding: 0 10px;
`;

export const Header = styled.div`
  color: #8e91a5;
  font-size: 13px;
  :last-child {
    border-right: 0;
  }
`;

export const Body = styled.div`
  min-height: 472px;
  margin-top: 40px;
  padding: 6px 0;
  border-radius: ${radius[20]};
  background: ${colors.background.primary};
  overflow: hidden;
`;

export const Row = styled.div`
  gap: 8px;
  ${mixins.isDesktopSmall(css`
    padding: 0 ${spacing[10]};
  `)}

  :last-child {
    .td {
      border-bottom: 0;
    }
  }
`;

export const Input = styled.input`
  ${mixins.inputReset}
  width: 245px;
  height: 32px;
  background: #353742;
  padding-left: 10px;
  border-radius: ${radius[12]};
  ${mixins.text_tableRow}
`;

export const SearchLabel = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  /* or 152% */

  color: #8e91a5;
`;

export const Search = styled.div`
  ${mixins.text_tableRow}
  color: #8E91A5;
  margin-top: 13px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const TableStyled = {
  Offset,
  Wrapper,
  Component,
  ScrollContainer,
  SearchLabel,
  Body,
  Header,
  Row,
  Search,
  Input,
  Filters,
  FilterGroup,
  FiltersTitle
};
