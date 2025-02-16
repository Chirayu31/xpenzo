import { TransactionType } from '@prisma/client'
import { category } from './category'

export interface Transaction {
  id: number
  groupId: number | null
  description: string
  type: TransactionType
  amount: number
  createdById: number
  categoryId: number
  category: category
  createdAt: Date
  updatedAt: Date
}
