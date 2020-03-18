'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddTypeToRafflesSchema extends Schema {
  up() {
    this.table('raffles', table => {
      table
        .integer('type_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('types')
        .onDelete('cascade')
    })
  }

  down() {
    this.table('raffles', table => {
      table.dropForeign('type_id')
    })
  }
}

module.exports = AddTypeToRafflesSchema
