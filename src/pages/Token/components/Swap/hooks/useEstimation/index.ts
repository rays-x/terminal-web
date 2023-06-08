import { useCallback, useEffect, useState } from 'react'
import {
  EstimationResult,
  ExchangeProvider,
} from '../../providers/interface'
import { ExchangePair } from '../../types'
import { SwapSettings } from '../../components/settings/types'

const DEBOUNCE_TIMEOUT = 1200

export default function useEstimation(
  pair: ExchangePair,
  amountFrom: string,
  addressFrom: string,
  settings: SwapSettings,
  exchangeProvider?: ExchangeProvider<unknown>,
) {
  const [error, setError] = useState<string>('')

  const [estimation, setEstimation] = useState<
    EstimationResult<unknown> | undefined
  >()

  const [loading, setLoading] = useState<boolean>(false)

  const reload = useCallback(() => {
    setLoading(true)

    const delayDebounceFn = setTimeout(() => {
      if (
        !pair.from ||
        !pair.to ||
        !exchangeProvider ||
        !Number.parseFloat(amountFrom)
      ) {
        setLoading(false)
        return
      }

      exchangeProvider
        .estimate(
          pair.from,
          pair.to,
          amountFrom,
          addressFrom,
          settings,
        )
        .then((estimation) => {
          setEstimation(estimation)
          setError('')
        })
        .catch((err) => {
          setEstimation(undefined)
          setError(err?.message || '')
        })
        .finally(() => {
          setLoading(false)
        })
    }, DEBOUNCE_TIMEOUT)

    return () => {
      clearTimeout(delayDebounceFn)
      setLoading(false)
    }
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
