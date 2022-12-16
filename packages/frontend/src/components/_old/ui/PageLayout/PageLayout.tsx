import React from 'react';
import {useSpring} from '@react-spring/web';
import {config} from 'react-spring';
import {PageLayoutStyled} from './PageLayout-styled';

export interface PageLayoutProps {
  centerContent?: boolean;
  children?: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = (({centerContent, children}) => {

    const padding = useSpring({
      config: config.default
    });

    return (
      <PageLayoutStyled.Component
        style={padding}
        $centerContent={centerContent}
        // $sidebarOpen={isOpen}
      >
        <PageLayoutStyled.Content>
          {children}
        </PageLayoutStyled.Content>
      </PageLayoutStyled.Component>
    );
  }
);
