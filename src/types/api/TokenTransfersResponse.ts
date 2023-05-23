export interface TokenTransfersResponse {
  data: {
    ethereum: {
      transfers: Transfer[];
    };
  };
}

export interface Transfer {
  date: {
    date: string;
  };
  median: number;
  average: number;
  sum: number;
  count: number;
}
