# RaffleSystem

Full Aplication Build with AdonisJS

## Description

Final Work - Web Development

Online Raffle Management Application

Using the AdonisJs framework, make a web application that allows the creation and management of Raffles online.

Minimum requirements (to achieve a C concept)
A User can register and, after that, start a new raffle or access the page of an existing raffle.

A Raffle has a title, detailed textual information, various business dates and ticket value (see diagram).

When registering a new raffle, generate 1,000 tickets, numbered from 1 to 1,000.

When registering a raffle, the user informs which are the Prizes that will be offered to each one of the winners (first, second, third, ...). Note: A raffle can have a dynamic amount and prizes (at least 1).

On the page of each raffle, in addition to the details of the same, users must be able to view ALL the existing tickets for it, differentiating those purchased from those not purchased.

On this same page, each Ticket can be individually purchased (the same ticket cannot be purchased by more than one user, but a user can purchase as many tickets as they want from the same raffle). Only raffle tickets that are within the sales period can be purchased.

The user must be able to see on his home page, at any time, his status in relation to raffles in which he participates, as well as the raffles he has created. Show, for example: number of tickets purchased, amount invested, missing days for the draw, option to buy more tickets, number of people / tickets participating, etc.

Did you do everything above and want a B concept?
Include support for raffle types (see diagram).

A Type defines the quantity and format for generating the ticket numbers for each raffle. For example:

Generate 100 tickets, starting from the number 100 and numbered 2 in 2 (100, 102, 104, 106, ... 500)
ticket_number = 200
initial_number = 100
step = 2
Type is an entity managed only by the system administrator user, so include due checks (middleware).

Did you do everything above and want to target an A concept?
Only after the predicted date / time of the draw, the user creating a raffle will see an option to carry out the draw. When using it, the draw will take place (randomized by the system) and the appropriate ticket_sorteado_id must be updated in the prize table.

Only purchased tickets can be drawn.

The page of each Raffle must show when it has already been drawn and what the winning tickets / people were.

The user's home page should show that he is the raffle seller and what his prize is.

Suggested Entity-Relationship Diagram

![MEER RaffleSystem](./Docs/MEER-RaffleSystem.png)
Comments:

Do not modify the general structure of the data model (tables and relationships)
You can add (not remove) tables or attributes
You can rename tables or attributes

Restrictions\
Work can be done INDIVIDUALLY or in DOUBLE

For styling, pure CSS or any CSS framework can be used
CORRECTLY use all concepts / tools covered during the year:

- HTML
- CSS
- JavaScript
- AdonisJs Framework

Even if the problem is the same for everyone, THE SOURCE CODE OR GENERAL ASPECT OF THE WORKS OF TWO DIFFERENT STUDENTS ARE NOT EQUAL OR VERY SIMILAR. If a copy is detected, both will receive a D concept.

## Set up

```
npm run config
```

or if you don't have adonis installed, run:

```
npm run config-adonis
```

```
adonis migration:run
```

If you want to seed the database, certify to comment the Raffle Hooks and then run

```
adonis seed --files database/seeds/DatabaseSeeder.js
```

Developed By Yuri Ziemba
