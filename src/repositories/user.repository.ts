import { Knex } from 'knex'
import { TablePK, TableName } from '../models/db.model'
import { IUserEntity } from '../models/user.model'
import { BaseRepository } from './base.repository'
import { IQueryParamFilter } from '../models/filter.model'

export class UserRepository extends BaseRepository<IUserEntity> {
  constructor() {
    super({
      tableName: TableName.Users,
      pk: TablePK.Users,
    })
  }

  buildFilterQuery(query: Knex.QueryBuilder, filter: IQueryParamFilter) {
    filter?.filterBy?.map(({ name, value }) =>
      query.where(name, 'ilike', `%${value}%`),
    )
    return super.buildFilterQuery(query, filter)
  }
}

export const userRepository = new UserRepository()
