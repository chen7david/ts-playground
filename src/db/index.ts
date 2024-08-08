import { Kysely, PostgresDialect, CamelCasePlugin } from 'kysely'
import { DB } from 'kysely-codegen'
import { Pool } from 'pg'

// Create a Kysely instance
const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: '192.168.1.80',
      database: 'sandbox',
      user: 'admin',
      password: 'bGCk6DaX87qMcxhUZ2yDRU7',
    }),
  }),
  plugins: [new CamelCasePlugin()],
})

export default db
