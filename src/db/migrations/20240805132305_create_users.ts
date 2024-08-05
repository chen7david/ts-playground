import type { Knex } from 'knex'
import { TableName, TablePK } from '../../models/db.model'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TableName.Users, (table) => {
    table.increments(TablePK.Users).primary().unique()
    table.string('xid').unique().notNullable()
    table.string('username').unique().notNullable()
    table.string('email').notNullable()
    table.string('password').notNullable()
    table.string('image_url').defaultTo(null)
    table.timestamp('activated_at').defaultTo(null)
    table.timestamp('deleted_at').defaultTo(null)
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TableName.Users)
}
