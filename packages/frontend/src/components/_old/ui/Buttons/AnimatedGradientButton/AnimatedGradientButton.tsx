import React, { FC, useState } from 'react';
import { useSpring } from '@react-spring/web';
import { config } from 'react-spring';
import {
  AnimatedGradientButtonStyled,
  GradientButtonComponent
} from './AnimatedGradientButton-styled';

export interface AnimatedGradientButtonProps extends GradientButtonComponent {
  selected?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export const AnimatedGradientButton: FC<AnimatedGradientButtonProps> = ({
  children,
  selected,
  onClick,
  width,
  height,
  fullWidth = false
}) => {
  const [hovered, setHovered] = useState(false);

  const gradientStyle = useSpring({
    opacity: selected || hovered ? 1 : 0,
    config: config.gentle
  });

  const defaultBackgroundStyle = useSpring({
    opacity: selected || hovered ? 0 : 1,
    config: config.gentle
  });

  return (
    <AnimatedGradientButtonStyled.Component
      width={width}
      height={height}
      fullWidth={fullWidth}
      onClick={onClick}
      onMouseMove={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatedGradientButtonStyled.Gradient style={gradientStyle} />
      <AnimatedGradientButtonStyled.DefaultBackground
        style={defaultBackgroundStyle}
      />
      <AnimatedGradientButtonStyled.Content>
        {children}
      </AnimatedGradientButtonStyled.Content>
    </AnimatedGradientButtonStyled.Component>
  );
};
