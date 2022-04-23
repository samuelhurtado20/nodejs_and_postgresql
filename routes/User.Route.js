const { Router } = require('express')
const route = Router()
const UserController = require('../controllers/User.Controller')
const VerifyToken = require('../middlewares/VerifyToken')

route.get('/', UserController.List)
route.get('/:id', UserController.GetById)
route.get('/GetByEmail/:email', UserController.GetByEmail)
route.post('/', UserController.Create)
route.put('/', UserController.Update)
route.delete('/:id', UserController.Delete)

module.exports = route
