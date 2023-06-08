import { useEffect, useState } from 'react'

import {
  AvailableTokens,
  ExchangeProvider,
} from '../../providers/interface'

export default function useAvailableTokens(
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
