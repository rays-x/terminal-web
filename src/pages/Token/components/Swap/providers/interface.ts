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
  logoURI: string;
}

export interface AvailableTokens {
  tokens: TokenInfo[];
}

export interface ExchangeProvider {
  getInfo(): ExchangeInfo;
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
  getErc20TokenBalance(
    baseTokenInfo: TokenInfo,
    address: string,
  ): Promise<string>;
}
