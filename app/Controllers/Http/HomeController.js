'use strict'
const Raffle = use('App/Models/Raffle');

class HomeController {
    async index({ view }) {
        const raffles = (await Raffle.all()).rows
        return view.render('index', { 'raffles': raffles })
   }
}

module.exports = HomeController
