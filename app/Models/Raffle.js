'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Raffle extends Model {
    user() {
        return this.belongsTo('App/Models/User');
    }

    tickets() {
        return this.hasMany('App/Models/Ticket');
    }

    awards() {
        return this.hasMany('App/Models/Award');
    }

    static get dates() {
        return super.dates.concat([
            'probable_raffle_date',
            'start_date_sale',
            'end_date_sale',
            'raffle_date'
        ])
    }

    static castDates(field, value) {
        if (this.dates.includes(field) || fied == 'any_date')
            return value.format('DD/MM/YYYY hh:mm')
    }

    static async setTicketsCount(raffles) {
        raffles = Array.isArray(raffles) ? raffles : [raffles];
        for (const raffle of raffles) {
            raffle.total = await raffle.tickets().getCount();
            raffle.available_tickets = await raffle.tickets().where('user_id', null).getCount();
        }
    }
}

module.exports = Raffle
