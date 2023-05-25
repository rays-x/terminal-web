export interface TransactionsResponse {
  data: Data;
}

export interface Data {
  ethereum: Ethereum;
}

export interface Ethereum {
  transfers: Transfer[];
}

export interface Transfer {
  transaction: Transaction;
  amount: number;
  receiver: Receiver;
  sender: Sender;
  block: Block;
}

export interface Transaction {
  hash: string;
}

export interface Receiver {
  address: string;
}

export interface Sender {
  address: string;
}

export interface Block {
  timestamp: Timestamp;
}

export interface Timestamp {
  unixtime: number;
}
