interface Base {
  id: string;
  slug: string;
  cmc: number;
  symbol: string;
  image: string;
}

interface Dex {
  id: string;
  name: string;
  cmc: number;
}

interface Platform {
  id: string;
  chainId: number;
  cmc: number;
  dexerTxHashFormat?: string;
}

interface Quote {
  id: string;
  slug: string;
  cmc: number;
  symbol: string;
  image: string;
}

interface Item {
  id: string;
  base: Base;
  cmc: string;
  address: string;
  dex: Dex;
  liquidity: string;
  platform: Platform;
  quote: Quote;
}

export interface TokenPairsResponse {
  items: Item[];
  count: number;
}