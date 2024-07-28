import knex from 'knex'
import config from './knexfile'

const environment = process.env.NODE_ENV || 'development'
const connectionConfig = config[environment]
console.log('Using environment:', connectionConfig)

export const db = knex(connectionConfig)
