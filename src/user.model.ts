import { z } from 'zod'

export const UserEntity = z.object({
  id: z.number(),
  xid: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
})

export type IUserEntity = z.infer<typeof UserEntity>
