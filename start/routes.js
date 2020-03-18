'use strict'

require('./authRoutes.js')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'HomeController.index')
  .as('home')
  .middleware('redirectAuth')
Route.get('dashboard', 'HomeController.dashboard')
  .as('dashboard')
  .middleware('auth')

Route.resource('raffles', 'RaffleController')
  .middleware(
    new Map([[['create', 'store', 'edit', 'update', 'destroy'], ['auth']]])
  )
  .validator(new Map([[['store', 'update'], ['StoreRaffle']]]))

Route.post('raffles/:id/awards', 'RaffleController.storeAward')
  .as('awards.store')
  .middleware('auth')
  .validator('StoreAward')
Route.get('raffes/:raffle/buy/:id', 'RaffleController.buy')
  .as('raffles.buy')
  .middleware('auth')

Route.resource('types', 'TypeController')
  .except(['edit', 'update'])
  .middleware(['auth', 'checkAdmin'])
  .validator(new Map([[['store'], ['StoreType']]]))
