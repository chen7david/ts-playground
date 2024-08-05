import { TablePK, TableName } from '../models/db.model'
import { IUserEntity } from '../models/user.model'
import { BaseRepository } from './base.repository'

export class UserRepository extends BaseRepository<IUserEntity> {
  constructor() {
    super({
      tableName: TableName.Users,
      pk: TablePK.Users,
    })
  }
}

export const userRepository = new UserRepository()
