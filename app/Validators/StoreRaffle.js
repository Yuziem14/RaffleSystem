'use strict'

const Validator = use('Validator')
const User = use('App/Models/User')

const uniqueUserRaffle = async (data, field, message, args, get) => {
  const value = get(data, field)
  if (!value) {
    return
  }

  const [userId] = args
  const user = await User.find(userId)

  const count = await user
    .raffles()
    .where('title', value)
    .getCount()

  if (count > 0) {
    throw message
  }
}

Validator.extend('uniqueUserRaffle', uniqueUserRaffle)

class StoreRaffle {
  get rules() {
    const { auth, request } = this.ctx

    return {
      title: `required|min:3|max:45|uniqueUserRaffle:${auth.user.id}`,
      start_date_sale: `required|date|after:${new Date()}`,
      probable_raffle_date: `required|date|after:${request.input(
        'start_date_sale'
      )}`,
      end_date_sale: `required|date|before:${request.input(
        'probable_raffle_date'
      )}`,
      type_id: 'required',
      ticket_price: `required| above: 0`,
      main_award: 'required|min:3|max:60'
    }
  }

  get messages() {
    return {
      'title.required': 'Por favor, informe o título da rifa.',
      'title.min': 'O título deve ter ao menos 3 caracteres.',
      'title.max': 'O título deve ter no máximo 45 caracteres.',
      'title.uniqueUserRaffle': 'Uma rifa já possui esse título.',
      'start_date_sale.required':
        'Por favor, informe a data inicial de vendas.',
      'start_date_sale.date': 'Informe uma data valida.',
      'start_date_sale.after':
        'A data inicial de venda deve ser depois da data atual.',
      'probable_raffle_date.required':
        'Por favor, informe a data provável do sorteio.',
      'probable_raffle_date.date': 'Informe uma data valida.',
      'probable_raffle_date.after':
        'A data provavel do sorteio deve ser depois da data inicial de venda.',
      'end_date_sale.required': 'Por favor, informe a data de fim das vendas.',
      'end_date_sale.date': 'Informe uma data valida.',
      'end_date_sale.before':
        'A data final de vendas deve ser antes da data provavél do sorteio.',
      'type_id.required': 'Informe o tipo da rifa.',
      'ticket_price.required': 'Por favor, informe o preço dos bilhetes.',
      'ticket_price.float':
        'Por favor, informe um preço válido! O preço deve ser um número.',
      'ticket_price.above': 'O preço dos bilhetes deve ser maior que 0.',
      'main_award.required': 'Por favor, informe o premio da rifa.',
      'main_award.min': 'O premio deve ter ao menos 3 caracteres.',
      'main_award.max': 'O premio deve ter no máximo 60 caracteres.'
    }
  }

  get validateAll() {
    return true
  }
}

module.exports = StoreRaffle
