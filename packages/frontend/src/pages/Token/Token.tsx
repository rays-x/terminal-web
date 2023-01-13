import React from 'react';
import 'normalize.css/normalize.css';
import {CoinPage} from './CoinPage';
import {Header} from '../../components/_old2/Header';
import {PageLayout} from '../../components/_old/ui/PageLayout/PageLayout';
import './token.css';

const Token = React.memo(() => {
  return (
    <PageLayout>
      <Header/>
      <CoinPage/>
    </PageLayout>
  );
});
export default Token;