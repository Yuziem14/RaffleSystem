'use strict'

const Hash = use('Hash');

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', async (faker) => {
  return {
    name: faker.name(),
    email: faker.email(),
    photo: 'noimage.png',
    admin: faker.bool(),
    password: await Hash.make('secret123')
  }
})

Factory.blueprint('App/Models/Raffle', async (faker) => {
    const date = new Date();
    const startDate = new Date();
    const endDate = new Date(date.setMonth(date.getMonth() + 1));
    
    return {
        title: faker.word({ syllables: 5 }),
        description: faker.sentence(),
        probable_raffle_date: endDate,
        start_date_sale: startDate,
        end_date_sale: endDate,
        raffle_date: endDate,
        ticket_price: faker.floating({ fixed: 2, min: 0, max: 500 })
    }
})
