import React, {FC} from 'react';
import {animated, config} from 'react-spring';
import {useSpring} from '@react-spring/web';
import {useLocation} from 'react-router';
import {Logo} from '../PageLayout/components/logo';
import Icons from '../../../../assets';
// import {useStore} from '../../../../stores';
import {
  PageLinkIcon, SidebarLayoutStyled, SidebarLayoutStyledFooter,
  SidebarLayoutStyledFooterLinks,
  SidebarLayoutStyledFooterLink,
  SidebarLayoutStyledFooterIcons,
  SidebarLayoutStyledFooterIcon
} from './SidebarLayoutStyled';
import Raxrank from '../../../../assets/icons/Raxrank';
import Dex from '../../../../assets/icons/Dex';
import Raxtoken from '../../../../assets/icons/Raxtoken';
import Lucid from '../../../../assets/icons/Lucid';
import Web3 from '../../../../assets/icons/web3';
import Docs from '../../../../assets/icons/Docs';
import Faq from '../../../../assets/icons/Faq';
import Github from '../../../../assets/icons/Github';
import Cmc from '../../../../assets/icons/Cmc';
import Tg from '../../../../assets/icons/Tg';
import Tw from '../../../../assets/icons/Tw';

export enum PagesEnum {}

export interface SidebarPageButton {
  to?: string | PagesEnum;
  icons: JSX.Element;
  text: string;
  path?: string;
}

export const sidebarPageButtons: SidebarPageButton[] = [
  {
    text: 'RAX Rank',
    path: '/',
    icons: <Raxrank/>
  },
  {
    icons: <Dex/>,
    text: 'DEXApps'
  },
  {
    icons: <Raxtoken/>,
    text: 'RAX Token'
  },
  {
    icons: <Lucid/>,
    text: 'LucidX'
  },
  {
    icons: <Web3/>,
    text: 'Web3X'
  },
  {
    icons: <Docs/>,
    text: 'Docs'
  },
  {
    icons: <Faq/>,
    text: 'FAQ'
  }
];

export const SidebarLayout: any = ({children, isOpen, changeDisplayMode}: any) => {
  // const { isMobile } = useAdaptiveTriggers({});
  // const history = useHistory();
  const location = useLocation();

  const pageLink = useSpring({
    width: 110,
    opacity: 1,
    height: 24,
    overflow: 'hidden',
    config: config.default
  });

  return (
    <SidebarLayoutStyled.Component>
      <SidebarLayoutStyled.Sidebar $isOpen={isOpen}>
        <SidebarLayoutStyled.Header>
          <Logo open={isOpen}/>
          <SidebarLayoutStyled.Close $sidebarOpen={isOpen}>
            <Icons.IconClose onClick={() => changeDisplayMode(!isOpen)}/>
          </SidebarLayoutStyled.Close>
        </SidebarLayoutStyled.Header>
        {sidebarPageButtons.map((button, index) => (
          <SidebarLayoutStyled.PageLink
            active={index === 0}
            onClick={() => {
            }/*history.push(button.path || '/')*/}
            key={button.text}
          >
            <PageLinkIcon>{button.icons}</PageLinkIcon>
            <animated.div style={pageLink}>{button.text}</animated.div>
          </SidebarLayoutStyled.PageLink>
        ))}
        <SidebarLayoutStyledFooter>
          <SidebarLayoutStyledFooterIcons>
            <SidebarLayoutStyledFooterIcon target="_blank" href="https://github.com/raysx">
              <Github/>
            </SidebarLayoutStyledFooterIcon>
            <SidebarLayoutStyledFooterIcon target="_blank" href="https://coinmarketcap.com/currencies/zamio/">
              <Cmc/>
            </SidebarLayoutStyledFooterIcon>
            <SidebarLayoutStyledFooterIcon target="_blank" href="https://t.me/George_Gus">
              <Tg/>
            </SidebarLayoutStyledFooterIcon>
            <SidebarLayoutStyledFooterIcon target="_blank" href="https://twitter.com/zam_io">
              <Tw/>
            </SidebarLayoutStyledFooterIcon>
          </SidebarLayoutStyledFooterIcons>
          <SidebarLayoutStyledFooterLinks>
            <SidebarLayoutStyledFooterLink>
              Privacy Policy
            </SidebarLayoutStyledFooterLink>
            <SidebarLayoutStyledFooterLink>
              Terms of Conditions
            </SidebarLayoutStyledFooterLink>
          </SidebarLayoutStyledFooterLinks>
        </SidebarLayoutStyledFooter>
      </SidebarLayoutStyled.Sidebar>
      {children}
      <SidebarLayoutStyled.Overlay
        onClick={() => changeDisplayMode(!isOpen)}
        $sidebarOpen={isOpen}
      />
    </SidebarLayoutStyled.Component>
  );
};
