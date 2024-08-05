import dotenv from 'dotenv'
import { Knex } from 'knex'
import { resolve } from 'path'

export enum Environments {
  Development = 'development',
  Test = 'test',
  Production = 'production',
}

const env = process.env.NODE_ENV || 'production'
dotenv.config({ path: resolve(__dirname, `../.env.${env}`) })

export type IAppConfig = {
  port: string
  env: string
}

export type IMailConfig = {
  user: string
  pass: string
}

export type IJwtConfig = {
  secret: string
  algorithm: string
  expiresIn: string
  refreshSecret: string
  refreshExpiresIn: string
}

export const appConfig: IAppConfig = {
  port: process.env.APP_PORT as string,
  env: process.env.NODE_ENV as Environments,
}

export const JwtConfig: IJwtConfig = {
  algorithm: process.env.JWT_ALGORITHM as string,
  secret: process.env.JWT_SECRET as string,
  expiresIn: process.env.JWT_EXPIRES_IN as string,
  refreshSecret: process.env.JWT_REFRESH_SECRET as string,
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN as string,
}

export const dbConnection: Knex.PgConnectionConfig = {
  host: process.env.DB_HOST as string,
  port: parseInt(`${process.env.DB_PORT}`),
  database: process.env.DB_NAME as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
}

export const dbConfig: Knex.Config = {
  client: 'pg',
  connection: dbConnection,
  migrations: {
    tableName: 'knex_migrations',
    directory: 'migrations',
  },
}

export const mailConfig: IMailConfig = {
  user: process.env.MAIL_USER as string,
  pass: process.env.MAIL_PASS as string,
}
