import { useEffect, useState } from 'react'

import {
  EstimationResult,
  ExchangeProvider,
  TransactionRequestWithRecipient,
} from '../../providers/interface'

import { SwapSettings } from '../../components/settings/types'

const STEPS = ['prepareSwap', 'swap'] as const

export default function useSteps(
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
