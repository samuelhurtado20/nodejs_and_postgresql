//const { Client } = require('pg')
const Pool = require('pg').Pool

const CategoryService = {}

CategoryService.GetById = async (id) => {
  try {
    const pool = new Pool()
    const res = await pool.query('SELECT id, name FROM public.categories where id = $1', [id])
    pool.end()
    return res.rows
  } catch (e) {
    throw e
  }
}

CategoryService.Create = async (name) => {
  try {
    const pool = new Pool()
    const res = await pool.query('insert into public.categories (name) values ($1) RETURNING id', [name])
    pool.end()
    return await CategoryService.GetById(res.rows[0].id)
  } catch (e) {
    throw e
  }
}

CategoryService.Update = async (category) => {
  try {
    const pool = new Pool()
    const result = await pool.query('update public.categories set name= $1 where id = $2', [category.name, category.id])
    pool.end()
    const res = await CategoryService.GetById(category.id)
    return res
  } catch (e) {
    throw e
  }
}

CategoryService.Delete = async (id) => {
  try {
    const pool = new Pool()
    const res = await pool.query('delete from public.categories where id = $1', [id])
    pool.end()
    return res
  } catch (e) {
    throw e
  }
}

CategoryService.List = async () => {
  try {
    const pool = new Pool()
    const res = await pool.query('SELECT id, name FROM public.categories')
    pool.end()
    return res.rows
  } catch (e) {
    throw e
  }
}

module.exports = CategoryService
