import { db } from './db/db.client'
import { IObject, TableName } from './models/db.model'
import { genNewTenantDto, genNewUserModel } from './helpers/mock.helper'
import { mapKeys, snakeCase } from 'lodash'
import { ZodObject } from 'zod'
import { NewUserModel, User, UserModel } from './models/user.model'
import { userRepository } from './repositories/user.repository'

// function getColumnMappings(ZodModel: ZodObject<any>) {
//   const keys = Object.keys(ZodModel.shape)
//   const snakeCaseKeyMap = new Map<string, string>()
//   keys.map((key) => snakeCaseKeyMap.set(key, snakeCase(key)))
//   return snakeCaseKeyMap
// }

// function getSelectString(columnMappings: Map<string, string>) {
//   const aliasSelectList = []
//   for (const [key, value] of columnMappings) {
//     aliasSelectList.push(`${value} AS ${key}`)
//   }
//   return aliasSelectList
// }

// const columnMappings = getColumnMappings(User)
// const asliasSelect = getSelectString(columnMappings)

// const tenant = genNewTenantDto()
// const user = genNewUserModel()

const main = async () => {
  const item = await userRepository.find(
    {
      limit: 2,
      includeDeleted: true,
      sortBy: [{ name: 'created_at', order: 'DESC' }],
      filterBy: [
        { name: 'username', value: 'da' },
        { name: 'email', value: 'cl' },
      ],
    },
    {
      returnModel: UserModel,
    },
  )
  console.log(item)
}
main()
