'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Type extends Model {
  raffles() {
    return this.hasMany('App/Models/Raffle')
  }
}

module.exports = Type
