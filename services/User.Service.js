const { Client } = require('pg')
const bcrypt = require('bcryptjs/dist/bcrypt')

const UserService = {}

UserService.GetById = async (id) => {
  try {
    const client = new Client()
    await client.connect()
    const res = await client.query(`SELECT id, name, email FROM public.users where id = ${id}`)
    await client.end()
    return res.rows
  } catch (e) {
    throw e
  }
}

UserService.Create = async (user) => {
  try {
    const encryptedPassword = await bcrypt.hash(user.password, 10)

    const client = new Client()
    await client.connect()
    const res = await client.query(
      `insert into public.users (name, email, password) values ('${user.name}', '${user.email}', '${encryptedPassword}') RETURNING id`
    )
    await client.end()
    return await UserService.GetById(res.rows[0].id)
  } catch (e) {
    throw e
  }
}

UserService.Update = async (user) => {
  try {
    const client = new Client()
    await client.connect()
    await client.query(`update public.users set name= '${user.name}' where id = ${user.id}`)
    await client.end()
    return UserService.GetById(user.id)
  } catch (e) {
    throw e
  }
}

UserService.Delete = async (id) => {
  try {
    const client = new Client()
    await client.connect()
    const res = await client.query(`delete from public.users where id = ${id}`)
    await client.end()
    return res
  } catch (e) {
    throw e
  }
}

UserService.List = async () => {
  try {
    const client = new Client()
    await client.connect()
    const res = await client.query('SELECT id, name, email FROM public.users')
    await client.end()
    return res.rows
  } catch (e) {
    throw e
  }
}

UserService.GetByEmail = async (email) => {
  try {
    const client = new Client()
    await client.connect()
    const res = await client.query(`SELECT id, name, email FROM public.users where email = '${email}'`)
    await client.end()
    return res.rows
  } catch (e) {
    throw e
  }
}

module.exports = UserService
