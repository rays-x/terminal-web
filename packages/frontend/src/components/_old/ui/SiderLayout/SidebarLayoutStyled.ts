import styled, {css} from 'styled-components';
import {animated} from 'react-spring';
import {mixins} from '../../../../presets/mixins';
import {colors, breakpoints, fonts} from '../../../../presets/base';

export const Component = styled(animated.div)`
  display: flex;
  overflow: hidden;
  min-height: 100vh;
  background-color: black;
`;

interface SidebarProps {
  $isOpen?: boolean;
}

export const Sidebar = styled(animated.div)<SidebarProps>`
  background-color: #1e1f2b;
  display: flex;
  flex-direction: column;
  color: white;
  gap: 30px;
  padding-left: 30px;
  padding-top: 30px;
  height: 100vh;
  position: fixed;
  z-index: 10;
  border: 1px solid rgba(255, 255, 255, 0.11);
  box-shadow: 3px 0px 18px rgba(46, 50, 142, 0.01);
  min-width: 240px;
  max-width: 240px;

  @media (max-width: ${breakpoints.width['mobileMax']}) {
    min-width: 0;
    max-width: 0;
    overflow: auto;
    padding-left: 0;
    transition: 0.5s;
    margin-left: -1px;
    ${({$isOpen}) =>
            $isOpen &&
            css`
              min-width: 240px;
              max-width: 240px;
              padding-left: 30px;
            `}
  }
`;

export const Header = styled.div`
  @media (max-width: ${breakpoints.width['mobileMax']}) {
    display: flex;
    align-items: center;
    gap: 34px;
  }
`;

interface CloseProps {
  $sidebarOpen: boolean;
}

export const Close = styled.div<CloseProps>`
  display: none;
  color: #b518ff;
  cursor: pointer;
  transition: 0.6s ease;
  transition-delay: 0.2s;
  transform: ${({$sidebarOpen}) =>
          $sidebarOpen ? 'none' : 'translate(-35px, 0)'};
  opacity: ${({$sidebarOpen}) => ($sidebarOpen ? 1 : 0)};
  @media (max-width: ${breakpoints.width['mobileMax']}) {
    display: block;
  }
`;

interface PageLinkProps {
  active?: boolean;
}

export const PageLink = styled.div<PageLinkProps>`
  margin-left: 5px;
  display: flex;
  gap: 20px;
  cursor: pointer;
  align-items: center;

  div {
    color: ${({active}) =>
            active ? colors.text.secondary : colors.background.sidebarLink};
    font-weight: ${({active}) => active ? 700 : 400};
    font-size: ${fonts.fontSize._14};
    line-height: 24px;
  }

  ${mixins.textUnselectable}
`;

export const PageLinkIcon = styled.div`
  height: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center
`;

export const SidebarLayoutStyledFooter = styled.div`
  margin-top: auto;
  margin-bottom: 36px;
`;

export const SidebarLayoutStyledFooterIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 21px;
`;

export const SidebarLayoutStyledFooterIcon = styled.a`
  height: 31px;
`;

export const SidebarLayoutStyledFooterLinks = styled.div`
  display: grid;
  gap: 8px;
`;

export const SidebarLayoutStyledFooterLink = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #FFFFFF;
  white-space: nowrap;
`;

interface OverlayProps {
  $sidebarOpen: boolean;
}

export const Overlay = styled.div<OverlayProps>`
  position: fixed;
  z-index: 9;
  height: 100vh;
  width: 100vw;
  background-color: #0f1017;
  transition: opacity 0.5s;
  opacity: ${({$sidebarOpen}) => ($sidebarOpen ? 0.5 : 0)};
  pointer-events: ${({$sidebarOpen}) => ($sidebarOpen ? 'all' : 'none')};
`;

export const SidebarLayoutStyled = {
  Component,
  Sidebar,
  PageLink,
  Header,
  Close,
  Overlay
};
