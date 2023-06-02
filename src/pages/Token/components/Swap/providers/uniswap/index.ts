/* eslint-disable class-methods-use-this */
import web3Utils from 'web3-utils'

import {
  Percent,
  Token,
  TradeType,
} from '@uniswap/sdk-core'
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json' assert { type: 'json' }
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json' assert { type: 'json' }

import {
  BigNumberish,
  BigNumber as EthersBN,
  ethers,
} from 'ethers'

import BigNumber from 'bignumber.js'

import {
  AvailableTokens,
  EstimationResult,
  ExchangeInfo,
  ExchangeProvider,
  TokenInfo,
  TransactionRequestWithRecipient,
} from '../interface'

import {
  ERC20_ABI,
  GAS_LIMIT,
  MAX_FEE_PER_GAS,
  MAX_PRIORITY_FEE_PER_GAS,
} from './constants'

import {
  AlphaRouter,
  CurrencyAmount,
  SwapOptionsSwapRouter02,
  SwapType,
} from '@uniswap/smart-order-router'

import { ContractAddresses, NetworkParams } from './types'

import { QUERY_TOKENS_UNISWAP } from '../../../../../../graphql/queries/uniswap3/tokens'
import {
  TokensUniswapQuery,
  TokensUniswapQueryVariables,
} from '../../../../../../graphql/generated/schema-uniswap'
import { clientUniswap } from '../../../../../../graphql/clients/client-uniswap'
import {
  FeeAmount,
  computePoolAddress,
} from '@uniswap/v3-sdk'

export default class UniswapV3ExchangeProvider
  implements ExchangeProvider
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
      name: 'Uniswap V3',
      logoURI: 'https://uniswap.org/favicon.ico',
    }
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

  public async getAvailableTokens(): Promise<AvailableTokens> {
    const res = await clientUniswap.query<
      TokensUniswapQuery,
      TokensUniswapQueryVariables
    >({
      query: QUERY_TOKENS_UNISWAP,
    })

    return {
      tokens: res.data.tokens.map((token) => ({
        id: token.id,
        name: token.name,
        symbol: token.symbol,
        address: token.id,
        decimals: Number.parseInt(token.decimals, 10),
        logoURI: `https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/${web3Utils.toChecksumAddress(
          token.id,
        )}/logo.png`,
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
      Quoter.abi,
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
      factoryAddress:
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

    console.log({ currentPoolAddress })

    const quotedAmountOut =
      // @ts-ignore
      (await quoterContract.callStatic.quoteExactInputSingle(
        await poolContract.token0(),
        await poolContract.token1(),
        await poolContract.fee(),
        new BigNumber(baseTokenAmount)
          .shiftedBy(baseTokenInfo.decimals)
          .toFixed(),
        0,
      )) as EthersBN

    return {
      quoteTokenAmount: new BigNumber(
        quotedAmountOut.toString(),
      )
        .shiftedBy(-quoteTokenInfo.decimals)
        .toString(),
    }
  }

  public async prepareSwap(
    baseTokenInfo: TokenInfo,
    baseTokenAmount: string,
    addressFrom: string,
  ): Promise<TransactionRequestWithRecipient> {
    const tokenContract = new ethers.Contract(
      web3Utils.toChecksumAddress(baseTokenInfo.address),
      ERC20_ABI,
      this.provider,
    )

    const amount = new BigNumber(baseTokenAmount)
      .shiftedBy(baseTokenInfo.decimals)
      .toFixed()

    const apprTx =
      await tokenContract.populateTransaction.approve(
        this.contractAddresses.v3SwapRouterAddress,
        amount,
      )

    if (!apprTx.to) {
      throw new Error('Failed to prepare swap')
    }

    return { ...apprTx, to: apprTx.to, from: addressFrom }
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

    const router = new AlphaRouter({
      chainId: this.chainId,
      provider: this.provider,
    })

    const options: SwapOptionsSwapRouter02 = {
      recipient: web3Utils.toChecksumAddress(addressFrom),
      slippageTolerance: new Percent(50, 10_000),
      deadline: Math.floor(Date.now() / 1000 + 1800),
      type: SwapType.SWAP_ROUTER_02,
    }

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

    const route = await router.route(
      CurrencyAmount.fromRawAmount(baseToken, amount),
      quoteToken,
      TradeType.EXACT_INPUT,
      options,
    )

    if (!route) {
      throw new Error('Route not found')
    }

    return {
      data: route.methodParameters?.calldata,
      to: this.contractAddresses.v3SwapRouterAddress,
      value: route?.methodParameters?.value,
      from: addressFrom,
      maxFeePerGas: MAX_FEE_PER_GAS,
      maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
      gasLimit: GAS_LIMIT,
    }
  }
}
