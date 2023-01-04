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
}

interface Platform {
  id: string;
  chainId: number;
  cmc: number;
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