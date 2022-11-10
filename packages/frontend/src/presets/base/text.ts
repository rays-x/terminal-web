import { css } from 'styled-components';
import { define } from '../../utils/types/define';
// @ts-ignore
import vars from '../_export.module.scss';

const {
  fontFamilyDefault,
  fontFamilyWorkSans,

  fontWeight300,
  fontWeightNormal,
  fontWeight500,
  fontWeight600,
  fontWeightBold,

  fontSize10,
  fontSize12,
  fontSize13,
  fontSize14,
  fontSize16,
  fontSize18,
  fontSize24,
  fontSize32,
  fontSize48,
  fontSize64,

  lineHeight16,
  lineHeight18,
  lineHeight20,
  lineHeight24,
  lineHeight28,
  lineHeight32,
  lineHeight40,
  lineHeight56,
  lineHeight86
} = vars;

export type FontsObjectType = {
  [key: string]: string;
};

export const fonts = define<Record<string, FontsObjectType>>()({
  fontFamily: {
    _default: fontFamilyDefault,
    _workSans: fontFamilyWorkSans
  },
  fontWeight: {
    _300: fontWeight300,
    _normal: fontWeightNormal,
    _500: fontWeight500,
    _600: fontWeight600,
    _bold: fontWeightBold
  },
  fontSize: {
    _10: fontSize10,
    _12: fontSize12,
    _13: fontSize13,
    _14: fontSize14,
    _16: fontSize16,
    _18: fontSize18,
    _24: fontSize24,
    _32: fontSize32,
    _48: fontSize48,
    _64: fontSize64
  },
  lineHeight: {
    _16: lineHeight16,
    _18: lineHeight18,
    _20: lineHeight20,
    _24: lineHeight24,
    _28: lineHeight28,
    _32: lineHeight32,
    _40: lineHeight40,
    _56: lineHeight56,
    _86: lineHeight86
  }
});

export const textMixins = {
  text_regular: css`
    font-family: ${fonts.fontFamily._workSans}, ${fonts.fontFamily._default};
    font-size: ${fonts.fontSize._16};
    font-weight: ${fonts.fontWeight._500};
    line-height: ${fonts.lineHeight._20};
  `,
  text_tableRow: css`
    font-weight: ${fonts.fontWeight._500};
    font-size: ${fonts.fontSize._13};
    line-height: ${fonts.lineHeight._20};
  `,
  text_button: css`
    font-weight: ${fonts.fontWeight._bold};
    font-size: ${fonts.fontSize._14};
    line-height: ${fonts.lineHeight._24};
  `
};
