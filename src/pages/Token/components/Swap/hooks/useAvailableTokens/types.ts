import { AvailableTokens } from '../../providers/interface'

export interface UseAvailableTokensResponse {
  loading: boolean
  availableTokens?: AvailableTokens
  error?: string
}
