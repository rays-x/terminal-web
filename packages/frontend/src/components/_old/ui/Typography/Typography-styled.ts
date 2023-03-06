import styled, {css} from 'styled-components';

export enum ColorVariant {
  fall = 'fall',
  rise = 'rise'
}

export interface TypographyArrowProps {
  lineHeight: number;
  fontSize: number;
  color: ColorVariant;
}

export const Arrow = styled.div<TypographyArrowProps>`
  font-style: normal;
  font-weight: 600;
  ${({color}) =>
  color === ColorVariant.rise
    ? css`
          color: #30fd82;
        `
    : css`
          color: #ff2640;
        `}

  ${({lineHeight}) =>
  lineHeight &&
  css`
      line-height: ${lineHeight}px;
    `}
  
  ${({fontSize}) =>
  fontSize &&
  css`
      font-size: ${fontSize}px;
    `}
`;

export const TypographyStyled = {
  Arrow
};
