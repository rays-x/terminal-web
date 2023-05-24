export interface TradesResponse {
  data: {
    ethereum: Ethereum;
  };
}

interface Ethereum {
  dexTrades: DexTrade[];
}

interface DexTrade {
  date: Date;
  trades: string;
  amount: number;
  baseCurrency: BaseCurrency;
  contracts: string;
  currencies: string;
}

interface Date {
  date: string;
}

interface BaseCurrency {
  symbol: string;
}
