import { ExchangeProvider } from './interface'
import PancakeswapV3ExchangeProvider from './pancakeswap'
import UniswapV3ExchangeProvider from './uniswap'

export const exchangeProviders = {
  'bsc': new PancakeswapV3ExchangeProvider(
    {
      chainId: 56,
      rpcUrl: 'https://bsc-dataseed1.binance.org',
    },
    {
      quoterAddress: '0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997',
      v3SwapRouterAddress: '0x1b81D678ffb9C0263b24A97847620C99d213eB14',
      poolDeployerAddress: '0x41ff9AA7e16B8B1a8a8dc4f0eFacd93D02d071c9',
    }
  ),
  ethereum: new UniswapV3ExchangeProvider(
    {
      chainId: 5,
      rpcUrl: 'https://rpc.ankr.com/eth_goerli',
    },
    {
      quoterAddress: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
      v3SwapRouterAddress: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
      /* factory address */
      poolDeployerAddress: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
    }
  ),
} as Record<string, ExchangeProvider | undefined>
