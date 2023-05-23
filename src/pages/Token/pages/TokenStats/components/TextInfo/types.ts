export interface TransferDateStats {
  data: {
    ethereum: {
      transfers: {
        count: number;
        minimum: string;
        maximum: string;
      }[];
    };
  };
}
