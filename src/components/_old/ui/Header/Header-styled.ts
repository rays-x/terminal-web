import styled, {css} from 'styled-components';
import {mixins} from '../../../../presets/mixins';
import {colors, spacing} from '../../../../presets/base';
import {SCG} from '../../../../presets/types';
import {HeaderProps, HeaderVariant} from './types';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${spacing[20]};
  margin-bottom: 13px;
  margin-top: 31px;
  ${mixins.isDesktopSmall(css`
    flex-direction: column;
    align-items: flex-start;
  `)}
`;

export const Text = styled.div<HeaderProps>`
  color: ${colors.text.secondary};
  ${({$variant = HeaderVariant.Default}) => {
  if($variant === HeaderVariant.Default) {
    return css`
        font-weight: 700;
        font-size: 36px;
        line-height: 72px;
      `;
  }
  if($variant === HeaderVariant.Small) {
    return css`
        font-weight: 700;
        font-size: 22px;
        line-height: 44px;
      `;
  }
}}
`;

export enum Header {
  Wrapper = 'Wrapper',
  Text = 'Text'
}

export const HeaderStyled: SCG<Header> = {
  Wrapper,
  Text
};
