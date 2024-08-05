import { faker } from '@faker-js/faker'
import { INewUserDto, INewUserModel } from '../models/user.model'
import { ICreateTenantDto } from '../models/tenant.model'

export const genNewUserModel = (
  params?: Partial<INewUserModel>,
): INewUserModel => ({
  xid: faker.string.uuid(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  imageUrl: faker.image.avatar(),
  password: faker.internet.password(),
  activatedAt: null,
  ...params,
})

export const genNewUserDto = (params?: Partial<INewUserDto>) => ({
  username: faker.internet.userName(),
  email: faker.internet.email(),
  imageUrl: faker.image.avatar(),
  password: faker.internet.password(),
  ...params,
})

export const genNewTenantDto = (params?: Partial<ICreateTenantDto>) => ({
  name: faker.company.name(),
  description: faker.lorem.paragraph(),
  imageUrl: faker.image.avatar(),
  ...params,
})
