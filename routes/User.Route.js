const { Router } = require('express')
const route = Router()
const UserController = require('../controllers/User.Controller')

route.get('/', UserController.List)
route.get('/:id', UserController.GetById)
route.post('/', UserController.Create)
route.put('/', UserController.Update)
route.delete('/:id', UserController.Delete)

module.exports = route
