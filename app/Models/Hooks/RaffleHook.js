'use strict'

const RaffleHook = exports = module.exports = {}

RaffleHook.generateTickets = async (raffle) => {
    const type = await raffle.type().fetch();
    const tickets = [];
    let acumulator = type.first_number;

    tickets.push({ number: acumulator })
    for (let i = type.first_number; i < type.tickets_amount; i++) {
        acumulator += type.step;
        tickets.push({ number: acumulator });
    }

    await raffle.tickets().createMany(tickets);
}
