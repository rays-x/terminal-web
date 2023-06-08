import { useEffect, useState } from 'react'

import {
  AvailableTokens,
  ExchangeProvider,
} from '../../providers/interface'

import { UseAvailableTokensResponse } from './types'

export default function useAvailableTokens(
  exchangeProvider?: ExchangeProvider<unknown>,
): UseAvailableTokensResponse {
  const [error, setError] = useState<string | undefined>()

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
        setError(undefined)
      })
      .catch((err) => setError(err?.message || err))
      .finally(() => setLoading(false))
  }, [exchangeProvider])

  return { availableTokens, loading, error }
}
