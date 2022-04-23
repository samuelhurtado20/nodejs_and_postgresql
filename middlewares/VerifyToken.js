const jwt = require('jsonwebtoken')
const EnumMessages = require('../types/EnumMessages')

const VerifyToken = {}

VerifyToken.GetRol = async (req) => {
  const bearerHeader = req.headers['authorization']

  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1]

    if (bearerToken) {
      const resp = await jwt.decode(bearerToken)
      if (resp.user.rol == 'Admin' || resp.user.rol == 'User') return resp.user.rol
    }
  }

  return undefined
}

VerifyToken.IsAdmin = async (req, res, next) => {
  let rol = await VerifyToken.GetRol(req)
  if (rol === 'Admin') next()
  if (rol === undefined) return res.status(401).send(EnumMessages.IsNotAuthenticated)
  return res.status(403).send(EnumMessages.InsufficientPrivileges)
}

VerifyToken.IsUser = async (req, res, next) => {
  let rol = await VerifyToken.GetRol(req)
  if (rol === 'User') next()
  if (rol === undefined) return res.status(401).send(EnumMessages.IsNotAuthenticated)
  return res.status(403).send(EnumMessages.InsufficientPrivileges)
}

VerifyToken.IsAuthenticated = async (req, res, next) => {
  let rol = await VerifyToken.GetRol(req)
  if (rol === undefined) return res.status(401).send(EnumMessages.IsNotAuthenticated)
  next()
}

module.exports = VerifyToken
