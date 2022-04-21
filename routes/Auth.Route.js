const { Router } = require('express')
const route = Router()
const AuthController = require('../controllers/Auth.Controller')

route.post('/', AuthController.Login)
route.put('/', AuthController.ChangePassword)

module.exports = route
