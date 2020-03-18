'use strict'

/*
|--------------------------------------------------------------------------
| TypeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Type = use('App/Models/Type')

class TypeSeeder {
  async run() {
    const typeData = {
      description: 'Bilhetes de 1 a 1000, de 1 em 1',
      first_number: 1,
      step: 1,
      tickets_amount: 1000
    }

    await Type.create(typeData)
  }
}

module.exports = TypeSeeder
