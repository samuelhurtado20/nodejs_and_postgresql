const AuthService = require('../services/Auth.Service')
const { DataValidation } = require('../utils/Validations')

const AuthController = {}

AuthController.Login = async (req, res) => {
  try {
    const { error } = DataValidation.login(req.body)
    if (error) return res.status(400).send({ message: error.details[0].message })

    let token = await AuthService.Login(req.body)
    if (token.code === 200) return res.header('auth-token', token).status(token.code).send({ token: token.message })
    return res.status(token.code).send({ message: token.message })
  } catch (e) {
    res.status(500).send({
      message: 'Unexpected error',
      error: e.message,
    })
  }
}

AuthController.ChangePassword = async (req, res) => {
  try {
    const { error } = DataValidation.changePassword(req.body)
    if (error) return res.status(400).send({ message: error.details[0].message })

    let change = await AuthService.ChangePassword(req.body)
    res.status(200).send(change)
  } catch (e) {
    res.status(500).send({
      message: 'Unexpected error',
      error: e.message,
    })
  }
}

module.exports = AuthController
