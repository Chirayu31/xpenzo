import { TransactionType } from '@prisma/client'
import { z } from 'zod'

export const AddTransactionModalSchema = z.object({
  description: z
    .string()
    .min(1, { message: ' Description is required ' })
    .max(50, { message: 'Description must be less than 50 characters' }),
  type: z
    .nativeEnum(TransactionType, {
      message: 'Type must be either income or expense',
    })
    .optional(),
  amount: z.coerce
    .number({ message: 'Amount must be a valid number' })
    .min(0.01, { message: 'Please Enter Amount' })
    .positive({ message: 'Amount must be a positive number' })
    .max(1000000, { message: 'Amount must be less than 1000000' }),
  group_id: z.coerce.number().default(0).optional(),
  category_id: z.coerce.number({ message: 'Please Select a Category' }),
  date: z.coerce.date().optional(),
})

const splitSchema = z.object({
  amount: z.number().positive(),
  userId: z.number().int().positive(),
})

export const AddSplitsSchema = z.object({
  splits: z.array(splitSchema),
})

export const UpdateSplitsSchema = z.object({
  splits: z.array(splitSchema).nonempty(),
})
