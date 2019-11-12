'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Raffle extends Model {
    user () {
        return this.belongsTo('App/Models/User');
    }

    tickets () {
        return this.hasMany('App/Models/Ticket');
    }

    awards () {
        return this.hasMany('App/Models/Award');
    }
}

module.exports = Raffle
