import React from 'react';
import "normalize.css/normalize.css";
import {PageLayout} from '../../components/_old/ui/PageLayout/PageLayout';
import {SidebarLayout} from '../../components/_old/ui/SiderLayout/SidebarLayout';
import './table.css';
import {TokenList} from './components';
import {NetworkExchangesProvider} from '../../store/networkExchanges';
import {Header} from '../../components/_old2/Header';
//https://api.cow.fi/mainnet/api/v1/token/0x8916187112fd6e3624a80C42FA354Cd9756E695f/native_price

const Table = React.memo(() => {
  const [isOpen, changeDisplayMode] = React.useState(false);
  return (
    <SidebarLayout isOpen={isOpen} changeDisplayMode={changeDisplayMode}>
      <PageLayout isOpen={isOpen}>
        <NetworkExchangesProvider>
          <Header isOpen={isOpen} changeDisplayMode={changeDisplayMode}/>
          <TokenList/>
        </NetworkExchangesProvider>
      </PageLayout>
    </SidebarLayout>
  );
});
export default Table;
