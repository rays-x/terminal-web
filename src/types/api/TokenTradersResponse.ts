export interface TokenTradersResponse {
  data: {
    ethereum: Ethereum;
  };
}

interface Ethereum {
  dexTrades: DexTrade[];
}

interface DexTrade {
  count: number;
}
