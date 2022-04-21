const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')

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

app.listen(process.env.PORT, () => {
  console.log('server is running on port: ' + process.env.PORT)
})

//npm i express --save
//npm i dotenv --save
//npm i pg --save
//npm i cors --save
//npm i nodemon morgan --save-dev
//npm i @hapi/joi --save
//npm i bcryptjs --save
//npm i jsonwebtoken --save

//npm i cypress --save-dev
//npx cypress open
//npx cypress open --config watchForFileChanges=true

//npm i mongoose --save
//npm i guid --save-dev
