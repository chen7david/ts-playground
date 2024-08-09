import { defineConfig } from 'kysely-ctl'
import { db } from './src/db/index'
import path from 'path'
export default defineConfig({
  kysely: db,
  migrations: {
    migrationFolder: path.join('src', 'db', 'migrations'),
  },
  seeds: {
    seedFolder: 'seeds',
  },
})
