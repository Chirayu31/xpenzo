import { TransactionType } from '@prisma/client'

export interface category {
  id: number
  title: string
  type: TransactionType
  userId: number
  isDefault: boolean
}
