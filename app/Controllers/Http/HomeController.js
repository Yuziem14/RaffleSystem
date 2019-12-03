'use strict'
const Raffle = use('App/Models/Raffle');
const moment = require('moment');

class HomeController {
    async index({ view }) {
        const raffles = (await Raffle.all()).rows;
        await Raffle.setTicketsCount(raffles);
        return view.render('index', { raffles })
    }

    async dashboard({ view, auth }) {
        const { user } = auth;
        const now = moment(new Date(), "DD/MM/YYYY HH:mm:ss");

        const myRaffles = (await user.raffles().fetch()).rows;
        const boughtRaffles = (await user.boughtRaffles().distinct('raffles.id').fetch()).rows;

        for (const raffle of myRaffles) {
        raffle.totalTickets = await raffle.tickets().getCount();

        raffle.available_tickets = await raffle.tickets().where('user_id', null).getCount();

        raffle.amountRaised = (raffle.totalTickets - raffle.available_tickets) * raffle.ticket_price;

        raffle.totalParticipants = (await raffle.tickets().distinct('user_id').whereNotNull('user_id').fetch()).rows.length;

        const probableRaffleDate = moment(raffle.probable_raffle_date, "DD/MM/YYYY HH:mm:ss");
        raffle.days = probableRaffleDate.diff(now, 'days');
        }

        for (const raffle of boughtRaffles) {
        await raffle.load('user');

        raffle.totalTickets = (await raffle.tickets().count('* as total'))[0].total;

        raffle.available_tickets = await raffle.tickets().where('user_id', null).getCount();

        raffle.totalTicketsBought = (await user.tickets().where('raffle_id', raffle.id).count('* as total'))[0].total;

        raffle.amountInvested = raffle.totalTicketsBought * raffle.ticket_price;

        raffle.totalParticipants = (await raffle.tickets().distinct('user_id').whereNotNull('user_id').fetch()).rows.length;

        const probableRaffleDate = moment(raffle.probable_raffle_date, "DD/MM/YYYY HH:mm:ss");
        raffle.days = probableRaffleDate.diff(now, 'days');
        }

        return view.render("auth.dashboard", { myRaffles, boughtRaffles, now });
    }
}

module.exports = HomeController
