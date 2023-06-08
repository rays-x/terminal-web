import { EstimationResult } from '../../providers/interface'

export interface UseEstimationResponse {
  reload: () => unknown
  loading: boolean
  estimation?: EstimationResult<unknown>
  error?: string
}
