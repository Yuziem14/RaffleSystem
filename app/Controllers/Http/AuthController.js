"use strict";

const Persona = use("Persona");
const Config = use("Config");
const moment = require('moment');

const { validate } = use("Validator");

class AuthController {
  async login({ request, auth, response, session }) {
    const payload = request.only(["uid", "password"]);

    const user = await Persona.verify(payload);

    await auth.login(user);
    response.redirect(Config.get("adonis-auth-scaffold.registrationSuccessRedirectTo"));
  }

  async register({ request, auth, response, session }) {
    const payload = request.only([
      "email",
      "name",
      "password",
      "password_confirmation"
    ]);

    const validation = await validate(
      payload,
      Config.get("adonis-auth-scaffold.validationRules.registration"),
      Config.get("adonis-auth-scaffold.validationMessages")()
    );

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll();
      return response.redirect("back");
    }

    const user = await Persona.register(payload);

    // optional
    await auth.login(user);
    response.redirect(Config.get("adonis-auth-scaffold.registrationSuccessRedirectTo"));
  }

  async forgotPassword({ request, response, session, auth }) {
    const token = request.input('token');
    const uid = request.input('uid');
    const payload = request.only(['password', 'password_confirmation']);

    if (!token) {
      await Persona.forgotPassword(uid);
      session.flash({ hasMadeResetRequest: 'true' })
      return response.redirect('back')
    }

    try {
      const user = await Persona.updatePasswordByToken(token, payload);

      await auth.login(user);
      return response.redirect(Config.get("adonis-auth-scaffold.registrationSuccessRedirectTo"));
    } catch (error) {
      if (error.name === 'InvalidTokenException') {
        session.flash({ errorMessage: 'The token supplied is not valid.' })
      } else {
        session.flash({ errorMessage: error.message })
      }
    }

    return response.redirect('back')
  }

  getLogin({ request, response, view }) {
    return view.render("auth.login");
  }

  getRegister({ request, response, view }) {
    return view.render("auth.register");
  }

  getResetPassword({ request, response, view, params }) {
    const token = request.input('token');
    return view.render("auth.password-reset", { token });
  }

  async getAuthDashboard({ request, response, view, auth }) {
    const { user } = auth;
    const now = moment(new Date(), "DD/MM/YYYY HH:mm:ss");

    const myRaffles = (await user.raffles().fetch()).rows;
    const boughtRaffles = (await user.boughtRaffles().distinct('raffles.id').fetch()).rows;

    for (const raffle of myRaffles) {
      raffle.totalTickets = await raffle.tickets().getCount();

      raffle.available_tickets = await raffle.tickets().where('user_id', null).getCount();

      raffle.amountRaised = (raffle.totalTickets - raffle.available_tickets) * raffle.ticket_price;

      raffle.totalParticipants = (await raffle.tickets().distinct('user_id').whereNotNull('user_id').fetch()).rows.length;

      const probableRaffleDate = moment(raffle.probable_raffle_date, "DD/MM/YYYY HH:mm:ss");
      raffle.days = probableRaffleDate.diff(now, 'days');
    }

    for (const raffle of boughtRaffles) {
      await raffle.load('user');

      raffle.totalTickets = (await raffle.tickets().count('* as total'))[0].total;

      raffle.available_tickets = await raffle.tickets().where('user_id', null).getCount();

      raffle.totalTicketsBought = (await user.tickets().where('raffle_id', raffle.id).count('* as total'))[0].total;

      raffle.amountInvested = raffle.totalTicketsBought * raffle.ticket_price;

      raffle.totalParticipants = (await raffle.tickets().distinct('user_id').whereNotNull('user_id').fetch()).rows.length;

      const probableRaffleDate = moment(raffle.probable_raffle_date, "DD/MM/YYYY HH:mm:ss");
      raffle.days = probableRaffleDate.diff(now, 'days');
    }

    return view.render("auth.dashboard", { myRaffles, boughtRaffles, now });
  }

  getLogout({ response, session }) {
    const loginRoute = Config.get("adonis-auth-scaffold.loginRoute");
    session.clear();

    return response.redirect(loginRoute)
  }
}

module.exports = AuthController;
