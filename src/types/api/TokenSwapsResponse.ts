export interface Item {
  id: string;
  date: Date;
  trades: number;
  tradeAmountUsd: number;
}

export interface TokenSwapsResponse {
  items: Item[];
  count: number;
}
