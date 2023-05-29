export interface UniqueReceiversResponse {
  data: {
    ethereum: {
      transfers: {
        date: {
          date: string;
        };
        count: string;
        median: number;
      }[];
    };
  };
}

export type BaseChartResponse = { t: number; v: number }[];
