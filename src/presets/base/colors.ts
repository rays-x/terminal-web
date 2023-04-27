import {define} from '../../utils/types/define';
// @ts-ignore
import vars from '../_export.module.scss';

const {
  colBaseBlack,
  colBaseWhite,

  colBackgroundPrimary,
  colBackgroundSecondary,
  colBackgroundSidebarLink,
  colBackgroundCard,
  colBackgroundOpacityBlack,
  colBackgroundOpacityBlackSecondary,

  colTextPrimary,
  colTextSecondary,
  colTextGray,
  colTextGreen,
  colTextRed,

  colButtonPrimary,
  colButtonGradient
} = vars;

export type ColorObjectType = {
  [key: string]: string;
};

export const colors = define<Record<string, ColorObjectType>>()({
  base: {
    black: colBaseBlack,
    white: colBaseWhite
  },
  background: {
    primary: colBackgroundPrimary,
    secondary: colBackgroundSecondary,
    sidebarLink: colBackgroundSidebarLink,
    card: colBackgroundCard,
    opacityBlack: colBackgroundOpacityBlack,
    opacityBlackSecondary: colBackgroundOpacityBlackSecondary
  },
  text: {
    primary: colTextPrimary,
    secondary: colTextSecondary,
    gray: colTextGray,
    green: colTextGreen,
    red: colTextRed
  },
  button: {
    primary: colButtonPrimary,
    gradient: colButtonGradient
  }
});
