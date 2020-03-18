'use strict'

/*
|--------------------------------------------------------------------------
| AdminSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')

class AdminSeeder {
  async run() {
    const userData = {
      name: 'Administrator',
      email: 'admin@email.com',
      password: 'secret123',
      admin: true
    }

    await User.create(userData)
  }
}

module.exports = AdminSeeder
