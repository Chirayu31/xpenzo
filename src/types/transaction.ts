import { TransactionType } from '@prisma/client'

export interface Transaction {
  id: number
  groupId: number | null
  description: string
  type: TransactionType
  amount: number
  createdById: number
  categoryId: number
  createdAt: Date
  updatedAt: Date
}
