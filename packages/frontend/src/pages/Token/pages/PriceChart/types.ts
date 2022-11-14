import {CmcPairInfo} from './chart/types';

interface Pair {
  platformId: number;
  platformName: string;
  baseTokenSymbol: string;
  quoteTokenSymbol: string;
  liquidity: string;
  pairContractAddress: string;
  platFormCryptoId: number;
  exchangeId: number;
}

interface Data {
  total: number;
  pairs: Pair[];
}

interface Status {
  timestamp: Date;
  error_code: string;
  error_message: string;
  elapsed: string;
  credit_count: number;
}

export interface CmcSearch {
  data: Data;
  status: Status;
}

export interface ChartComponentProps {
  pair: CmcPairInfo['data'];
  height?: number;
}