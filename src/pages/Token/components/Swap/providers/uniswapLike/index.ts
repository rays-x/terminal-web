import BigNumber from 'bignumber.js'

import web3Utils from 'web3-utils'

import { BigNumberish, ethers } from 'ethers'

import {
  ContractAddresses,
  NetworkParams,
  PrepareSwapOptions,
} from './types'

import { ERC20_ABI } from '../constants'

import {
  EstimationResult,
  TokenInfo,
  TransactionRequestWithRecipient,
} from '../interface'

export default class BaseUniswapLike {
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

  public async prepareSwap(
    estimationResult: EstimationResult<PrepareSwapOptions>,
    addressFrom: string,
  ): Promise<TransactionRequestWithRecipient> {
    const tokenContract = new ethers.Contract(
      web3Utils.toChecksumAddress(
        estimationResult.fromToken.address,
      ),
      ERC20_ABI,
      this.provider,
    )

    const apprTx =
      await tokenContract.populateTransaction.approve(
        this.contractAddresses.v3SwapRouterAddress,
        new BigNumber(
          estimationResult.tradeData.trade.inputAmount.toFixed(),
        )
          .shiftedBy(estimationResult.fromToken.decimals)
          .toFixed(),
      )

    if (!apprTx.to) {
      throw new Error('Failed to prepare swap')
    }

    return { ...apprTx, to: apprTx.to, from: addressFrom }
  }
}
