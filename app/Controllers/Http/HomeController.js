'use strict'
const Raffle = use('App/Models/Raffle');

class HomeController {
    async index({ view }) {
        const raffles = (await Raffle.all()).rows;
        raffles.forEach( async raffle => {
            raffle.total = await raffle.tickets().getCount();
            raffle.availables = await raffle.tickets().where('user_id', null).getCount();
        });
        return view.render('index', { raffles })
    }
}

module.exports = HomeController
