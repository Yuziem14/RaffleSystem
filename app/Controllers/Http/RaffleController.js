'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Raffle = use('App/Models/Raffle');
const Type = use('App/Models/Type');

/**
 * Resourceful controller for interacting with raffles
 */
class RaffleController {
  /**
   * Show a list of all raffles.
   * GET raffles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const raffles = (await Raffle.all()).rows;
    await Raffle.setTicketsCount(raffles);
    return view.render('raffles.index', { raffles, now: new Date() });
  }

  /**
   * Render a form to be used for creating a new raffle.
   * GET raffles/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
    const types = (await Type.all()).rows;
    return view.render('raffles.create', { types });
  }

  /**
   * Create/save a new raffle.
   * POST raffles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const { user } = auth;

    const raffleData = request.except(['_csrf', 'main_award']);
    raffleData.user_id = user.id;
    const raffle = await Raffle.create(raffleData);

    const award = { placing: 1, description: request.input('main_award') };

    await raffle.awards().create(award);

    response.route('raffles.show', { id: raffle.id });
  }

  /**
   * Display a single raffle.
   * GET raffles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const { id } = params;
    const raffle = await Raffle.find(id);
    await raffle.loadMany(['tickets', 'awards', 'user']);
    return view.render('raffles.show', { raffle });
  }

  /**
   * Render a form to update an existing raffle.
   * GET raffles/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
    const { id } = params;
    const raffle = await Raffle.find(id);
    await raffle.load('awards');

    return view.render('raffles.edit', { raffle });
  }

  /**
   * Update raffle details.
   * PUT or PATCH raffles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) { }

  /**
   * Delete a raffle with id.
   * DELETE raffles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }

  /**
   * Store a new award for raffle
   * POST raffles/:id/awards
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async storeAward({ params, request, response }) {
    const raffle = await Raffle.find(params.id);
    const awardData = request.only(['description']);
    awardData.placing = (await raffle.awards().getMax('placing')) + 1;

    await raffle.awards().create(awardData);

    response.route('raffles.show', { id: raffle.id });
  }

  async buy({ params, request, response, auth }) {
    const raffle = await Raffle.find(params.raffle);

    const ticket = (await raffle.tickets().where('id', params.id).fetch()).rows[0];
    if (ticket.user_id == auth.user.id) {
      ticket.user_id = null;
    } else if (!ticket.user_id) {
      ticket.user_id = auth.user.id;
    }

    await raffle.tickets().save(ticket);

    response.route('raffles.show', { id: raffle.id })
  }
}

module.exports = RaffleController
