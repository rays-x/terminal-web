import { providers } from 'ethers'

import { SwapSettings } from '../components/Settings/types'

export type TransactionRequestWithRecipient =
  providers.TransactionRequest & { to: string }

export interface TokenInfo {
  id: string
  name: string
  symbol: string
  address: string
  decimals: number
  logoURI: string
  source: string
}

export interface EstimationResult<T> {
  quoteTokenAmount: string
  swaps: { baseSymbol?: string; quoteSymbol?: string }[]
  tradeData: T
}

export interface ExchangeInfo {
  name: string
  logoURI: string
}

export interface AvailableTokens {
  tokens: TokenInfo[]
}

export interface ExchangeProvider<T> {
  getInfo(): ExchangeInfo
  getAvailableTokens(): Promise<AvailableTokens>
  estimate(
    baseToken: TokenInfo,
    quoteToken: TokenInfo,
    baseTokenAmount: string,
    settings: SwapSettings,
  ): Promise<EstimationResult<T>>
  swap(
    estimationResult: EstimationResult<T>,
    addressFrom: string,
    settings: SwapSettings,
  ): Promise<TransactionRequestWithRecipient>
  prepareSwap(
    estimationResult: EstimationResult<T>,
    addressFrom: string,
    settings: SwapSettings,
  ): Promise<TransactionRequestWithRecipient>
  getErc20TokenBalance(
    baseTokenInfo: TokenInfo,
    address: string,
  ): Promise<string>
}
