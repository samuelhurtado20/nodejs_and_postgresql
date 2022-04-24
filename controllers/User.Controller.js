const UserService = require('../services/User.Service')
const { Utils } = require('../utils/Utils')
const { DataValidation } = require('../utils/Validations')
const EnumMessages = require('../types/EnumMessages')
const logger = require('../utils/LoggerService')

const UserController = {}

UserController.GetById = async (req, res) => {
  let id = req.params.id
  if (!Utils.isPositiveInteger(id)) return res.status(400).send(EnumMessages.MissingParameterId)
  try {
    let user = await UserService.GetById(id)
    if (!user.length > 0) return res.status(404).send(EnumMessages.UserNotFound)
    res.status(200).send(user)
  } catch (e) {
    logger.error(`${e.status || 500} - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    res.status(500).send(EnumMessages.UnexpectedError)
  }
}

UserController.Create = async (req, res) => {
  try {
    const { error } = DataValidation.createUser(req.body)
    if (error) return res.status(400).send({ message: error.details[0].message })

    var emailExists = await UserService.GetByEmail(req.body.email)
    if (emailExists.length > 0) return res.status(400).send(EnumMessages.EmailExists)

    let userCreated = await UserService.Create(req.body)
    res.status(201).send(userCreated)
  } catch (e) {
    logger.error(`${e.status || 500} - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    res.status(500).send(EnumMessages.UnexpectedError)
  }
}

UserController.Update = async (req, res) => {
  try {
    const { error } = DataValidation.updateUser(req.body)
    if (error) return res.status(400).send({ message: error.details[0].message })

    let userUpdated = await UserService.Update(req.body)
    res.status(200).send(userUpdated)
  } catch (e) {
    logger.error(`${e.status || 500} - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    res.status(500).send(EnumMessages.UnexpectedError)
  }
}

UserController.Delete = async (req, res) => {
  let id = req.params.id
  if (!Utils.isPositiveInteger(id)) return res.status(400).send(EnumMessages.MissingParameterId)
  try {
    let user = await UserService.Delete(id)
    res.status(200).send(user)
  } catch (e) {
    logger.error(`${e.status || 500} - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    res.status(500).send(EnumMessages.UnexpectedError)
  }
}

UserController.List = async (req, res) => {
  try {
    let users = await UserService.List()
    res.status(200).send(users)
  } catch (e) {
    logger.error(`${e.status || 500} - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    res.status(500).send(EnumMessages.UnexpectedError)
  }
}

UserController.GetByEmail = async (req, res) => {
  let email = req.params.email
  try {
    let users = await UserService.GetByEmail(email)
    res.status(200).send(users)
  } catch (e) {
    logger.error(`${e.status || 500} - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    res.status(500).send(EnumMessages.UnexpectedError)
  }
}

module.exports = UserController
