import { z } from 'zod'

export const CreateSettlementSchema = z.object({
  payerId: z.number().int().positive(),
  payeeId: z.number().int().positive(),
  amount: z.number().positive(),
  groupId: z.number().int().positive(),
})
