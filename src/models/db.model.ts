import { z } from 'zod'

export enum TableName {
  Users = 'users',
  Tenants = 'tenants',
  TenantUsers = 'tenant-users',
}

export enum TablePK {
  Users = 'id',
  Tenants = 'id',
  TenantUsers = 'id',
}

export enum TableFK {
  Users = 'user_id',
  Tenants = 'tenant_id',
}

export const TableEntity = z.object({
  id: z.number(),
  deletedAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type ITableEntity = z.infer<typeof TableEntity>
