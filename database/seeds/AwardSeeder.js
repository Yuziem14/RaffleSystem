'use strict'

/*
|--------------------------------------------------------------------------
| AwardSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Raffle = use('App/Models/Raffle')

class AwardSeeder {
  static async run(number, raffle) {
    const awards = await Factory.model('App/Models/Award').makeMany(number)
    await raffle.awards().saveMany(awards)
  }
}

module.exports = AwardSeeder
