import knex from 'knex'
import { dbConfig } from '../config'

export const db = knex(dbConfig)
