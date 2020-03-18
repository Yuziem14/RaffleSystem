const moment = require('moment')
const datesDOM = document.querySelectorAll('.format-date')

for (const dateDOM of datesDOM) {
  let date = moment(new Date(dateDOM.textContent)).format('DD/MM/YYYY hh:mm')
  dateDOM.textContent = date
}
