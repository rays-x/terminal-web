import { Currency, Token } from '@pancakeswap/swap-sdk-core'
import {
  bscTestnetTokens,
  bscTokens,
  BUSD,
  USDC,
  USDT,
  WBTC_ETH,
} from '@pancakeswap/tokens'
import { ChainId, Pair, WNATIVE } from '@pancakeswap/sdk'

// https://github.com/pancakeswap/pancake-frontend/blob/e62ac8796a3f08db7132e32c76413c26ac3171a0/apps/web/src/config/constants/exchange.ts#L20
const BASES_TO_CHECK_TRADES_AGAINST = {
  [ChainId.ETHEREUM]: [
    WNATIVE[ChainId.ETHEREUM],
    USDC[ChainId.ETHEREUM],
    USDT[ChainId.ETHEREUM],
    WBTC_ETH,
  ],
  [ChainId.GOERLI]: [
    WNATIVE[ChainId.GOERLI],
    USDC[ChainId.GOERLI],
    BUSD[ChainId.GOERLI],
  ],
  [ChainId.BSC]: [
    bscTokens.wbnb,
    bscTokens.cake,
    bscTokens.busd,
    bscTokens.usdt,
    bscTokens.btcb,
    bscTokens.eth,
    bscTokens.usdc,
  ],
  [ChainId.BSC_TESTNET]: [
    bscTestnetTokens.wbnb,
    bscTestnetTokens.cake,
    bscTestnetTokens.busd,
  ],
}

// https://github.com/pancakeswap/pancake-frontend/blob/e62ac8796a3f08db7132e32c76413c26ac3171a0/packages/smart-router/evm/constants/exchange.ts#L47
const ADDITIONAL_BASES: {
  [chainId in ChainId]?: { [tokenAddress: string]: Token[] }
} = {
  [ChainId.BSC]: {
    // SNFTS-SFUND
    [bscTokens.snfts.address]: [bscTokens.sfund],

    [bscTokens.ankr.address]: [bscTokens.ankrbnb],
    [bscTokens.ankrbnb.address]: [
      bscTokens.ankrETH,
      bscTokens.ankr,
    ],
    [bscTokens.ankrETH.address]: [bscTokens.ankrbnb],

    // REVV - EDU
    [bscTokens.revv.address]: [bscTokens.edu],
    [bscTokens.edu.address]: [bscTokens.revv],
    // unshETH - USH
    [bscTokens.unshETH.address]: [bscTokens.ush],
    [bscTokens.ush.address]: [bscTokens.unshETH],
  },
}

// https://github.com/pancakeswap/pancake-frontend/blob/e62ac8796a3f08db7132e32c76413c26ac3171a0/apps/web/src/config/constants/exchange.ts#L51
const CUSTOM_BASES: {
  [chainId in ChainId]?: { [tokenAddress: string]: Token[] }
} = {
  [ChainId.BSC]: {
    [bscTokens.axlusdc.address]: [bscTokens.usdt],
  },
}

export function getAllCommonPairs(
  currencyA?: Currency,
  currencyB?: Currency,
): Pair[] {
  const chainId = currencyA?.chainId as ChainId

  const [tokenA, tokenB] = chainId
    ? [currencyA?.wrapped, currencyB?.wrapped]
    : [undefined, undefined]

  if (!chainId) return []

  const common =
    BASES_TO_CHECK_TRADES_AGAINST[chainId] ?? []
  const additionalA = tokenA
    ? ADDITIONAL_BASES[chainId]?.[tokenA.address] ?? []
    : []
  const additionalB = tokenB
    ? ADDITIONAL_BASES[chainId]?.[tokenB.address] ?? []
    : []

  const bases = [...common, ...additionalA, ...additionalB]

  const basePairs: [Token, Token][] = bases.flatMap(
    (base): [Token, Token][] =>
      bases.map((otherBase) => [base, otherBase]),
  )

  const allPairCombinations: [Token, Token][] =
    tokenA && tokenB
      ? [
          // the direct pair
          [tokenA, tokenB],
          // token A against all bases
          ...bases.map((base): [Token, Token] => [
            tokenA,
            base,
          ]),
          // token B against all bases
          ...bases.map((base): [Token, Token] => [
            tokenB,
            base,
          ]),
          // each base against all bases
          ...basePairs,
        ]
          .filter((tokens): tokens is [Token, Token] =>
            Boolean(tokens[0] && tokens[1]),
          )
          .filter(([t0, t1]) => t0.address !== t1.address)
          .filter(([tokenA_, tokenB_]) => {
            if (!chainId) return true
            const customBases = CUSTOM_BASES[chainId]

            const customBasesA: Token[] | undefined =
              customBases?.[tokenA_.address]
            const customBasesB: Token[] | undefined =
              customBases?.[tokenB_.address]

            if (!customBasesA && !customBasesB) return true

            if (
              customBasesA &&
              !customBasesA.find((base) =>
                tokenB_.equals(base),
              )
            )
              return false
            if (
              customBasesB &&
              !customBasesB.find((base) =>
                tokenA_.equals(base),
              )
            )
              return false

            return true
          })
      : []

  const allPairs = usePairs(allPairCombinations)

  // only pass along valid pairs, non-duplicated pairs
  return Object.values(
    allPairs
      // filter out invalid pairs
      .filter(
        (result): result is [PairState.EXISTS, Pair] =>
          Boolean(
            result[0] === PairState.EXISTS && result[1],
          ),
      )
      // filter out duplicated pairs
      .reduce<{ [pairAddress: string]: Pair }>(
        (memo, [, curr]) => {
          memo[curr.liquidityToken.address] =
            memo[curr.liquidityToken.address] ?? curr
          return memo
        },
        {},
      ),
  )
}
