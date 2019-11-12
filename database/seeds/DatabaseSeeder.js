'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Database = use('Database');

class DatabaseSeeder {
  async run () {
    await Database.raw('SET FOREIGN_KEY_CHECKS = 0;')
    await Database.truncate('users');
    await Database.truncate('raffles');
    await Database.raw('SET FOREIGN_KEY_CHECKS = 1;')
    
    const users = await Factory.model('App/Models/User').createMany(10);
    users.forEach(async u => {
      const raffles = Factory.model('App/Models/Raffle').makeMany(5)
        .then(async (raffles) => {
          await u.raffles().saveMany(raffles);
        });
    })
  }
}

module.exports = DatabaseSeeder
