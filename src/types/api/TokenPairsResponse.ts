interface Base {
  id: string;
  slug: string;
  cmc: number;
  symbol: string;
  image: string;
  address: string;
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
  address: string;
  dex: Dex;
  liquidity: string;
  platform: Platform;
  quote: Quote;
  name: string;
}

export interface TokenPairsResponse {
  items: Item[];
  count: number;
}
