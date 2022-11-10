import React, {FC} from 'react';
import {TypographyArrowProps, TypographyStyled} from './Typography-styled';

export const TypographyArrow: FC<TypographyArrowProps & { children: any }> = ({
                                                                                fontSize,
                                                                                lineHeight,
                                                                                color,
                                                                                children
                                                                              }) => {
  return (
    <TypographyStyled.Arrow
      fontSize={fontSize}
      lineHeight={lineHeight}
      color={color}
    >
      {children}
    </TypographyStyled.Arrow>
  );
};
