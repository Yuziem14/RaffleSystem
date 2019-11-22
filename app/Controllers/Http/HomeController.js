'use strict'
const Raffle = use('App/Models/Raffle');

class HomeController {
    async index({ view }) {
        const raffles = (await Raffle.all()).rows;
        for(const raffle of raffles) {
            raffle.total = await raffle.tickets().getCount();
            raffle.available_tickets = await raffle.tickets().where('user_id', null).getCount();
        }
        return view.render('index', { raffles })
    }
}

module.exports = HomeController
