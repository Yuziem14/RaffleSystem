'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/* Requiring Seeders */
const AdminSeeder = require('./AdminSeeder');
const TypeSeeder = require('./TypeSeeder');
const UserSeeder = require('./UserSeeder');
const RaffleSeeder = require('./RaffleSeeder');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Database = use('Database');

class DatabaseSeeder {
  async run() {
    await Database.raw('SET FOREIGN_KEY_CHECKS = 0;')
    await Database.truncate('users');
    await Database.truncate('types');
    await Database.truncate('raffles');
    await Database.truncate('tickets');
    await Database.truncate('awards');
    await Database.raw('SET FOREIGN_KEY_CHECKS = 1;')

    await new AdminSeeder().run();
    await new TypeSeeder().run();
    const users = await UserSeeder.run(3);
    await RaffleSeeder.run(5, users);
  }
}

module.exports = DatabaseSeeder
