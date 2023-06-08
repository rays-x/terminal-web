import { TransactionRequestWithRecipient } from '../../providers/interface'

export interface UseStepsResponse {
  loading: boolean
  txBody?: TransactionRequestWithRecipient
  error?: string
}
