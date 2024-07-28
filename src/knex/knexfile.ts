import type { Knex } from 'knex'

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      host: '192.168.1.80',
      user: 'root',
      password: 'password',
      database: 'engtelligent-legacy',
    },
  },

  production: {
    client: 'mysql2',
    connection: {
      host: 'your_production_host',
      user: 'your_database_user',
      password: 'your_database_password',
      database: 'your_database_name',
    },
  },
}

export default config
