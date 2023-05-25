interface Platform {
  id: number;
  name: string;
  icon: string;
  explorerUrlFormat: string;
  cryptoId: number;
  dexerPlatformName: string;
  dexerTxhashFormat: string;
}

interface DexerInfo {
  id: number;
  name: string;
}

interface BaseToken {
  id: string;
  name: string;
  address: string;
  symbol: string;
  slug: string;
}

interface QuoteToken {
  id: string;
  name: string;
  address: string;
  symbol: string;
  slug: string;
}

interface PoolInfoD {
  liquidity: string;
  pooledBase: string;
  pooledQuote: string;
  poolCreationDate: string;
  percentPooled: string;
}

interface Data {
  poolId: string;
  address: string;
  platform: Platform;
  dexerInfo: DexerInfo;
  baseToken: BaseToken;
  quoteToken: QuoteToken;
  priceUsd: string;
  priceQuote: string;
  volume24h: string;
  volumeQuote24h: string;
  priceChange24h: string;
  fdv: string;
  marketCap: string;
  poolInfoD: PoolInfoD;
  reverseOrder: boolean;
  totalSupply: string;
  seeOnCmc: boolean;
  tradeOnDexUrl: string;
  priceHighest: string;
  priceLowest: string;
  priceQuoteHighest: string;
  priceQuoteLowest: string;
  txnFormatUrl: string;
  balancerPoolAddress: string;
  extraPoolAddress: string;
  priceHighest24h: string;
  priceLowest24h: string;
  priceQuoteHighest24h: string;
  priceQuoteLowest24h: string;
  priceHighest1m: string;
  priceLowest1m: string;
  priceQuoteHighest1m: string;
  priceQuoteLowest1m: string;
}

interface Status {
  timestamp: Date;
  error_code: string;
  error_message: string;
  elapsed: string;
  credit_count: number;
}

export interface CmcPairInfo {
  data: Data;
  status: Status;
}

export interface CmcPairsResponse {
  data: {
    poolId: string;
    platform: {
      id: number;
      name: string;
      cryptoId: number;
      dexerPlatformName: string;
    };
    baseToken: BaseToken;
    quoteToken: QuoteToken;
    dexerInfo: unknown;
    priceUsd?: string;
    volume24h?: string;
    liquidity?: string;
    priceChange24h?: string;
    pairContractAddress: string;
    updateDate: number;
    liquidityScore?: string;
    confidenceScore?: string;
    isLiquidityAbnormal: number;
  }[];
  status: Status;
}

interface BaseToken {
  name: string;
  symbol: string;
  address: string;
}

interface QuoteToken {
  name: string;
  symbol: string;
  address: string;
}
