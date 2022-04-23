const Pool = require('pg').Pool
const bcrypt = require('bcryptjs/dist/bcrypt')
const jwt = require('jsonwebtoken')
const EnumMessages = require('../types/EnumMessages')
const UserService = require('./User.Service')

const AuthService = {}

AuthService.Login = async (user) => {
  try {
    const pool = new Pool()
    const res = await UserService.GetByEmail(user.email) //await pool.query('select id, email, name, password from public.users where email = $1', [user.email])
    pool.end()
    if (!res.length > 0) return EnumMessages.InvalidLogin

    const validPassword = await bcrypt.compare(user.password, res[0].password)
    if (!validPassword) return EnumMessages.InvalidLogin

    res[0].password = ''
    res[0].rol = 'Admin'

    const token = jwt.sign({ user: res[0] }, process.env.TOKEN_SECRET)
    return { code: 200, message: token }
  } catch (e) {
    throw e
  }
}

AuthService.ChangePassword = async (user) => {
  try {
    const pool = new Pool()
    const res = await pool.query('select id, email, name, password from public.users where id = $1', [user.id])

    if (!res.rowCount > 0) return EnumMessages.InvalidInformation
    const validPassword = await bcrypt.compare(user.currentPassword, res.rows[0].password)
    if (!validPassword) return EnumMessages.InvalidInformation

    const encryptedPassword = await bcrypt.hash(user.newPassword, 10)
    await pool.query('update public.users set password = $1 where id = $2', [encryptedPassword, user.id])
    pool.end()
    return EnumMessages.Success
  } catch (e) {
    throw e
  }
}

module.exports = AuthService
