interface BaseToken {
  address: string;
  name: string;
  symbol: string;
}

interface QuoteToken {
  address: string;
  name: string;
  symbol: string;
}

interface H24 {
  buys: number;
  sells: number;
}

interface H6 {
  buys: number;
  sells: number;
}

interface H1 {
  buys: number;
  sells: number;
}

interface M5 {
  buys: number;
  sells: number;
}

interface Txns {
  h24: H24;
  h6: H6;
  h1: H1;
  m5: M5;
}

interface Volume {
  h24: number;
  h6: number;
  h1: number;
  m5: number;
}

interface PriceChange {
  h24: number;
  h6: number;
  h1: number;
  m5: number;
}

interface Liquidity {
  usd: number;
  base: number;
  quote: number;
}

export interface DexsPair {
  chainId: string;
  dexId: string;
  labels: string[];
  pairAddress: string;
  baseToken: BaseToken;
  quoteToken: QuoteToken;
  quoteTokenSymbol: string;
  price: string;
  priceUsd: string;
  txns: Txns;
  volume: Volume;
  priceChange: PriceChange;
  liquidity: Liquidity;
  marketCap: number;
}


export type ChainsType = {
  [k: string]: {
    name: string
    image: string
    imageGuru: string
    exchanges: {
      name: string
    }[]
  }
}
export type RankByType = {
  key: 'txns' | 'volume',
  order: 'desc' | 'asc'
}

export type TablePair = {
  id: string,
  symbol: string,
  slug: string,
  image: string,
  priceChangePercentage1h: number,
  priceChangePercentage24h: number,
  price: string | number,
  volumeChangePercentage24h: number,
  // volume_change_1h: string,
  circulatingSupply: number,
  volume: number,
  marketCap: number,
  liquidity: number,
  cmcId?: number
}
export type TableData = {
  tokens: TablePair[]
  tokensCount: number
}

export type DexsData = {
  pairs: DexsPair[]
  pairsCount: number
}

export interface TableCoreProps {
  data;
}

export type Columns =
  | {
  Header: string;
  accessor: string;
  width?: number;
  align?: string;
  justify?: string;
}
  | {
  Header: string;
  columns: Columns[];
};

export interface Base {
  value: string;
  matchLevel: string;
  matchedWords: any[];
}

export interface BaseContract {
  value: string;
  matchLevel: string;
  fullyHighlighted: boolean;
  matchedWords: string[];
}

export interface BaseName {
  value: string;
  matchLevel: string;
  matchedWords: any[];
}

export interface BaseSymbol {
  value: string;
  matchLevel: string;
  matchedWords: any[];
}

export interface HighlightResult {
  base: Base;
  baseContract: BaseContract;
  baseName: BaseName;
  baseSymbol: BaseSymbol;
}

export interface Hit {
  base: string;
  baseContract: string;
  baseLogoURL: string;
  baseName: string;
  baseSymbol: string;
  rank?: number;
  status: string;
  type: string;
  url: string;
  objectID: string;
  _distinctSeqID: number;
  _highlightResult: HighlightResult;
}

export interface Exhaustive {
  nbHits: boolean;
  typo: boolean;
}

export interface RenderingContent {
}

export interface Fetch {
  total: number;
}

export interface ProcessingTimingsMS {
  fetch: Fetch;
  total: number;
}

export interface Result {
  hits: Hit[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  exhaustive: Exhaustive;
  query: string;
  params: string;
  index: string;
  renderingContent: RenderingContent;
  processingTimeMS: number;
  processingTimingsMS: ProcessingTimingsMS;
}

export interface SearchNomics {
  results: Result[];
}

export interface TopFiatCurrency {
  currency: string;
  name: string;
  volume: string;
  volume_change: string;
  volume_change_pct: string;
  symbol: string;
  type: number;
}

export interface TopCurrency {
  currency: string;
  name: string;
  volume: string;
  volume_change: string;
  volume_change_pct: string;
  symbol: string;
  type: number;
}

export interface TopExchange {
  exchange: string;
  volume: string;
  volume_change: string;
  volume_change_pct: string;
  exchange_name: string;
}

export interface VolumeTransparency {
  grade: string;
  volume: string;
  volume_change: string;
  volume_change_pct: string;
}

export interface i1h2 {
  volume: string;
  price_change: string;
  price_change_pct: string;
  volume_change: string;
  volume_change_pct: string;
  market_cap_change: string;
  market_cap_change_pct: string;
  transparent_market_cap_change: string;
  transparent_market_cap_change_pct: string;
  volume_transparency: VolumeTransparency[];
  volume_transparency_grade: string;
}

export interface VolumeTransparency2 {
  grade: string;
  volume: string;
  volume_change: string;
  volume_change_pct: string;
}

export interface i1d2 {
  volume: string;
  price_change: string;
  price_change_pct: string;
  volume_change: string;
  volume_change_pct: string;
  market_cap_change: string;
  market_cap_change_pct: string;
  transparent_market_cap_change: string;
  transparent_market_cap_change_pct: string;
  volume_transparency: VolumeTransparency2[];
  volume_transparency_grade: string;
}

export interface VolumeTransparency3 {
  grade: string;
  volume: string;
  volume_change: string;
  volume_change_pct: string;
}

export interface i7d2 {
  volume: string;
  price_change: string;
  price_change_pct: string;
  volume_change: string;
  volume_change_pct: string;
  market_cap_change: string;
  market_cap_change_pct: string;
  transparent_market_cap_change: string;
  transparent_market_cap_change_pct: string;
  volume_transparency: VolumeTransparency3[];
  volume_transparency_grade: string;
}

export interface VolumeTransparency4 {
  grade: string;
  volume: string;
  volume_change: string;
  volume_change_pct: string;
}

export interface i30d2 {
  volume: string;
  price_change: string;
  price_change_pct: string;
  volume_change: string;
  volume_change_pct: string;
  market_cap_change: string;
  market_cap_change_pct: string;
  transparent_market_cap_change: string;
  transparent_market_cap_change_pct: string;
  volume_transparency: VolumeTransparency4[];
  volume_transparency_grade: string;
}

export interface VolumeTransparency5 {
  grade: string;
  volume: string;
  volume_change: string;
  volume_change_pct: string;
}

export interface Ytd {
  volume: string;
  price_change: string;
  price_change_pct: string;
  volume_change: string;
  volume_change_pct: string;
  market_cap_change: string;
  market_cap_change_pct: string;
  transparent_market_cap_change: string;
  transparent_market_cap_change_pct: string;
  volume_transparency: VolumeTransparency5[];
  volume_transparency_grade: string;
}

export interface VolumeTransparency6 {
  grade: string;
  volume: string;
  volume_change: string;
  volume_change_pct: string;
}

export interface i365d2 {
  volume: string;
  price_change: string;
  price_change_pct: string;
  volume_change: string;
  volume_change_pct: string;
  market_cap_change: string;
  market_cap_change_pct: string;
  transparent_market_cap_change: string;
  transparent_market_cap_change_pct: string;
  volume_transparency: VolumeTransparency6[];
  volume_transparency_grade: string;
}

export interface IntervalData {
  '1h': i1h2;
  '1d': i1d2;
  '7d': i7d2;
  '30d': i30d2;
  'ytd': Ytd;
  '365d': i365d2;
}

export interface TopExchangeVolume {
  exchange: string;
  volume: string;
  volume_change: string;
  volume_change_pct: string;
  exchange_name: string;
}

export interface TopFiatVolume {
  currency: string;
  name: string;
  volume: string;
  volume_change: string;
  volume_change_pct: string;
  symbol: string;
  type: number;
}

export interface TopPairVolume {
  currency: string;
  name: string;
  volume: string;
  volume_change: string;
  volume_change_pct: string;
  symbol: string;
  type: number;
}

export interface HighlightsNomics {
  total_volume: string;
  fiat_volume: string;
  fiat_volume_change: string;
  fiat_volume_change_pct: string;
  num_exchanges: string;
  top_fiat_currencies: TopFiatCurrency[];
  top_currencies: TopCurrency[];
  top_exchanges: TopExchange[];
  interval_data: IntervalData;
  market_cap: string;
  top_exchange_volumes: TopExchangeVolume[];
  top_fiat_volumes: TopFiatVolume[];
  top_pair_volumes: TopPairVolume[];
}

export interface PrototypePair {
  chainId: number;
  name: string;
  id: string;
  decimals: number;
  symbol: string;
  logoURI: string;
  slug: string;
  liquidity: number;
  volume: number;
  volumeChangePercentage24h: number;
  circulatingSupply: number;
  marketCap: number;
  price: number;
  priceChangePercentage1h: number;
  priceChangePercentage24h: number;
  cmcId: number;
}