import React from 'react';
import {SidebarLayout} from '../ui/SiderLayout/SidebarLayout';


export function Routes(routes: any[]) {
  return function RoutesComp({location, match}: any) {
    const pathPrefix = match?.path || '';
    return (
      <SidebarLayout>
        <div/>
      </SidebarLayout>
    );
  };
}
