import { TransactionType } from '@prisma/client'
import { z } from 'zod'

export const AddCategoryModalSchema = z.object({
  title: z
    .string({ message: 'Name is required' })
    .max(50, { message: 'Name must be less than 50 characters' }),
  type: z.enum([TransactionType.EXPENSE, TransactionType.INCOME], {
    message: 'Type must be either income or expense',
  }),
})
