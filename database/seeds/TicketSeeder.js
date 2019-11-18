'use strict'

/*
|--------------------------------------------------------------------------
| TicketSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Raffle = use('App/Models/Raffle')

class TicketSeeder {
  static async run(number, raffle) {
    const tickets = await Factory.model('App/Models/Ticket').makeMany(number);
    await raffle.tickets().saveMany(tickets);
  }
}

module.exports = TicketSeeder
