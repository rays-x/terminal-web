import React from 'react';
import 'normalize.css/normalize.css';
import {useParams} from 'react-router';
import {CoinPage} from './CoinPage';
import {Header} from '../../components/_old2/Header';
import {SidebarLayout} from '../../components/_old/ui/SiderLayout/SidebarLayout';
import {NetworkExchangesProvider} from '../../store/networkExchanges';
import {PageLayout} from '../../components/_old/ui/PageLayout/PageLayout';
import './token.css';

const Token = React.memo(() => {
  const {chain, token} = useParams();
  const [isOpen, changeDisplayMode] = React.useState(false);
  return (
    <SidebarLayout isOpen={isOpen} changeDisplayMode={changeDisplayMode}>
      <PageLayout isOpen={isOpen}>
        <NetworkExchangesProvider>
          <Header isOpen={isOpen} changeDisplayMode={changeDisplayMode}/>
          <CoinPage/>
        </NetworkExchangesProvider>
      </PageLayout>
    </SidebarLayout>
  );
});
export default Token;