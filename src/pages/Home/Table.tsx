import React from 'react';
import 'normalize.css/normalize.css';
import {PageLayout} from '../../components/_old/ui/PageLayout/PageLayout';
import './table.css';
import {TokenList} from './components';
import {Header} from '../../components/_old2/Header';
import FooterComponentHtml from '../../components/Footer';
//https://api.cow.fi/mainnet/api/v1/token/0x8916187112fd6e3624a80C42FA354Cd9756E695f/native_price

const Table = React.memo(() => {
  const [isOpen, changeDisplayMode] = React.useState(false);
  return (
    <PageLayout>
      <Header/>
      <TokenList/>
      <FooterComponentHtml/>
    </PageLayout>
  );
});
export default Table;
