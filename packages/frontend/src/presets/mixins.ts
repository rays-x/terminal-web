import { css, FlattenSimpleInterpolation } from 'styled-components';
import { breakpoints, textMixins } from './base';
import { GridItemProps, GridProps } from './mixinTypes';

const widthMedia = {
  isDesktopMid: (styles: FlattenSimpleInterpolation) => css`
    @media (max-width: ${breakpoints.width['desktopMid']}) {
      ${styles}
    }
  `,
  isDesktopSmall: (styles: FlattenSimpleInterpolation) => css`
    @media (max-width: ${breakpoints.width['desktopMin']}) {
      ${styles}
    }
  `,
  isTablet: (styles: FlattenSimpleInterpolation) => css`
    @media (max-width: 1120px) {
      ${styles}
    }
  `,
  isMobile: (styles: FlattenSimpleInterpolation) => css`
    @media (max-width: 768px) {
      ${styles}
    }
  `
};

const resetMixins = {
  listReset: css`
    text-decoration: none;
    color: inherit;

    &:hover {
      text-decoration: none;
    }
    &:focus {
      outline: none;
    }
  `,
  tableReset: css`
    border-spacing: 0;
    border: 0;
    border-collapse: collapse;
  `,
  buttonReset: css`
    overflow: hidden;
    margin: 0;
    padding: 0;
    cursor: pointer;
    user-select: none;
    border: none;

    &:focus {
      outline: none;
    }
    &:disabled {
      cursor: default;
    }
  `,
  inputReset: css`
    margin: 0;
    resize: none;
    border: 0;
    border-radius: 0;

    outline: none;
    background: none;
    line-height: normal;
    appearance: none;

    &[type='number'] {
      -moz-appearance: textfield;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        margin: 0;
        -webkit-appearance: none;
      }
    }

    &:focus {
      @include placeholder {
        text-overflow: clip;
        color: transparent !important;
      }
    }

    @include placeholder {
      transition: color 0.3s;
      text-overflow: ellipsis;
    }
  `
};

const gridMixins = {
  grid: ({ colsAmount, gap }: GridProps = {}) => css`
    position: relative;
    display: grid;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    gap: ${gap || 0};

    ${colsAmount &&
    css`
      grid-template-columns: repeat(${colsAmount}, 1fr);
    `};
    ${!colsAmount &&
    css`
      grid-auto-columns: 1fr;
    `};
  `,
  gridItem: ({ colSpan }: GridItemProps = {}) =>
    colSpan &&
    css`
      grid-column: span ${colSpan};
    `
};

export const mixins = {
  placeholder: css`
    &::-webkit-input-placeholder {
      @content;
    }
    &::-moz-placeholder {
      @content;
    }
    &:-moz-placeholder {
      @content;
    }
    &:-ms-input-placeholder {
      @content;
    }
  `,
  textOverflow: (linesAmount: number) => css`
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    ${linesAmount > 1
      ? css`
          width: 100%;
          display: -webkit-box;
          -webkit-line-clamp: ${linesAmount};
          line-clamp: ${linesAmount};
          -webkit-box-orient: vertical;
        `
      : css`
          white-space: nowrap;
        `}
  `,
  textUnselectable: css`
    user-select: none; /* supported by Chrome and Opera */
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none;
  `,
  svgIcon: css`
    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
  `,
  hideScrollbar: css`
    -ms-overflow-style: none; /* IE and Edge */
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  clear: css`
    &::before,
    &::after {
      display: table;
      visibility: hidden;
      clear: both;
      height: 0;
      content: '';
      opacity: 0;
    }
  `,
  size: (size: number) => css`
    width: ${size}px;
    height: ${size}px;
  `,
  ...gridMixins,
  ...resetMixins,
  ...textMixins,
  ...widthMedia
};
