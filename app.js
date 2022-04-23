const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

dotenv.config()
app.use(morgan('dev'))

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
