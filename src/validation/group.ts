import { UpdateGroupMemberOperation } from '@/utils/constants'
import { z } from 'zod'

export const AddGroupSchema = z.object({
  userIds: z
    .array(z.number({ message: 'Invalid Data' }))
    .max(7, { message: 'At max 7 users can be added' }),
  name: z
    .string()
    .min(3, { message: 'Name should be atleast 3 characters' })
    .max(50, { message: 'Name should be atmost 50 characters' }),
})

export const UpdateGroupMemberSchema = z.object({
  userId: z.number({ message: 'Invalid Data' }),
  operation: z.nativeEnum(UpdateGroupMemberOperation),
})
