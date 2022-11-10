import React, { FC } from 'react';
import { useSpring } from '@react-spring/web';
import { config } from 'react-spring';
import icons from '../../../../../../assets';
import { LogoStyled } from './Logo-styled';
import X from '../../../../../../assets/icons/X';

export const Logo: FC<{ open: boolean }> = ({ open }) => {
  const width = useSpring({
    width: open ? 105 : 0,
    config: config.default
  });
  const opacity = useSpring({
    opacity: open ? 1 : 0,
    config: config.slow
  });
  return (
    <LogoStyled.Component>
      <LogoStyled.Main style={width}>
        <LogoStyled.Fill style={opacity}>
          <icons.Rays />
        </LogoStyled.Fill>
        <LogoStyled.Icon>
          <X/>
        </LogoStyled.Icon>
      </LogoStyled.Main>
    </LogoStyled.Component>
  );
};
