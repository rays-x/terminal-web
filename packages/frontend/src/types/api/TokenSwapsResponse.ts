export interface Item {
  id: string;
  date: Date;
  countTxs: number;
  tradeAmountUsd: number;
}

export interface TokenSwapsResponse {
  items: Item[];
  count: number;
}