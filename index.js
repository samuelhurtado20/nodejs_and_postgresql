const app = require('./app')

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

//npm i jest supertest -D

//npm i cypress --save-dev
//npx cypress open
//npx cypress open --config watchForFileChanges=true

//npm i mongoose --save
//npm i guid --save-dev
