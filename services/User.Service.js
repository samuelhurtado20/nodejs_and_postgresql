const Pool = require('pg').Pool
const bcrypt = require('bcryptjs/dist/bcrypt')

const UserService = {}

UserService.GetById = async (id) => {
  try {
    const pool = new Pool()
    const res = await pool.query('SELECT id, name, email FROM public.users where id = $1', [id])
    pool.end()
    return res.rows
  } catch (e) {
    throw e
  }
}

UserService.Create = async (user) => {
  try {
    const encryptedPassword = await bcrypt.hash(user.password, 10)
    const pool = new Pool()
    const res = await pool.query('insert into public.users (name, email, password) values ($1, $2, $3) RETURNING id', [
      user.name,
      user.email,
      encryptedPassword,
    ])
    pool.end()
    return await UserService.GetById(res.rows[0].id)
  } catch (e) {
    throw e
  }
}

UserService.Update = async (user) => {
  try {
    const pool = new Pool()
    const res = await pool.query('update public.users set name = $1 where id = $2', [user.name, user.id])
    pool.end()
    return UserService.GetById(user.id)
  } catch (e) {
    throw e
  }
}

UserService.Delete = async (id) => {
  try {
    const pool = new Pool()
    const res = await pool.query('delete from public.users where id = $1', [id])
    pool.end()
    return res
  } catch (e) {
    throw e
  }
}

UserService.List = async () => {
  try {
    const pool = new Pool()
    const res = await pool.query('SELECT id, name, email FROM public.users')
    pool.end()
    return res.rows
  } catch (e) {
    throw e
  }
}

UserService.GetByEmail = async (email) => {
  try {
    const pool = new Pool()
    const res = await pool.query('SELECT id, name, email, password FROM public.users where email = $1', [email])
    pool.end()
    return res.rows
  } catch (e) {
    throw e
  }
}

module.exports = UserService
