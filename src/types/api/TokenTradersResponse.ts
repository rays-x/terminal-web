export interface Item2 {
  tradeAmount: number;
  userCount: number;
  swapsCount: number;
}

export interface Item {
  id: string;
  date: Date;
  items: Item2[];
}

export interface TokenTradersResponse {
  items: Item[];
  count: number;
}