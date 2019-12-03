'use strict'

const RaffleHook = exports = module.exports = {}

RaffleHook.generateTickets = async (raffle) => {
    const tickets = [];

    for (let i = 0; i < 1000; i++) {
        tickets.push({ number: i + 1 });
    }

    await raffle.tickets().createMany(tickets);
}
