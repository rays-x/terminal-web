import React from 'react';
import {CardStyled} from './Card-styled';

export const Card: React.FC<any> = ({children}: any) => {
  return <CardStyled.Component>{children}</CardStyled.Component>;
};
