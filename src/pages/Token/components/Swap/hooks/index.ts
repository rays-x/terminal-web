import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  AvailableTokens,
  EstimationResult,
  ExchangeProvider,
  TokenInfo,
  TransactionRequestWithRecipient,
} from '../providers/interface'
import { TokensState } from '../types'
import { SwapSettings } from '../components/Settings/types'

const DEBOUNCE_TIMEOUT = 1500

const STEPS = ['prepareSwap', 'swap'] as const

const INIT_AMOUNT = '0.00'

export function useSteps(
  step: number,
  settings: SwapSettings,
  exchangeProvider?: ExchangeProvider<unknown>,
  estimationResult?: EstimationResult<unknown>,
  addressFrom?: string,
) {
  const [error, setError] = useState<string>('')

  const [txBody, setTxBody] = useState<
    TransactionRequestWithRecipient | undefined
  >()

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (
      !exchangeProvider ||
      !estimationResult ||
      !addressFrom ||
      !STEPS[step]
    ) {
      return
    }

    setLoading(true)

    exchangeProvider[STEPS[step]](
      estimationResult,
      addressFrom,
      settings,
    )
      .then((body) => {
        setTxBody(body)
        setError('')
      })
      .catch((err) => setError(err?.message || ''))
      .finally(() => setLoading(false))
  }, [settings, estimationResult, step])

  return { txBody, loading, error }
}

export function useBalance(
  exchangeProvider?: ExchangeProvider<unknown>,
  token?: TokenInfo,
  address?: string,
) {
  const [balance, setBalance] =
    useState<string>(INIT_AMOUNT)

  const [loading, setLoading] = useState<boolean>(false)

  const reload = useCallback(() => {
    if (!exchangeProvider || !token || !address) {
      return
    }

    setLoading(true)

    exchangeProvider
      .getErc20TokenBalance(token, address)
      .then((balance) =>
        setBalance(+balance ? balance : INIT_AMOUNT),
      )
      .catch(() => setBalance(''))
      .finally(() => setLoading(false))
  }, [exchangeProvider, token, address])

  useEffect(reload, [exchangeProvider, token, address])

  return { balance, loading, reload }
}

export function useAvailableTokens(
  exchangeProvider?: ExchangeProvider<unknown>,
) {
  const [error, setError] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)

  const [availableTokens, setAvailableTokens] =
    useState<AvailableTokens>()

  useEffect(() => {
    if (!exchangeProvider) {
      return
    }

    setLoading(true)

    exchangeProvider
      .getAvailableTokens()
      .then((tokens) => {
        setAvailableTokens(tokens)
        setError('')
      })
      .catch((err) => setError(err?.message || err))
      .finally(() => setLoading(false))
  }, [exchangeProvider])

  return { availableTokens, loading, error }
}

export function useEstimation(
  pair: TokensState,
  amountFrom: string,
  settings: SwapSettings,
  exchangeProvider?: ExchangeProvider<unknown>,
) {
  const [error, setError] = useState<string>('')

  const [estimation, setEstimation] =
    useState<EstimationResult<unknown>>()

  const [loading, setLoading] = useState<boolean>(false)

  const reload = useCallback(() => {
    const delayDebounceFn = setTimeout(() => {
      if (
        !pair.from ||
        !pair.to ||
        !exchangeProvider ||
        !Number.parseFloat(amountFrom)
      ) {
        return
      }

      setLoading(true)

      exchangeProvider
        .estimate(pair.from, pair.to, amountFrom, settings)
        .then((estimation) => {
          setEstimation(estimation)
          setError('')
        })
        .catch((err) => {
          setError(err?.message || '')
        })
        .finally(() => {
          setLoading(false)
        })
    }, DEBOUNCE_TIMEOUT)

    return () => clearTimeout(delayDebounceFn)
  }, [
    settings,
    exchangeProvider,
    amountFrom,
    pair.from?.address,
    pair.to?.address,
  ])

  useEffect(reload, [
    settings,
    exchangeProvider,
    amountFrom,
    pair.from?.address,
    pair.to?.address,
  ])

  return {
    estimation,
    error,
    loading,
    reload,
  }
}
