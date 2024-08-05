import { db } from './db/db.client'
import { IObject, TableName } from './models/db.model'
import { genNewTenantDto, genNewUserModel } from './helpers/mock.helper'
import { mapKeys, snakeCase } from 'lodash'
import { ZodObject } from 'zod'
import { NewUserModel, User, UserModel } from './models/user.model'
import { userRepository } from './repositories/user.repository'

function renameKeysToSnakeCase<T extends IObject>(obj: T | T[]): T | T[] {
  if (Array.isArray(obj)) {
    return obj.map((item) => renameKeysToSnakeCase(item)) as T[]
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc: IObject, key: string) => {
      const snakeKey = snakeCase(key)
      acc[snakeKey] = renameKeysToSnakeCase(obj[key])
      return acc
    }, {} as IObject) as T
  }
  return obj
}

function getColumnMappings(ZodModel: ZodObject<any>) {
  const keys = Object.keys(ZodModel.shape)
  const snakeCaseKeyMap = new Map<string, string>()
  keys.map((key) => snakeCaseKeyMap.set(key, snakeCase(key)))
  return snakeCaseKeyMap
}

function getSelectString(columnMappings: Map<string, string>) {
  const aliasSelectList = []
  for (const [key, value] of columnMappings) {
    aliasSelectList.push(`${value} AS ${key}`)
  }
  return aliasSelectList
}

const columnMappings = getColumnMappings(User)
const asliasSelect = getSelectString(columnMappings)

const tenant = genNewTenantDto()
const user = genNewUserModel()

const main = async () => {
  const item = await userRepository.create(user, {
    // returnModel: ['id', 'username as coolname'],
    returnModel: NewUserModel,
  })
  console.log(item)
}
main()
