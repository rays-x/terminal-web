import {useContext} from 'react';
import {CmcSocketContext} from './CmcSocketContext';

export function useCmcSocket() {
  return useContext(CmcSocketContext);
}
