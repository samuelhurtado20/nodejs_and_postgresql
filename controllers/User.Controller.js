const { isNumber } = require('@hapi/joi/lib/common')
const UserService = require('../services/User.Service')
const { Utils } = require('../utils/Utils')
const { DataValidation } = require('../utils/Validations')

const UserController = {}

UserController.GetById = async (req, res) => {
  let id = req.params.id
  if (!Utils.isPositiveInteger(id)) return res.status(400).send({ message: 'missing parameter: id should be a number' })
  try {
    let user = await UserService.GetById(id)
    if (!user.length > 0) return res.status(404).send({ message: 'User not found' })
    res.status(200).send(user)
  } catch (e) {
    res.status(500).send({
      message: 'Unexpected error',
      error: e.message,
    })
  }
}

UserController.Create = async (req, res) => {
  try {
    const { error } = DataValidation.createUser(req.body)
    if (error) return res.status(400).send({ message: error.details[0].message })

    var emailExists = await UserService.GetByEmail(req.body.email)
    if (emailExists.length > 0) return res.status(400).send({ message: 'Email exists' })

    let userCreated = await UserService.Create(req.body)
    res.status(201).send(userCreated)
  } catch (e) {
    res.status(500).send({
      message: 'Unexpected error',
      error: e.message,
    })
  }
}

UserController.Update = async (req, res) => {
  try {
    const { error } = DataValidation.updateUser(req.body)
    if (error) return res.status(400).send({ message: error.details[0].message })

    let userUpdated = await UserService.Update(req.body)
    res.status(200).send(userUpdated)
  } catch (e) {
    res.status(500).send({
      message: 'Unexpected error',
      error: e.message,
    })
  }
}

UserController.Delete = async (req, res) => {
  let id = req.params.id
  if (!id || !isNumber(id)) return res.status(400).send({ message: 'missing parameter: id should be a number' })
  try {
    let user = await UserService.Delete(id)
    res.status(200).send(user)
  } catch (e) {
    res.status(500).send({
      message: 'Unexpected error',
      error: e.message,
    })
  }
}

UserController.List = async (req, res) => {
  try {
    let users = await UserService.List()
    res.status(200).send(users)
  } catch (e) {
    res.status(500).send({
      message: 'Unexpected error',
      error: e.message,
    })
  }
}

module.exports = UserController
