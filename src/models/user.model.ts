import { z } from 'zod'
import { TableEntity } from './db.model'

export const UserEntity = TableEntity.extend({
  xid: z.string(), // this is an external user friendly application wide unique id
  username: z.string(),
  email: z.string(),
  password: z.string(),
  imageUrl: z.string(),
  activatedAt: z.date().nullable(),
})

export const User = UserEntity.omit({
  password: true,
})

export const UserModel = UserEntity.omit({})

export const NewUserModel = UserEntity.omit({
  id: true,
  deletedAt: true,
  createdAt: true,
  updatedAt: true,
})

export const NewUserDto = NewUserModel.omit({
  xid: true,
})

export const EditUserModel = UserEntity.omit({
  id: true,
  deletedAt: true,
  createdAt: true,
  updatedAt: true,
}).partial()

export const EditUserDto = EditUserModel.omit({
  password: true,
  username: true,
  activatedAt: true,
})

export type IUserEntity = z.infer<typeof UserEntity>
export type IUserModel = z.infer<typeof UserModel>
export type INewUserDto = z.infer<typeof NewUserDto>
export type INewUserModel = z.infer<typeof NewUserModel>
export type IEditUserDto = z.infer<typeof EditUserDto>
export type IEditUserModel = z.infer<typeof EditUserModel>
export type IUser = z.infer<typeof User>
