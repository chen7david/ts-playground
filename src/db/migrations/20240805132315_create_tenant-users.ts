import type { Knex } from 'knex'
import { TableFK, TableName, TablePK } from '../../models/db.model'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TableName.TenantUsers, (table) => {
    table.integer('balance').notNullable().defaultTo(0)
    table
      .integer(TableFK.Tenants)
      .references(TablePK.Tenants)
      .inTable(TableName.Tenants)
      .index()
      .nullable()
    table
      .integer(TableFK.Users)
      .references(TablePK.Users)
      .inTable(TableName.Users)
      .index()
      .nullable()
    table.timestamp('deleted_at').defaultTo(null)
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TableName.TenantUsers)
}
