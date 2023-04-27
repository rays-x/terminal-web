interface Item {
  id: string;
  date: Date;
  marketCap: number;
  price: number;
  volume: number;
}

export interface TokenVolumeResponse {
  items: Item[];
  count: number;
}

