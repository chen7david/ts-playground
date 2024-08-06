import { z } from 'zod'

export const TableEntity = z.object({
  id: z.number(),
  deletedAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const {{ModelName}}Entity = TableEntity.extend({
  xid: z.string(), // this is an external user friendly application wide unique id
  username: z.string(),
  email: z.string(),
  password: z.string(),
  imageUrl: z.string(),
  activatedAt: z.date().nullable(),
})

export const {{ModelName}} = {{ModelName}}Entity.omit({
  password: true,
})

export const {{ModelName}}Model = {{ModelName}}Entity.omit({})

export const New{{ModelName}}Model = {{ModelName}}Entity.omit({
  id: true,
  deletedAt: true,
  createdAt: true,
  updatedAt: true,
})

export const New{{ModelName}}Dto = New{{ModelName}}Model.omit({
  xid: true,
})

export const Edit{{ModelName}}Model = {{ModelName}}Entity.omit({
  id: true,
  deletedAt: true,
  createdAt: true,
  updatedAt: true,
}).partial()

export const Edit{{ModelName}}Dto = Edit{{ModelName}}Model.omit({
  password: true,
  username: true,
  activatedAt: true,
})

export type I{{ModelName}}Entity = z.infer<typeof {{ModelName}}Entity>
export type I{{ModelName}}Model = z.infer<typeof {{ModelName}}Model>
export type INew{{ModelName}}Dto = z.infer<typeof New{{ModelName}}Dto>
export type INew{{ModelName}}Model = z.infer<typeof New{{ModelName}}Model>
export type IEdit{{ModelName}}Dto = z.infer<typeof Edit{{ModelName}}Dto>
export type IEdit{{ModelName}}Model = z.infer<typeof Edit{{ModelName}}Model>
export type I{{ModelName}} = z.infer<typeof {{ModelName}}>
