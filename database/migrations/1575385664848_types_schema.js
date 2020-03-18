'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TypesSchema extends Schema {
  up() {
    this.create('types', table => {
      table.increments()
      table.string('description', 100).notNullable()
      table.integer('first_number').notNullable()
      table.integer('step').notNullable()
      table
        .integer('tickets_amount')
        .notNullable()
        .unsigned()
      table.timestamps()
    })
  }

  down() {
    this.drop('types')
  }
}

module.exports = TypesSchema
