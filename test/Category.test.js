const app = require('../app')
const request = require('supertest')

const CategoryForTest = {
  name: 'Category For Tests',
}

describe('CATEGORY /api/category/', () => {
  test('POST  expect 201 status code', async () => {
    const response = await request(app).post('/api/category/').send(CategoryForTest)
    expect(response.body).toHaveLength(1)
    expect(response.body[0].name).toBe(CategoryForTest.name)
    expect(response.statusCode).toBe(201)
    CategoryForTest.id = response.body[0].id
  })

  test('PUT   expect 200 status code', async () => {
    const response = await request(app).put('/api/category/').send(CategoryForTest)
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveLength(1)
    expect(response.body[0].name).toBe(CategoryForTest.name)
  })

  test('GET   expect 200 status code', async () => {
    const response = await request(app).get('/api/category/').send()
    expect(response.statusCode).toBe(200)
    expect(response.body.length > 0).toBe(true)
  })

  test('GET   expect 200 status code', async () => {
    const response = await request(app)
      .get('/api/category/' + CategoryForTest.id)
      .send()
    expect(response.statusCode).toBe(200)
    expect(response.body.length > 0).toBe(true)
    expect(response.body).toHaveLength(1)
  })

  test('DEL   expect 200 status code', async () => {
    const response = await request(app)
      .delete('/api/category/' + CategoryForTest.id)
      .send()
    expect(response.statusCode).toBe(200)
    expect(parseInt(response.body.rowCount)).toBe(1)
  })
})
