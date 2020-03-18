'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TicketsSchema extends Schema {
  up() {
    this.create('tickets', table => {
      table.increments()
      table.integer('number').notNullable()
      table
        .integer('raffle_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('raffles')
        .onDelete('cascade')
      table
        .integer('user_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('users')
        .onDelete('cascade')
      table.timestamps()
    })
  }

  down() {
    this.drop('tickets')
  }
}

module.exports = TicketsSchema
