import React from 'react';
import {LoaderPositions, LoaderStyled} from './Loader-styled';

export interface LoaderProps {
  position?: LoaderPositions;
  singleColor?: string;
  size?: number;
  borderSize?: number;
}

export const Loader: React.FC<LoaderProps> = ({
                                                position,
                                                singleColor,
                                                size,
                                                borderSize
                                              }) => (
  <LoaderStyled.Component position={position}>
    <LoaderStyled.Spinner
      size={size}
      borderWidth={borderSize}
      borderColor={singleColor}
    />
  </LoaderStyled.Component>
);
