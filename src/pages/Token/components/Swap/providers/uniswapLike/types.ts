export interface ContractAddresses {
  v3SwapRouterAddress: string
  quoterAddress: string
  poolDeployerAddress: string
}

export interface NetworkParams {
  chainId: number
  rpcUrl: string
}

export interface PrepareSwapOptions {
  inputAmount: {
    toFixed: () => string
  }
  swaps: {
    inputAmount: {
      currency: { address: string; decimals: number }
    }
  }[]
}
