import { providers } from "ethers";

export type TransactionRequestWithRecipient = providers.TransactionRequest & { to: string }

export interface TokenInfo {
  id: string;
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  logoURI: string;
  // balance?: string;
}

export interface EstimationResult {
  quoteTokenAmount: string;
}

export interface ExchangeInfo {
  name: string;
}

export interface AvailableTokens {
  tokens: TokenInfo[];
}

export interface ExchangeProvider {
  getInfo(): Promise<ExchangeInfo>;
  getAvailableTokens(): Promise<AvailableTokens>;
  estimate(
    baseToken: TokenInfo,
    quoteToken: TokenInfo,
    baseTokenAmount: string
  ): Promise<EstimationResult>;
  swap(
    baseTokenInfo: TokenInfo,
    quoteTokenInfo: TokenInfo,
    baseTokenAmount: string,
    addressFrom: string,
  ): Promise<TransactionRequestWithRecipient>;
  prepareSwap(
    baseTokenInfo: TokenInfo,
    baseTokenAmount: string,
    addressFrom: string,
  ): Promise<TransactionRequestWithRecipient>;
}
