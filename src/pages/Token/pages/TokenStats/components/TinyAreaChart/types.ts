export interface UniqStatsResponse {
  data: {
    ethereum: {
      transfers: {
        date: {
          date: string;
        };
        uniqSenders: string;
        uniqReceivers: string;
        transferCount: number;
      }[];
    };
  };
}
