import { ContractInterface } from 'ethers'

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
