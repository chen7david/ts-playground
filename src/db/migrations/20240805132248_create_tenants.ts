import type { Knex } from 'knex'
import { TableName, TablePK } from '../../models/db.model'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TableName.Tenants, (table) => {
    table.increments(TablePK.Tenants).primary().unique()
    table.string('name').unique().notNullable()
    table.string('description').unique().notNullable()
    table.string('image_url').defaultTo(null)
    table.timestamp('deleted_at').defaultTo(null)
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TableName.Tenants)
}
