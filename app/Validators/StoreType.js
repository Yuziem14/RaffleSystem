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
}

module.exports = StoreType
