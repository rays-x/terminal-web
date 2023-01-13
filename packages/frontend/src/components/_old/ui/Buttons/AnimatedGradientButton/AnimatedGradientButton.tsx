import React, {FC, useState} from 'react';
import {useSpring} from '@react-spring/web';
import {config} from 'react-spring';
import {AnimatedGradientButtonStyled, GradientButtonComponent} from './AnimatedGradientButton-styled';

export interface AnimatedGradientButtonProps extends GradientButtonComponent {
  disabled?: boolean;
  selected?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export const AnimatedGradientButton: FC<AnimatedGradientButtonProps> = React.memo(({
                                                                                     children,
                                                                                     selected,
                                                                                     onClick,
                                                                                     width,
                                                                                     height,
                                                                                     fullWidth = false,
                                                                                     disabled = false
                                                                                   }) => {
  const [hovered, setHovered] = useState(false);
  const gradientStyle = useSpring({
    opacity: selected || hovered ? (disabled ? 0.4 : 1) : 0,
    config: config.gentle
  });
  const defaultBackgroundStyle = useSpring({
    opacity: selected || hovered ? 0 : 1,
    config: config.gentle
  });
  return (
    <AnimatedGradientButtonStyled.Component
      disabled={disabled}
      width={width}
      height={height}
      fullWidth={fullWidth}
      onClick={onClick}
      onMouseMove={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatedGradientButtonStyled.Gradient style={gradientStyle}/>
      <AnimatedGradientButtonStyled.DefaultBackground
        style={defaultBackgroundStyle}
      />
      <AnimatedGradientButtonStyled.Content>
        {children}
      </AnimatedGradientButtonStyled.Content>
    </AnimatedGradientButtonStyled.Component>
  );
});
