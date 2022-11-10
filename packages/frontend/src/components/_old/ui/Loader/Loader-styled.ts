import styled, {
  css,
  FlattenSimpleInterpolation,
  keyframes
} from 'styled-components';
import { SCG, SPG } from '../../../../presets/types';
import { colors } from '../../../../presets/base';

export enum LoaderPositions {
  absolute = 'absolute',
  static = 'static',
  fixed = 'fixed'
}

export interface Component {
  position?: LoaderPositions;
}

export const Positions: SPG<LoaderPositions, FlattenSimpleInterpolation> = {
  [LoaderPositions.fixed]: css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  `,
  [LoaderPositions.absolute]: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  `,
  [LoaderPositions.static]: css`
    position: static;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    transform: translate3d(0, 0, 0);
  `
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Component = styled.div<Component>`
  will-change: transform;
  ${({ position }) => (position ? Positions[position] : Positions['static'])}
`;

export interface LoaderSpinnerStyled {
  size: number;
  borderWidth: number;
  borderColor: string;
}

const defaultLoaderSpinnerProps = {
  size: 40,
  borderSize: 4
};

export const defineSize = (
  size: LoaderSpinnerStyled['size'] = defaultLoaderSpinnerProps.size
) => css`
  min-width: ${size}px;
  width: ${size}px;
  height: ${size}px;
`;

const loaderSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div<Partial<LoaderSpinnerStyled>>`
  animation: ${loaderSpin} infinite linear 1s;
  border: 4px solid ${colors.text.secondary};
  border-bottom-color: transparent !important;
  border-radius: 50%;
  ${({ size }) => defineSize(size)}
  ${({ borderColor }) =>
    borderColor &&
    css`
      border-color: ${borderColor};
    `}
  ${({ borderWidth }) =>
    css`
      border-width: ${borderWidth || defaultLoaderSpinnerProps['borderSize']}px;
    `}
`;

export enum Loader {
  Component = 'Component',
  Spinner = 'Spinner'
}

export const LoaderStyled: SCG<Loader> = {
  [Loader.Component]: Component,
  [Loader.Spinner]: Spinner
};
