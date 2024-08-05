import { z } from 'zod'

export const TenantUsersEntity = z.object({
  userId: z.number(),
  tenantId: z.number(),
  deletedAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
