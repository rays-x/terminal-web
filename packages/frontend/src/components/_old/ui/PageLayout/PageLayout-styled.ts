import styled, { css } from 'styled-components';
import { animated } from '@react-spring/web';
import { SCG } from '../../../../presets/types';
import { colors } from '../../../../presets/base';
import { breakpoints } from '../../../../presets/base';

export const center = css`
  justify-content: center;
`;

export interface ComponentProps {
  $centerContent?: boolean;
  $sidebarOpen?: boolean;
}

export const Component = styled(animated.div)<ComponentProps>`
  position: static;
  display: flex;
  align-items: center;
  overflow: hidden;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background: ${colors.background.primary};
  padding-left: 0;
  @media (min-width: ${breakpoints.width['tabletMin']}) {
    padding-left: 240px;
  }
  ${({ $sidebarOpen }) =>
    $sidebarOpen &&
    css`
      height: 100vh;
      overflow: hidden;
    `};
`;

export const Content = styled.div`
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 0;
  display: flex;
  padding: 30px;
  flex-direction: column;
  width: 100%;
  max-width: 1560px;
`;

enum PageLayout {
  Component = 'Component',
  Content = 'Content'
}

export const PageLayoutStyled: SCG<PageLayout> = {
  [PageLayout.Component]: Component,
  [PageLayout.Content]: Content
};
