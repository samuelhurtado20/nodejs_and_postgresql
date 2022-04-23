const AuthService = require('../services/Auth.Service')
const EnumMessages = require('../types/EnumMessages')
const { DataValidation } = require('../utils/Validations')
const logger = require('../utils/LoggerService')

const AuthController = {}

AuthController.Login = async (req, res) => {
  try {
    const { error } = DataValidation.login(req.body)
    if (error) return res.status(400).send({ code: -1, message: error.details[0].message })

    let token = await AuthService.Login(req.body)
    if (token.code === 200) return res.header('auth-token', token.message).status(token.code).send({ token: token.message })
    return res.status(401).send(token)
  } catch (e) {
    logger.error('AuthController.Login. ERROR: ' + e.message)
    res.status(500).send(EnumMessages.UnexpectedError)
  }
}

AuthController.ChangePassword = async (req, res) => {
  try {
    const { error } = DataValidation.changePassword(req.body)
    if (error) return res.status(400).send({ message: error.details[0].message })

    let change = await AuthService.ChangePassword(req.body)
    if (change.code === EnumMessages.Success.code) return res.status(200).send(change)
    return res.status(401).send(change)
  } catch (e) {
    res.status(500).send(EnumMessages.UnexpectedError)
  }
}

module.exports = AuthController
