export interface Item {
  id: string;
  date: string;
  count: number;
}

export interface TokenHoldersResponse {
  items: Item[];
  count: number;
}