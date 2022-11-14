import React from 'react';
import {JsonValue, SendJsonMessage} from 'react-use-websocket/src/lib/types';
import {ReadyState} from 'react-use-websocket/src/lib/constants';

export interface INetworkExchangesContext<T = JsonValue> {
  sendMessage: SendJsonMessage,
  lastMessage: T,
  readyState: ReadyState,
}

export const CmcTokenSocketContext = React.createContext<INetworkExchangesContext<any>>({
  sendMessage: undefined,
  lastMessage: undefined,
  readyState: undefined
});
