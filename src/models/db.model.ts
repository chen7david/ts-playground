import { Knex } from 'knex'
import { z, ZodObject } from 'zod'

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

export type IRepositoryConstructor = {
  pk: TablePK
  tableName: TableName
}

export type IDbQueryOption<T extends ZodObject<any> = ZodObject<any>> = {
  returnModel?: T
  trx?: Knex.Transaction
  includeDeleted?: boolean
}

export type IObject = { [key: string]: any }
export type InferZodSchema<T extends ZodObject<any>> = z.infer<T>
