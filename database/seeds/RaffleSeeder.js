'use strict'

/*
|--------------------------------------------------------------------------
| RaffleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/* Requiring Seeders */
const TicketSeeder = require('./TicketSeeder')
const AwardSeeder = require('./AwardSeeder')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')
const Raffle = use('App/Models/Raffle')

class RaffleSeeder {
  static async run(number, users) {
    users.forEach(async u => {
      const raffles = await Factory.model('App/Models/Raffle').makeMany(number)
      await u.raffles().saveMany(raffles)

      await raffles.forEach(async r => {
        await TicketSeeder.run(10, r)
        await AwardSeeder.run(3, r)
      })
    })
  }
}

module.exports = RaffleSeeder
