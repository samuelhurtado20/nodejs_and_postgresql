const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const filename = 'logs/morgan-' + moment(new Date()).format('MM-DD-YYYY') + '.log'

dotenv.config()

// Setup the logger with morgan
const accessLogStream = fs.createWriteStream(path.join(__dirname, filename), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))
//app.use(morgan('dev'))

const corsOptions = {
  origin: 'http://localhost:' + process.env.PORT,
  optionsSuccessStatus: 200,
}

app.use(cors())
app.use(express.json())

app.use('/api/user/', cors(corsOptions), require('./routes/User.Route'))
app.use('/api/category/', cors(corsOptions), require('./routes/Category.Route'))
app.use('/api/auth/', cors(corsOptions), require('./routes/Auth.Route'))

module.exports = app
