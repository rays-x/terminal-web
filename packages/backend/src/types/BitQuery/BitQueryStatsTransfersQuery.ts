interface Date {
  date: string;
}

interface Transfer {
  date: Date;
  total_amount: number;
  total_amount_usd: number;
  median_transfer_amount: number;
  median_transfer_amount_usd: number;
  average_transfer_amount: number;
  average_transfer_amount_usd: number;
  uniq_receivers: number;
  uniq_senders: number;
  transfer_count: number;
}

interface Stats {
  transfers: Transfer[];
}

interface Data {
  stats: Stats;
}

export interface BitQueryStatsTransfersQuery {
  data: Data;
}
