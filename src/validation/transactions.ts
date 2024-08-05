import { z } from 'zod'

export const AddTransactionModalSchema = z.object({
  description: z
    .string({ message: ' Description is required ' })
    .max(50, { message: 'Description must be less than 50 characters' }),
  type: z.enum(['income', 'expense'], {
    message: 'Type must be either income or expense',
  }),
  amount: z.coerce
    .number({ message: 'Amount must be a valid number' })
    .positive({ message: 'Amount must be a positive number' })
    .max(1000000, { message: 'Amount must be less than 1000000' }),
  group_id: z.coerce.number().default(0).optional(),
  category_id: z.coerce.number().optional().default(1),
})
