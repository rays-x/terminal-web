export interface PageButton {
  width: number;
  height: number;
  label: string;
}

export enum SubPages {
  PriceChart = 'PriceChart',
  Transactions = 'Transactions',
  TokenStats = 'TokenStats',
  TradingStats = 'TradingStats'
  // Pair = 'Pair',
  // Dex = 'Dex',
  // Traders = 'Traders',
  // Balances = 'Balances',
  // Leaderboard = 'Leaderboard'
}


export interface Urls {
  website: string[];
  technical_doc: string[];
  explorer: string[];
  source_code: string[];
  message_board: string[];
  chat: string[];
  announcement: string[];
  reddit: string[];
  facebook: string[];
  twitter: string[];
}

export interface Statistics {
  price: number;
  priceChangePercentage1h: number;
  priceChangePercentage24h: number;
  priceChangePercentage7d: number;
  priceChangePercentage30d: number;
  priceChangePercentage60d: number;
  priceChangePercentage90d: number;
  marketCap: number;
  marketCapChangePercentage24h: number;
  fullyDilutedMarketCap: number;
  fullyDilutedMarketCapChangePercentage24h: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
  marketCapDominance: number;
  rank: number;
  roi: number;
  low24h: number;
  high24h: number;
  low7d: number;
  high7d: number;
  low30d: number;
  high30d: number;
  low90d: number;
  high90d: number;
  low52w: number;
  high52w: number;
  lowAllTime: number;
  highAllTime: number;
  lowAllTimeChangePercentage: number;
  highAllTimeChangePercentage: number;
  lowAllTimeTimestamp: Date;
  highAllTimeTimestamp: Date;
  lowYesterday: number;
  highYesterday: number;
  openYesterday: number;
  closeYesterday: number;
  priceChangePercentageYesterday: number;
  volumeYesterday: number;
  turnover: number;
  ytdPriceChangePercentage: number;
}

export interface Wallet {
  id: number;
  universalLink: string;
}

export interface Platform {
  contractId: number;
  contractAddress: string;
  contractPlatform: string;
  contractPlatformId: number;
  contractChainId: number;
  contractRpcUrl: string[];
  contractNativeCurrencyName: string;
  contractNativeCurrencySymbol: string;
  contractNativeCurrencyDecimals: number;
  contractBlockExplorerUrl: string;
  contractExplorerUrl: string;
  contractDecimals: number;
  platformCryptoId: number;
  sort: number;
  wallets: Wallet[];
}

export interface RelatedCoin {
  id: number;
  name: string;
  slug: string;
  price: number;
  priceChangePercentage24h: number;
  priceChangePercentage7d: number;
}

export interface RelatedExchange {
  id: number;
  name: string;
  slug: string;
}

export interface Statistic {
  tokensForSale: number;
  raisedInUsd: number;
}

export interface Stage {
  start: Date;
  end: Date;
  status: string;
  type: string;
  tokenForSale: number;
  icoPriceUsd: string;
  softCapUsd: number;
  personalCap: string;
  distributedInIcoPercentage: number;
  access: string;
  comments: string;
  fundraisingGoalUsd: string;
  whereToBuyName: string;
  whereToBuyUrl: string;
  acceptedCurrency: string;
}

export interface Ico {
  cryptoId: number;
  cryptoSymbol: string;
  status: string;
  cryptoStatus: number;
  name: string;
  statistic: Statistic;
  stages: Stage[];
}

export interface Wallet2 {
  id: number;
  name: string;
  tier: number;
  url: string;
  chains: string;
  types: string;
  introduction: string;
  star: number;
  security: number;
  easyToUse: number;
  decentration: boolean;
  focusNumber: number;
  rank: number;
  logo: string;
  multipleChain: boolean;
}

export interface AuditInfo {
  coinId: string;
  auditor: string;
  auditStatus: number;
  score: string;
  auditTime: Date;
  reportUrl: string;
}

export interface HolderList {
  address: string;
  balance: number;
  share: number;
}

export interface Holders {
  holderCount: number;
  holderList: HolderList[];
  topTenHolderRatio: number;
  topTwentyHolderRatio: number;
  topFiftyHolderRatio: number;
  topHundredHolderRatio: number;
}

export interface Data {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  category: string;
  description: string;
  dateAdded: Date;
  status: string;
  icoStatus: string;
  notice: string;
  latestUpdateTime: Date;
  watchCount: string;
  dateLaunched: Date;
  launchPrice: number;
  tags: any[];
  selfReportedTags: string[];
  selfReportedCirculatingSupply: string;
  urls: Urls;
  volume: number;
  volumeChangePercentage24h: number;
  cexVolume: number;
  dexVolume: number;
  statistics: Statistics;
  platforms: Platform[];
  relatedCoins: RelatedCoin[];
  relatedExchanges: RelatedExchange[];
  ico: Ico;
  wallets: Wallet2[];
  isAudited: boolean;
  auditInfos: AuditInfo[];
  holders: Holders;
  displayTV: number;
}

export interface Status {
  timestamp: Date;
  error_code: string;
  error_message: string;
  elapsed: string;
  credit_count: number;
}

export interface CmcDetail {
  data: Data;
  status: Status;
}
