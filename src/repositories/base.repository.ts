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
import {
  defaultQueryParamFilter,
  IQueryParamFilter,
} from '../models/filter.model'

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

  buildFilterQuery(query: Knex.QueryBuilder, filter: IQueryParamFilter) {
    if (!filter) return query
    if (!filter.includeDeleted) query.whereNull('deleted_at')
    filter?.sortBy?.map(({ name, order }) => query.orderBy(name, order))
    filter?.limit
      ? query.limit(filter.limit)
      : query.limit(defaultQueryParamFilter.limit)
    return query
  }

  async find<U extends ZodObject<any>>(
    filter?: IQueryParamFilter,
    options?: IDbQueryOption<U>,
  ): Promise<InferZodSchema<U>[]> {
    const query = this.table()
    if (options?.returnModel) {
      const aliasSelect = this.getAliasedSelect(options.returnModel)
      query.select(aliasSelect)
    }
    if (filter) this.buildFilterQuery(query, filter)
    const result = await this.trx(query, options?.trx)
    return result
  }

  async findOneByPK<U extends ZodObject<any>>(
    id: number,
    options?: IDbQueryOption<U>,
  ): Promise<InferZodSchema<U> | undefined> {
    const query = this.table().where(this.pk, id).first()
    if (options?.returnModel) {
      const aliasSelect = this.getAliasedSelect(options.returnModel)
      query.select(aliasSelect)
    }
    const result = await this.trx(query, options?.trx)
    return result
  }

  async create<U extends ZodObject<any>>(
    item: Omit<T, keyof ITableEntity>,
    options?: IDbQueryOption<U>,
  ): Promise<InferZodSchema<U>> {
    const itemWithSnakeCaseKeys = this.renameKeysToSnakeCase(item)
    const query = this.table().insert(itemWithSnakeCaseKeys)

    if (options?.returnModel) {
      const aliasSelect = this.getAliasedSelect(options.returnModel)
      query.returning(aliasSelect)
    } else {
      query.returning('*')
    }

    const [result] = await this.trx(query, options?.trx)
    return result as InferZodSchema<U>
  }

  async updateOneByPK<U extends ZodObject<any>>(
    id: number,
    partialItem: Partial<T>,
    options?: IDbQueryOption<U>,
  ): Promise<InferZodSchema<U> | undefined> {
    const partialItemWithSnakeCaseKeys = this.renameKeysToSnakeCase(partialItem)
    const query = this.table()
      .update(partialItemWithSnakeCaseKeys)
      .where(this.pk, id)
    // .first()
    if (options?.returnModel) {
      const aliasSelect = this.getAliasedSelect(options.returnModel)
      query.returning(aliasSelect)
    }
    const [result] = await this.trx(query, options?.trx)
    return result
  }
}
