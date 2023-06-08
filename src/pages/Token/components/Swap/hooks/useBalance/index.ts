import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  ExchangeProvider,
  TokenInfo,
} from '../../providers/interface'
import BigNumber from 'bignumber.js'

const INIT_AMOUNT = '0.00'

export default function useBalance(
  amountFrom: string,
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

  const error = useMemo(
    () =>
      new BigNumber(amountFrom).gt(balance)
        ? 'Not enough funds.'
        : undefined,
    [amountFrom, balance],
  )

  return { balance, loading, reload, error }
}
