import styled from 'styled-components';
import {animated} from '@react-spring/web';
import {SCG} from '../../../../../../presets/types';
import {breakpoints} from '../../../../../../presets/base';

export const Component = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const Main = styled(animated.div)`
  position: relative;
  width: 105px;
  margin-left: 36px;
  height: 38px;
  cursor: pointer;
  @media (min-width: ${breakpoints.width['tabletMin']}) {
    width: 105px !important;
  }
`;

export const Fill = styled(animated.div)`
  position: relative;
  left: -35px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-left: 2px;
  @media (min-width: ${breakpoints.width['tabletMin']}) {
    opacity: 1 !important;
  }
`;

export const Icon = styled(animated.div)`
  position: absolute;
  height: 53px;
  top: -8px;
  right: 0;
  user-select: none;
`;

export enum Logo {
  Component = 'Component',
  Main = 'Main',
  Fill = 'Fill',
  Icon = 'Icon'
}

export const LogoStyled: SCG<Logo> = {
  [Logo.Component]: Component,
  [Logo.Main]: Main,
  [Logo.Fill]: Fill,
  [Logo.Icon]: Icon
};
