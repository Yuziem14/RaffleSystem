'use strict'

const Validator = use('Validator');
const Raffle = use('App/Models/Raffle');

const limitAwards = async (data, field, message, args, get) => {
  const value = get(data, field);
  if (!value) {
    return;
  }

  const [RaffleId] = args;
  const raffle = await Raffle.find(RaffleId);

  const ticketsCount = (await raffle.tickets()
    .getCount());

  const awardsCount = (await raffle.awards()
    .getCount());

  if (awardsCount >= ticketsCount) {
    throw message;
  }
}

Validator.extend('limitAwards', limitAwards);


class StoreAward {
  get rules () {
    const { request } = this.ctx;
    return {
      description: `required|min:5|max:60|limitAwards:${request.params.id}`
    }
  }

  get messages() {
    return {
      'description.required': 'Por favor, informe o novo premio da rifa.',
      'description.min': 'O premio deve ter ao menos 3 caracteres.',
      'description.max': 'O premio deve ter no máximo 60 caracteres.',
      'description.limitAwards': 'Limite de premios alcançado. Um premio para cada bilhete da rifa.'
    };
  }

  get validateAll() {
    return true;
  }
}

module.exports = StoreAward
