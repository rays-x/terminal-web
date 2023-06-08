export interface PancakeswapTokens {
  name: string
  timestamp: string
  version: {
    major: number
    minor: number
    patch: number
  }
  logoURI: string
  keywords: string[]
  tokens: {
    name: string
    symbol: string
    address: string
    chainId: number
    decimals: number
    logoURI: string
  }[]
}

export interface PoolsWithoutTokensVariables {
  firstTicks: number
  skipTicks: number
  ids: string[]
}
