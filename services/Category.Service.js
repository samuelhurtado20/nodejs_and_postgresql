const { Client } = require('pg')

const CategoryService = {}

CategoryService.GetById = async (id) => {
  try {
    const client = new Client()
    await client.connect()
    const res = await client.query(`SELECT id, name FROM public.categories where id = ${id}`)
    await client.end()
    return res.rows
  } catch (e) {
    throw e
  }
}

CategoryService.Create = async (name) => {
  try {
    const client = new Client()
    await client.connect()
    const res = await client.query("insert into public.categories (name) values ('" + name + "') RETURNING id")
    await client.end()
    return await CategoryService.GetById(res.rows[0].id)
  } catch (e) {
    throw e
  }
}

CategoryService.Update = async (category) => {
  try {
    const client = new Client()
    await client.connect()
    await client.query(`update public.categories set name= '${category.name}' where id = ${category.id}`)
    await client.end()
    return await CategoryService.GetById(category.id)
  } catch (e) {
    throw e
  }
}

CategoryService.Delete = async (id) => {
  try {
    const client = new Client()
    await client.connect()
    const res = await client.query(`delete from public.categories where id = ${id}`)
    await client.end()
    return res
  } catch (e) {
    throw e
  }
}

CategoryService.List = async () => {
  try {
    const client = new Client()
    await client.connect()
    const res = await client.query('SELECT id, name FROM public.categories')
    await client.end()
    return res.rows
  } catch (e) {
    throw e
  }
}

module.exports = CategoryService
