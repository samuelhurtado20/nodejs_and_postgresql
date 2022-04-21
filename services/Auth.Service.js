const { Client } = require('pg')
const bcrypt = require('bcryptjs/dist/bcrypt')
const jwt = require('jsonwebtoken')
const UserService = require('../services/User.Service')

const AuthService = {}

AuthService.Login = async (user) => {
  try {
    const client = new Client()
    await client.connect()
    const res = await client.query(`select id, email, name, password from public.users where email = '${user.email}'`)
    await client.end()
    if (!res.rowCount > 0) return { code: 401, message: 'Invalid login' }
    const validPassword = await bcrypt.compare(user.password, res.rows[0].password)
    if (!validPassword) return { code: 401, message: 'Invalid login' }
    res.rows[0].password = ''
    const token = jwt.sign({ user: res.rows[0] }, process.env.TOKEN_SECRET)
    return { code: 200, message: token }
  } catch (e) {
    throw e
  }
}

AuthService.ChangePassword = async (user) => {
  try {
    const client = new Client()
    await client.connect()

    const res = await client.query(`select id, email, name, password from public.users where id = '${user.id}'`)
    if (!res.rowCount > 0) return { code: 401, message: 'Invalid information' }
    const validPassword = await bcrypt.compare(user.currentPassword, res.rows[0].password)
    if (!validPassword) return { code: 401, message: 'Invalid information' }

    const encryptedPassword = await bcrypt.hash(user.newPassword, 10)
    await client.query(`update public.users set password= '${encryptedPassword}' where id = ${user.id}`)
    await client.end()
    return UserService.GetById(user.id)
  } catch (e) {
    throw e
  }
}

module.exports = AuthService
