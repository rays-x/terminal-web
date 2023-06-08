/* eslint-disable class-methods-use-this */
import web3Utils from 'web3-utils'

import { ethers } from 'ethers'

import BigNumber from 'bignumber.js'

import {
  AvailableTokens,
  EstimationResult,
  ExchangeInfo,
  ExchangeProvider,
  TokenInfo,
  TransactionRequestWithRecipient,
} from '../interface'

import { ESTIMATED_GAS_COEFF } from './constants'

import { UniswapToken, UniswapTokens } from './types'

import { QUERY_TOKENS_UNISWAP } from '../../../../../../graphql/queries/uniswap3/tokens'
import {
  OrderDirection,
  PoolUniswapQuery,
  PoolUniswapQueryVariables,
  Pool_OrderBy,
  TokensUniswapQuery,
  TokensUniswapQueryVariables,
} from '../../../../../../graphql/generated/schema-uniswap'
import { clientUniswap } from '../../../../../../graphql/clients/client-uniswap'
import {
  AlphaRouter,
  SwapOptionsSwapRouter02,
  SwapRoute,
  SwapType,
} from '@uniswap/smart-order-router'
import { SwapSettings } from '../../components/settings/types'
import axios from 'axios'
import { uniqBy } from 'lodash'
import {
  CurrencyAmount,
  Fraction,
  Percent,
  Price,
  Token,
  TradeType,
} from '@uniswap/sdk-core'

import BaseUniswapLike from '../uniswapLike'
import { NOT_FOUND_ROUTE_ERROR } from '../constants'

export default class UniswapV3ExchangeProvider
  extends BaseUniswapLike
  implements ExchangeProvider<SwapRoute>
{
  public getInfo(): ExchangeInfo {
    return {
      name: 'Uniswap V3',
      logoURI: 'https://uniswap.org/favicon.ico',
    }
  }

  public async getAvailableTokens(): Promise<AvailableTokens> {
    const [{ data: cgTokens }, { data: uniswapTokens }] =
      await Promise.all([
        axios.get<UniswapTokens>(
          'https://tokens.coingecko.com/uniswap/all.json',
          { responseType: 'json' },
        ),
        clientUniswap.query<
          TokensUniswapQuery,
          TokensUniswapQueryVariables
        >({
          query: QUERY_TOKENS_UNISWAP,
        }),
      ])

    const tokens = [
      {
        tokens: cgTokens.tokens.filter(
          (token): token is Required<UniswapToken> =>
            token.chainId === this.chainId &&
            !!token.logoURI,
        ),
        source: 'CoinGecko',
      },
      {
        tokens: uniswapTokens.tokens
          .filter((token) => !!token.id)
          .map((token) => ({
            ...token,
            address: token.id,
            decimals: Number.parseInt(token.decimals, 10),
            logoURI: `https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/${web3Utils.toChecksumAddress(
              token.id,
            )}/logo.png`,
          })),
        source: 'Uniswap',
      },
    ].flatMap(({ tokens = [], source }) =>
      tokens.map((token) => ({
        ...token,
        id: token.address.toLowerCase(),
        source,
        address: web3Utils.toChecksumAddress(token.address),
      })),
    )

    return { tokens: uniqBy(tokens, 'id') }
  }

  public async estimate(
    baseTokenInfo: TokenInfo,
    quoteTokenInfo: TokenInfo,
    baseTokenAmount: string,
    addressFrom: string,
    settings: SwapSettings,
  ): Promise<EstimationResult<SwapRoute>> {
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

    const amount = new BigNumber(baseTokenAmount)
      .shiftedBy(baseTokenInfo.decimals)
      .toFixed()

    const router = new AlphaRouter({
      chainId: this.chainId,
      provider: this.provider,
    })

    const [slippageNum, slippageDenum] = new BigNumber(
      settings.slippage,
    )
      .toFraction()
      .map((bn) => bn.toNumber())

    const slippageTolerance = new Percent(
      slippageNum,
      slippageDenum,
    )

    const route = await router.route(
      CurrencyAmount.fromRawAmount(baseToken, amount),
      quoteToken,
      TradeType.EXACT_INPUT,
      {
        recipient: web3Utils.toChecksumAddress(addressFrom),
        slippageTolerance,
        deadline: Math.floor(
          Date.now() / 1000 + settings.deadlineMins * 60,
        ),
        type: SwapType.SWAP_ROUTER_02,
      },
      { maxSplits: settings.maxHops },
    )

    if (!route) {
      throw new Error(NOT_FOUND_ROUTE_ERROR)
    }

    const slippageAdjustedAmountOut = new Fraction(1)
      .add(slippageTolerance)
      .invert()
      .multiply(route.trade.outputAmount.quotient).quotient

    const minimumAmountOut = CurrencyAmount.fromRawAmount(
      route.trade.outputAmount.currency,
      slippageAdjustedAmountOut,
    )

    /* calculating manually cause `route.trade.worstExecutionPrice()` throws an error (https://github.com/Uniswap/smart-order-router/issues/65) */
    const worstExecutionPrice = new Price(
      route.trade.inputAmount.currency,
      route.trade.outputAmount.currency,
      route.trade.inputAmount.quotient,
      minimumAmountOut.quotient,
    )

    return {
      quoteTokenAmount: route.trade.outputAmount.toFixed(),
      tradeData: route,
      swaps: route.trade.swaps[0].route.pools.map(
        (pool) => ({
          baseSymbol:
            pool.token0.symbol?.toUpperCase() ||
            pool.token0.address,
          quoteSymbol:
            pool.token1.symbol?.toUpperCase() ||
            pool.token1.address,
        }),
      ),
      price: route.trade.executionPrice.toFixed(),
      guaranteedPrice: worstExecutionPrice.toFixed(),
      fromToken: baseTokenInfo,
      toToken: quoteTokenInfo,
    }
  }

  public async swap(
    route: EstimationResult<SwapRoute>,
  ): Promise<TransactionRequestWithRecipient> {
    return {
      data: route.tradeData.methodParameters?.calldata,
      to: this.contractAddresses.v3SwapRouterAddress,
      value: route.tradeData.methodParameters?.value,
      gasLimit: Math.ceil(
        route.tradeData.estimatedGasUsed.toNumber() *
          ESTIMATED_GAS_COEFF,
      ),
    }
  }
}
