export interface Item {
  id: string;
  date: Date;
  totalAmount: number;
  totalAmountUsd: number;
  medianTransferAmount: number;
  medianTransferAmountUsd: number;
  averageTransferAmount: number;
  averageTransferAmountUsd: number;
  uniqReceivers: number;
  uniqSenders: number;
  transferCount: number;
}

export interface TokenTransfersResponse {
  items: Item[];
  count: number;
}