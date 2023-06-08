export interface UseBalanceResponse {
  balance: string
  loading: boolean
  reload: () => unknown
  error?: string
}
