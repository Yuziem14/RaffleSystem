'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Award extends Model {
    raffle () {
        return this.belongsTo('App/Models/Raffle')
    }

    ticket () {
        return this.hasOne('App/Models/Ticket')
    }
}

module.exports = Award
