interface Base {
  id: string;
  slug: string;
  symbol: string;
  image: string;
  address: string;
}

interface Dex {
  id: string;
  name: string;
}

interface Platform {
  id: string;
  chainId: number;
  dexerTxHashFormat?: string;
}

interface Quote {
  id: string;
  slug: string;
  address: string;
  symbol: string;
  image: string;
}

interface Item {
  base: Base;
  dex: Dex;
  liquidity: string;
  platform: Platform;
  quote: Quote;
  name: string;
  sellsCount: number;
  sellersCount: number;
  tradesCount: number;
  buyersCount: number;
  buysCount: number;
  coingeckoPoolId: string;
}

export interface TokenPairsResponse {
  items: Item[];
  count: number;
}
