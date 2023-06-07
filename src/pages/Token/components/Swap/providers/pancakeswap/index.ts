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
  ExchangeProvider,
  TransactionRequestWithRecipient,
} from '../interface'

import BigNumber from 'bignumber.js'

import { EstimationResult, TokenInfo } from '../interface'

import {
  CurrencyAmount,
  Percent,
  Token,
  TradeType,
} from '@pancakeswap/swap-sdk-core'
import {
  Pool,
  SwapRouter,
  Tick,
  Trade,
} from '@pancakeswap/v3-sdk'
import {
  OrderDirection,
  PoolPancakeswapQuery,
  PoolPancakeswapQueryVariables,
  Pool_OrderBy,
} from '../../../../../../graphql/generated/schema-pancake'
import axios from 'axios'
import {
  PancakeswapTokens,
  PoolsWithoutTokensVariables,
} from './types'
import { uniqBy } from 'lodash'
import {
  QUERY_POOLS_PANCAKESWAP,
  QUERY_POOLS_WITHOUT_TOKENS_PANCAKESWAP,
} from '../../../../../../graphql/queries/pancake/pools'
import { SwapSettings } from '../../components/Settings/types'
import {
  DEFAULT_GAS_LIMIT,
  POOLS_PER_PAGE,
  POOLS_TO_LOAD,
  TICKS_PER_PAGE,
} from './constants'
import { BigNumberish, ethers } from 'ethers'
import {
  ContractAddresses,
  NetworkParams,
} from '../uniswap/types'
import { ERC20_ABI } from '../constants'

export default class PancakeswapV3ExchangeProvider
  implements
    ExchangeProvider<
      Trade<Token, Token, TradeType.EXACT_INPUT>
    >
{
  protected readonly chainId: number
  protected readonly provider: ethers.providers.JsonRpcProvider

  protected readonly contractAddresses: ContractAddresses

  public constructor(
    networkParams: NetworkParams,
    contractAddresses: ContractAddresses,
  ) {
    this.chainId = networkParams.chainId
    this.provider = new ethers.providers.JsonRpcProvider(
      networkParams.rpcUrl,
    )
    this.contractAddresses = contractAddresses
  }

  public getInfo(): ExchangeInfo {
    return {
      name: 'PancakeSwap V3',
      logoURI: 'https://pancakeswap.finance/favicon.ico',
    }
  }

  public async getAvailableTokens(): Promise<AvailableTokens> {
    const [
      { data: cgTokens },
      { data: cmcTokens },
      { data: pancakeswapTokens },
    ] = await Promise.all([
      axios.get<PancakeswapTokens>(
        'https://tokens.pancakeswap.finance/coingecko.json',
        { responseType: 'json' },
      ),
      axios.get<PancakeswapTokens>(
        'https://tokens.pancakeswap.finance/cmc.json',
        { responseType: 'json' },
      ),
      clientPancake.query<
        TokensUniswapQuery,
        TokensUniswapQueryVariables
      >({
        query: QUERY_TOKENS_PANCAKESWAP,
      }),
    ])

    const tokens = [
      {
        tokens: cmcTokens.tokens.filter(
          ({ chainId }) => chainId === this.chainId,
        ),
        source: 'CoinMarketCap',
      },
      {
        tokens: cgTokens.tokens.filter(
          ({ chainId }) => chainId === this.chainId,
        ),
        source: 'CoinGecko',
      },
      {
        tokens: pancakeswapTokens.tokens
          .filter((token) => !!token.id)
          .map((token) => ({
            ...token,
            address: token.id,
            decimals: Number.parseInt(token.decimals, 10),
            logoURI: `https://tokens.pancakeswap.finance/images/${web3Utils.toChecksumAddress(
              token.id,
            )}.png`,
          })),
        source: 'Pancakeswap',
      },
    ].flatMap(({ tokens = [], source }) =>
      tokens.map((token) => ({
        ...token,
        id: token.address,
        source,
      })),
    )

    return { tokens: uniqBy(tokens, 'id') }
  }

  public async estimate(
    baseTokenInfo: TokenInfo,
    quoteTokenInfo: TokenInfo,
    baseTokenAmount: string,
    settings: SwapSettings,
  ): Promise<
    EstimationResult<
      Trade<Token, Token, TradeType.EXACT_INPUT>
    >
  > {
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

    const poolResponses = await Promise.all(
      Array.from(
        {
          length: Math.ceil(POOLS_TO_LOAD / POOLS_PER_PAGE),
        },
        (_, i) => i,
      ).map(async (page) =>
        clientPancake.query<
          PoolPancakeswapQuery,
          PoolPancakeswapQueryVariables
        >({
          query: QUERY_POOLS_PANCAKESWAP,
          variables: {
            skip: page * POOLS_PER_PAGE,
            first: Math.min(
              POOLS_TO_LOAD - page * POOLS_PER_PAGE,
              POOLS_PER_PAGE,
            ),
            skipTicks: 0,
            firstTicks: TICKS_PER_PAGE,
            orderBy: Pool_OrderBy.VolumeUsd,
            orderDirection: OrderDirection.Desc,
          },
        }),
      ),
    )

    const pools = poolResponses.flatMap(
      (res) => res.data.pools,
    )

    const poolsNeedAdditionalTicksLoadMap = new Map<
      string,
      PoolPancakeswapQuery['pools'][0]['ticks']
    >()

    let poolsNeedAdditionalTicks = pools
      .filter((pool) => pool.ticks.length >= TICKS_PER_PAGE)
      .map((pool) => pool.id)

    let page = 1

    while (poolsNeedAdditionalTicks.length) {
      const {
        data: { pools: poolsWithManyTicks = [] },
      } = await clientPancake.query<
        PoolPancakeswapQuery,
        PoolsWithoutTokensVariables
      >({
        query: QUERY_POOLS_WITHOUT_TOKENS_PANCAKESWAP,
        variables: {
          firstTicks: TICKS_PER_PAGE,
          skipTicks: TICKS_PER_PAGE * page,
          ids: poolsNeedAdditionalTicks,
        },
      })

      poolsWithManyTicks.forEach((pool) =>
        poolsNeedAdditionalTicksLoadMap.set(pool.id, [
          ...(poolsNeedAdditionalTicksLoadMap.get(
            pool.id,
          ) || []),
          ...pool.ticks,
        ]),
      )

      poolsNeedAdditionalTicks = poolsWithManyTicks
        .filter(
          (pool) => pool.ticks.length >= TICKS_PER_PAGE,
        )
        .map((pool) => pool.id)

      page += 1
    }

    const [bestTrade] = await Trade.bestTradeExactIn(
      pools.map(
        (pool) =>
          new Pool(
            new Token(
              this.chainId,
              web3Utils.toChecksumAddress(pool.token0.id),
              Number.parseInt(pool.token0.decimals, 10),
              pool.token0.symbol,
            ),
            new Token(
              this.chainId,
              web3Utils.toChecksumAddress(pool.token1.id),
              Number.parseInt(pool.token1.decimals, 10),
              pool.token1.symbol,
            ),
            Number.parseInt(pool.feeTier, 10),
            pool.sqrtPrice,
            pool.liquidity,
            Number.parseInt(pool.tick, 10),
            [
              ...pool.ticks,
              ...(poolsNeedAdditionalTicksLoadMap.get(
                pool.id,
              ) || []),
            ]
              .map(
                (tick) =>
                  new Tick({
                    index: Number.parseInt(
                      tick.tickIdx,
                      10,
                    ),
                    liquidityGross: tick.liquidityGross,
                    liquidityNet: tick.liquidityNet,
                  }),
              )
              .sort((a, b) => a.index - b.index),
          ),
      ),
      CurrencyAmount.fromRawAmount(
        baseToken,
        new BigNumber(baseTokenAmount)
          .shiftedBy(baseTokenInfo.decimals)
          .toFixed(),
      ),
      quoteToken,
      { maxHops: settings.maxHops, maxNumResults: 1 },
    )

    if (!bestTrade) {
      throw new Error('Route not found!')
    }

    return {
      quoteTokenAmount: bestTrade.outputAmount.toFixed(),
      tradeData: bestTrade,
      swaps: bestTrade.swaps[0].route.pools.map((pool) => ({
        baseSymbol:
          pool.token0.symbol?.toUpperCase() ||
          pool.token0.address,
        quoteSymbol:
          pool.token1.symbol?.toUpperCase() ||
          pool.token1.address,
      })),
    }
  }

  public async swap(
    estimationResult: EstimationResult<
      Trade<Token, Token, TradeType.EXACT_INPUT>
    >,
    addressFrom: string,
    settings: SwapSettings,
  ): Promise<TransactionRequestWithRecipient> {
    const [slippageNum, slippageDenum] = new BigNumber(
      settings.slippage,
    )
      .toFraction()
      .map((bn) => BigInt(bn.toFixed()))

    const methodParameters = SwapRouter.swapCallParameters(
      estimationResult.tradeData,
      {
        recipient: web3Utils.toChecksumAddress(addressFrom),
        slippageTolerance: new Percent(
          slippageNum,
          slippageDenum,
        ),
        deadline: Math.floor(
          Date.now() / 1000 + settings.deadlineMins * 60,
        ),
      },
    )

    return {
      data: methodParameters.calldata,
      to: this.contractAddresses.v3SwapRouterAddress,
      value: methodParameters.value,
      gasLimit: DEFAULT_GAS_LIMIT,
      gasPrice: await this.provider.getGasPrice(),
    }
  }

  public async prepareSwap(
    estimationResult: EstimationResult<
      Trade<Token, Token, TradeType.EXACT_INPUT>
    >,
    addressFrom: string,
  ): Promise<TransactionRequestWithRecipient> {
    const tokenContract = new ethers.Contract(
      web3Utils.toChecksumAddress(
        estimationResult.tradeData.swaps[0].inputAmount
          .currency.address,
      ),
      ERC20_ABI,
      this.provider,
    )

    const apprTx =
      await tokenContract.populateTransaction.approve(
        this.contractAddresses.v3SwapRouterAddress,
        new BigNumber(
          estimationResult.tradeData.inputAmount.toFixed(),
        )
          .shiftedBy(
            estimationResult.tradeData.swaps[0].inputAmount
              .currency.decimals,
          )
          .toFixed(),
      )

    if (!apprTx.to) {
      throw new Error('Failed to prepare swap')
    }

    return { ...apprTx, to: apprTx.to, from: addressFrom }
  }

  public async getErc20TokenBalance(
    tokenInfo: TokenInfo,
    address: string,
  ): Promise<string> {
    const tokenContract = new ethers.Contract(
      web3Utils.toChecksumAddress(tokenInfo.address),
      ERC20_ABI,
      this.provider,
    )

    try {
      const balance = (await tokenContract.balanceOf(
        address,
      )) as BigNumberish

      return new BigNumber(balance.toString())
        .shiftedBy(-tokenInfo.decimals)
        .toFixed()
    } catch (err) {
      if (
        err instanceof Error &&
        err.message.includes('call revert exception')
      ) {
        throw new Error("Address doesn't have that token")
      }

      throw err
    }
  }
}
