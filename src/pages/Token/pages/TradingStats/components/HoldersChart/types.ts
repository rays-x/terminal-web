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

export type HoldersResponse = { t: number; v: number }[];
