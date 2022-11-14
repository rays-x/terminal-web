import React from 'react';
import {CmcTokenSocketContext} from './CmcTokenSocketContext';
import useWebSocket from 'react-use-websocket';

export function CmcTokenSocketProvider({children}: { children: React.ReactNode }) {

  const {
    sendJsonMessage: sendMessage,
    lastJsonMessage: lastMessage,
    readyState
  } = useWebSocket<any>('wss://push.coinmarketcap.com/ws');

  return (
    <CmcTokenSocketContext.Provider
      value={{sendMessage, lastMessage, readyState}}>
      {children}
    </CmcTokenSocketContext.Provider>
  );
}
