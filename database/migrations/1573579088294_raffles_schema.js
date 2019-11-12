'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RafflesSchema extends Schema {
  up () {
    this.create('raffles', (table) => {
      table.increments()
      table.string('title', 45).notNullable()
      table.text('description').nullable()
      table.datetime('probable_raffle_date').notNullable()
      table.datetime('start_date_sale').notNullable()
      table.datetime('end_date_sale').notNullable()
      table.datetime('raffle_date').nullable()
      table.float('ticket_price').notNullable()
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('raffles')
  }
}

module.exports = RafflesSchema
