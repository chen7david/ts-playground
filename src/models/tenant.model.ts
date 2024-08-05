import { z } from 'zod'
import { TableEntity } from './db.model'

export const TenantEntity = TableEntity.extend({
  name: z.string(),
  description: z.string(),
  imageUrl: z.number(),
})

export const CreateTenantDto = TenantEntity.omit({
  id: true,
  deletedAt: true,
  createdAt: true,
  updatedAt: true,
})

export const UpdateTenantDto = CreateTenantDto.partial()

export const Tenant = TenantEntity.omit({})

export type ITenant = z.infer<typeof Tenant>
export type ITenantEntity = z.infer<typeof TenantEntity>
export type ICreateTenantDto = z.infer<typeof CreateTenantDto>
export type IUpdateTenantDto = z.infer<typeof UpdateTenantDto>
