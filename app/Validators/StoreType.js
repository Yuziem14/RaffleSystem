'use strict'

class StoreType {
  get rules() {
    return {
      description: 'required|min:5|max:45',
      first_number: 'required|number|above:-1',
      step: 'required|number|above:0',
      tickets_amount: 'required|number|above:10'
    }
  }

  get messages() {
    return {
      'description.required': 'Por favor, informe a descrição do novo tipo.',
      'description.min': 'A descrição deve ter ao menos 5 caracteres.',
      'description.max': 'A descrição deve ter no máximo 45 caracteres.',
      'first_number.required': 'Por favor, informe o passo.',
      'first_number.number': 'O primeiro número deve ser um número válido.',
      'first_number.above': 'O primeiro número deve ser maior ou igual a 0.',
      'step.required': 'Por favor, informe o passo.',
      'step.number': 'O passo deve ser um número válido.',
      'step.above': 'O passo deve ser maior que 0',
      'tickets_amount.required': 'Por favor, informe a quantidade de bilhetes.',
      'tickets_amount.number': 'A quantidade de bilhetes deve ser um número válido.',
      'tickets_amount.above': 'A quantidade minima de bilhetes é 10.'
    };
  }

  get validateAll() {
    return true;
  }
}

module.exports = StoreType
