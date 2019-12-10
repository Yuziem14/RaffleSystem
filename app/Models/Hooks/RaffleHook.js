'use strict'

const RaffleHook = exports = module.exports = {}

RaffleHook.generateTickets = async (raffle) => {
    const type = await raffle.type().fetch();
    const tickets = [];

    for (let i = type.first_number; i < (type.tickets_amount * type.step); i += type.step) {
        tickets.push({ number: i });
    }

    await raffle.tickets().createMany(tickets);
}
