import React, {FC} from 'react';
import {LinkButtonProps, LinkButtonStyled} from './LinkButton-styled';

export const LinkButton: FC<LinkButtonProps & { children: any }> = ({size, children}) => {
  return (
    <LinkButtonStyled.Component size={size}>
      {children}
    </LinkButtonStyled.Component>
  );
};
