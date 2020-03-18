'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AwardsSchema extends Schema {
  up() {
    this.create('awards', table => {
      table.increments()
      table.string('description', 60).notNullable()
      table.integer('placing').notNullable()
      table
        .integer('raffle_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('raffles')
        .onDelete('cascade')
      table
        .integer('raffle_ticket')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('tickets')
        .onDelete('cascade')
      table.timestamps()
    })
  }

  down() {
    this.drop('awards')
  }
}

module.exports = AwardsSchema
