'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Ticket extends Model {
    user () {
        return this.belongsTo('App/Models/User')
    }

    raffle () {
        return this.belongsTo('App/Models/Raffle')
    }

    award () {
        return this.hasOne('App/Models/Award')
    }
}

module.exports = Ticket
