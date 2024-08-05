import { Knex, QueryBuilder } from 'knex'
import {
  TablePK,
  TableName,
  ITableEntity,
  IRepositoryConstructor,
  // IDbQueryOption,
  IObject,
  InferZodSchema,
  IDbQueryOption,
} from './../models/db.model'
import { db } from '../db/db.client'
import { snakeCase } from 'lodash'
import { ZodObject } from 'zod'

export class BaseRepository<T> {
  protected pk: TablePK
  protected tableName: TableName
  protected db: Knex = db

  constructor({ pk, tableName }: IRepositoryConstructor) {
    this.pk = pk
    this.tableName = tableName
  }

  table() {
    return this.db(this.tableName)
  }

  async trx(
    query: Knex.QueryBuilder,
    trx?: Knex.Transaction,
  ): Promise<Knex.QueryBuilder> {
    return trx ? query.transacting(trx) : query
  }

  renameKeysToSnakeCase<T extends IObject>(obj: T | T[]): T | T[] {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.renameKeysToSnakeCase(item)) as T[]
    } else if (obj !== null && typeof obj === 'object') {
      return Object.keys(obj).reduce((acc: IObject, key: string) => {
        const snakeKey = snakeCase(key)
        acc[snakeKey] = this.renameKeysToSnakeCase(obj[key])
        return acc
      }, {} as IObject) as T
    }
    return obj
  }

  getAliasedSelect(ZodModel: ZodObject<any>) {
    return Object.keys(ZodModel.shape).map(
      (key) => `${this.tableName}.${snakeCase(key)} AS ${key}`,
    )
  }

  async find() {
    const query = this.table()
  }

  async create<U extends ZodObject<any>>(
    item: Omit<T, keyof ITableEntity>,
    options?: IDbQueryOption<U>,
  ): Promise<InferZodSchema<U>> {
    const itemWithSnakeCaseKeys = this.renameKeysToSnakeCase(item)
    const query = this.table().insert(itemWithSnakeCaseKeys)

    if (options?.returnModel) {
      const aliasSelect = this.getAliasedSelect(options.returnModel)
      console.log(aliasSelect)
      query.returning(aliasSelect)
    } else {
      query.returning('*')
    }

    const [result] = await this.trx(query, options?.trx)
    return result as InferZodSchema<U>
  }
}
