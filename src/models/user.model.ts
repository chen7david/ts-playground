import { z } from 'zod'
import { TableEntity } from './db.model'

export const UserEntity = TableEntity.extend({
  xid: z.string(), // this is an external user friendly application wide unique id
  username: z.string(),
  email: z.string(),
  password: z.string(),
  imageUrl: z.string(),
  activatedAt: z.date(),
})

export const CreateUserDto = UserEntity.omit({
  id: true,
  xid: true,
  activatedAt: true,
  deletedAt: true,
  createdAt: true,
  updatedAt: true,
})

export const UpdateUserDto = CreateUserDto.omit({ password: true }).partial()

export const User = UserEntity.omit({
  password: true,
})

export type IUser = z.infer<typeof User>
export type IUserEntity = z.infer<typeof UserEntity>
export type ICreateUserDto = z.infer<typeof CreateUserDto>
export type IUpdateUserDto = z.infer<typeof UpdateUserDto>
