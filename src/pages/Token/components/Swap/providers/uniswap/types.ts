import { ContractInterface } from 'ethers'

export interface ContractAddresses {
  v3SwapRouterAddress: string
  quoterAddress: string
  poolDeployerAddress: string
}

export interface NetworkParams {
  chainId: number
  rpcUrl: string
}

export interface Abis {
  quoterAbi: ContractInterface
}

export interface UniswapTokens {
  name: string
  logoURI: string
  keywords: string[]
  timestamp: string
  tokens: UniswapToken[]
  version: {
    major: number
    minor: number
    patch: number
  }
}

export interface UniswapToken {
  chainId: number
  address: string
  name: string
  symbol: string
  decimals: number
  logoURI?: string
}

export interface GasPriceResponse {
  fast: number
  fastest: number
  safeLow: number
  average: number
  block_time: number
  blockNum: number
  speed: number
  safeLowWait: number
  avgWait: number
  fastWait: number
  fastestWait: number
  gasPriceRange: Record<string, number>
}
