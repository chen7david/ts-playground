import { Kysely, PostgresDialect, CamelCasePlugin } from 'kysely'
import { DB } from 'kysely-codegen'
import { Pool } from 'pg'

// Create a Kysely instance
export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      // host: '192.168.1.80',
      host: 'localhost',
      // database: 'sandbox',
      database: 'test',
      user: 'admin',
      password: 'bGCk6DaX87qMcxhUZ2yDRU7',
      // connectionString: process.env.DATABASE_URL,
    }),
  }),
  plugins: [new CamelCasePlugin()],
})
