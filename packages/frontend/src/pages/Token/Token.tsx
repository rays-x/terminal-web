import React from 'react';
import 'normalize.css/normalize.css';
import {useParams} from 'react-router';
import {CoinPage} from './CoinPage';
import {Header} from '../../components/_old2/Header';
import {SidebarLayout} from '../../components/_old/ui/SiderLayout/SidebarLayout';
import {PageLayout} from '../../components/_old/ui/PageLayout/PageLayout';
import './token.css';
import {useNetworkExchanges} from '../../store/networkExchanges';

const Token = React.memo(() => {
  const {chain, token} = useParams();
  const {switchNetwork} = useNetworkExchanges();
  const [isOpen, changeDisplayMode] = React.useState(false);
  React.useEffect(() => {
    switchNetwork(chain, true);
  }, []);
  return (
    <SidebarLayout isOpen={isOpen} changeDisplayMode={changeDisplayMode}>
      <PageLayout isOpen={isOpen}>
        <Header isOpen={isOpen} changeDisplayMode={changeDisplayMode}/>
        <CoinPage/>
      </PageLayout>
    </SidebarLayout>
  );
});
export default Token;