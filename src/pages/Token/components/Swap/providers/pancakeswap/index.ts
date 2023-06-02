import web3Utils from 'web3-utils'

import { clientPancake } from '../../../../../../graphql/clients/client-pancake'
import {
  TokensUniswapQuery,
  TokensUniswapQueryVariables,
} from '../../../../../../graphql/generated/schema-uniswap'
import { QUERY_TOKENS_PANCAKESWAP } from '../../../../../../graphql/queries/pancake/tokens'
import {
  AvailableTokens,
  ExchangeInfo,
  TransactionRequestWithRecipient,
} from '../interface'
import UniswapV3ExchangeProvider from '../uniswap'
import BigNumber from 'bignumber.js'

import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json' assert { type: 'json' }

import { BigNumber as EthersBN, ethers } from 'ethers'

import { EstimationResult, TokenInfo } from '../interface'

import {
  BigintIsh,
  CurrencyAmount,
  Percent,
  Token,
} from '@pancakeswap/swap-sdk-core'
import {
  computePoolAddress,
  FeeAmount,
  Pool,
  SwapQuoter,
  SwapRouter,
  Tick,
  TickDataProvider,
  TickMath,
  Trade,
} from '@pancakeswap/v3-sdk'
import { QUERY_TICKS_PANCAKESWAP } from '../../../../../../graphql/queries/pancake/ticks'
import {
  PoolPancakeswapQuery,
  PoolPancakeswapQueryVariables,
} from '../../../../../../graphql/generated/schema-pancake'

export default class PancakeswapExchangeProvider extends UniswapV3ExchangeProvider {
  public async getInfo(): Promise<ExchangeInfo> {
    return {
      name: 'PancakeSwap V3',
    }
  }

  public async getAvailableTokens(): Promise<AvailableTokens> {
    const res = await clientPancake.query<
      TokensUniswapQuery,
      TokensUniswapQueryVariables
    >({
      query: QUERY_TOKENS_PANCAKESWAP,
    })

    return {
      tokens: res.data.tokens.map((token) => ({
        id: token.id,
        name: token.name,
        symbol: token.symbol,
        address: token.id,
        decimals: Number.parseInt(token.decimals, 10),
        logoURI: `https://tokens.pancakeswap.finance/images/${web3Utils.toChecksumAddress(
          token.id,
        )}.png`,
      })),
    }
  }

  public async estimate(
    baseTokenInfo: TokenInfo,
    quoteTokenInfo: TokenInfo,
    baseTokenAmount: string,
  ): Promise<EstimationResult> {
    const quoterContract = new ethers.Contract(
      this.contractAddresses.quoterAddress,
      SwapQuoter.V2INTERFACE,
      this.provider,
    )

    const baseToken = new Token(
      this.chainId,
      web3Utils.toChecksumAddress(baseTokenInfo.address),
      baseTokenInfo.decimals,
      baseTokenInfo.symbol,
      baseTokenInfo.name,
    )

    const quoteToken = new Token(
      this.chainId,
      web3Utils.toChecksumAddress(quoteTokenInfo.address),
      quoteTokenInfo.decimals,
      quoteTokenInfo.symbol,
      quoteTokenInfo.name,
    )

    const currentPoolAddress = computePoolAddress({
      deployerAddress:
        this.contractAddresses.poolDeployerAddress,
      tokenA: baseToken,
      tokenB: quoteToken,
      fee: FeeAmount.MEDIUM,
    })

    const poolContract = new ethers.Contract(
      currentPoolAddress,
      IUniswapV3PoolABI.abi,
      this.provider,
    )

    const [quotedAmountOut] =
      // @ts-ignore
      (await quoterContract.callStatic.quoteExactInputSingle(
        {
          tokenIn: baseToken.address,
          tokenOut: quoteToken.address,
          amountIn: new BigNumber(baseTokenAmount)
            .shiftedBy(baseTokenInfo.decimals)
            .toFixed(),
          fee: await poolContract.fee(),
          sqrtPriceLimitX96: 0,
        },
      )) as EthersBN[]

    return {
      quoteTokenAmount: new BigNumber(
        quotedAmountOut.toString(),
      )
        .shiftedBy(-quoteTokenInfo.decimals)
        .toString(),
    }
  }

  public async swap(
    baseTokenInfo: TokenInfo,
    quoteTokenInfo: TokenInfo,
    baseTokenAmount: string,
    addressFrom: string,
  ): Promise<TransactionRequestWithRecipient> {
    const amount = new BigNumber(baseTokenAmount)
      .shiftedBy(baseTokenInfo.decimals)
      .toFixed()

    const baseToken = new Token(
      this.chainId,
      web3Utils.toChecksumAddress(baseTokenInfo.address),
      baseTokenInfo.decimals,
      baseTokenInfo.symbol,
      baseTokenInfo.name,
    )

    const quoteToken = new Token(
      this.chainId,
      web3Utils.toChecksumAddress(quoteTokenInfo.address),
      quoteTokenInfo.decimals,
      quoteTokenInfo.symbol,
      quoteTokenInfo.name,
    )

    const currentPoolAddress = computePoolAddress({
      deployerAddress:
        this.contractAddresses.poolDeployerAddress,
      tokenA: baseToken,
      tokenB: quoteToken,
      fee: FeeAmount.MEDIUM,
    })

    const poolContract = new ethers.Contract(
      currentPoolAddress,
      IUniswapV3PoolABI.abi,
      this.provider,
    )

    const [sqrtPriceX96] = (await poolContract.slot0()) as (
      | BigintIsh
      | number
    )[]

    const ticksData = await clientPancake.query<
      PoolPancakeswapQuery,
      PoolPancakeswapQueryVariables
    >({
      query: QUERY_TICKS_PANCAKESWAP,
      variables: {
        id: currentPoolAddress.toLowerCase(),
      },
    })

    if (!ticksData.data.pool?.ticks.length) {
      throw new Error('Pool not found')
    }

    const methodParameters = SwapRouter.swapCallParameters(
      await Trade.bestTradeExactIn(
        [
          new Pool(
            (await poolContract.token0()) ===
            baseToken.address
              ? baseToken
              : quoteToken,
            (await poolContract.token1()) ===
            quoteToken.address
              ? quoteToken
              : baseToken,
            await poolContract.fee(),
            sqrtPriceX96 as BigintIsh,
            await poolContract.liquidity(),
            TickMath.getTickAtSqrtRatio(
              BigInt(sqrtPriceX96.toString()),
            ),
            ticksData.data.pool?.ticks.map(
              (tick) =>
                new Tick({
                  index: Number.parseInt(
                    tick.tickIdx as string,
                    10,
                  ),
                  liquidityGross:
                    tick.liquidityGross as string,
                  liquidityNet: tick.liquidityNet as string,
                }),
            ),
          ),
        ],
        CurrencyAmount.fromRawAmount(baseToken, amount),
        quoteToken,
      ),
      {
        recipient: web3Utils.toChecksumAddress(addressFrom),
        slippageTolerance: new Percent(50, 10_000),
        deadline: Math.floor(Date.now() / 1000 + 1800),
      },
    )

    return {
      data: methodParameters.calldata,
      to: this.contractAddresses.v3SwapRouterAddress,
      value: methodParameters.value,
      gasLimit: 1 * 1000 * 1000,
      gasPrice: 3 * 1000 * 1000 * 1000,
    }
  }
}
