const CategoryService = require('../services/Category.Service')
const { Utils } = require('../utils/Utils')
const { DataValidation } = require('../utils/Validations')
const EnumMessages = require('../types/EnumMessages')

const CategoryController = {}

CategoryController.GetById = async (req, res) => {
  let id = req.params.id
  if (!Utils.isPositiveInteger(id)) return res.status(400).send(EnumMessages.CategoryNotFound)
  try {
    let category = await CategoryService.GetById(id)
    if (!category.length > 0) return res.status(404).send(EnumMessages.CategoryNotFound)
    res.status(200).send(category)
  } catch (e) {
    res.status(500).send(EnumMessages.UnexpectedError)
  }
}

CategoryController.Create = async (req, res) => {
  try {
    const { error } = DataValidation.createCategory(req.body)
    if (error) return res.status(400).send({ message: error.details[0].message })

    const { name } = req.body
    const category = await CategoryService.Create(name)
    res.status(201).send(category)
  } catch (e) {
    res.status(500).send(EnumMessages.UnexpectedError)
  }
}

CategoryController.Update = async (req, res) => {
  try {
    const { error } = DataValidation.updateCategory(req.body)
    if (error) return res.status(400).send({ message: error.details[0].message })

    let categoryUpdated = await CategoryService.Update(req.body)
    res.status(200).send(categoryUpdated)
  } catch (e) {
    res.status(500).send(EnumMessages.UnexpectedError)
  }
}

CategoryController.Delete = async (req, res) => {
  let id = req.params.id
  if (!Utils.isPositiveInteger(id)) return res.status(400).send(EnumMessages.CategoryNotFound)
  try {
    let user = await CategoryService.Delete(id)
    res.status(200).send(user)
  } catch (e) {
    res.status(500).send(EnumMessages.UnexpectedError)
  }
}

CategoryController.List = async (req, res) => {
  try {
    let users = await CategoryService.List()
    res.status(200).send(users)
  } catch (e) {
    res.status(500).send(EnumMessages.UnexpectedError)
  }
}

module.exports = CategoryController
