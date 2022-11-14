import React from 'react';
import {CmcSocketContext} from './CmcSocketContext';
import useWebSocket from 'react-use-websocket';

export function CmcSocketProvider({children}: { children: React.ReactNode }) {

  const {
    sendJsonMessage: sendMessage,
    lastJsonMessage: lastMessage,
    readyState
  } = useWebSocket<any>('wss://stream.coinmarketcap.com/price/latest');

  return (
    <CmcSocketContext.Provider
      value={{sendMessage, lastMessage, readyState}}>
      {children}
    </CmcSocketContext.Provider>
  );
}
