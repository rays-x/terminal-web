import {useContext} from 'react';
import {CmcTokenSocketContext} from './CmcTokenSocketContext';

export function useCmcTokenSocket() {
  return useContext(CmcTokenSocketContext);
}
