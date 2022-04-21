const { Router } = require('express')
const route = Router()
const CategoryController = require('../controllers/Category.Controller')

route.get('/', CategoryController.List)
route.get('/:id', CategoryController.GetById)
route.post('/', CategoryController.Create)
route.put('/', CategoryController.Update)
route.delete('/:id', CategoryController.Delete)

module.exports = route
