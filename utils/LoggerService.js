const { createLogger, format, transports } = require('winston')
const moment = require('moment')
const filename = moment(new Date()).format('MM-DD-YYYY') + '.log'

module.exports = createLogger({
  transports: new transports.File({
    filename: 'logs/' + filename,
    format: format.combine(
      format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
      format.align(),
      format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`)
    ),
  }),
})
