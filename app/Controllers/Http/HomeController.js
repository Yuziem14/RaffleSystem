'use strict'
const Raffle = use('App/Models/Raffle');

class HomeController {
    async index({ view }) {
        const raffles = (await Raffle.all()).rows;
        await Raffle.setTicketsCount(raffles);
        return view.render('index', { raffles })
    }
}

module.exports = HomeController
