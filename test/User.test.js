const app = require('../app')
const request = require('supertest')

let UserForTest = {
  name: 'UserFor Tests',
  email: 'userfor@test.com',
  password: 'password2022',
}

describe('USER /api/user/', () => {
  test('POST  expect 201 status code', async () => {
    const response = await request(app).post('/api/user/').send(UserForTest)
    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveLength(1)
    expect(response.body[0].name).toBe(UserForTest.name)
    UserForTest.id = response.body[0].id
  })

  test('PUT   expect 200 status code', async () => {
    let user = { id: UserForTest.id, name: 'User ForTests' }
    const response = await request(app).put('/api/user/').send(user)
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveLength(1)
    expect(response.body[0].name).toBe(user.name)
  })

  test('GET   expect 200 status code', async () => {
    const response = await request(app).get('/api/user/').send()
    expect(response.statusCode).toBe(200)
    expect(response.body.length > 0).toBe(true)
  })

  test('GET   expect 200 status code', async () => {
    const response = await request(app)
      .get('/api/user/' + UserForTest.id)
      .send()
    expect(response.statusCode).toBe(200)
    expect(response.body.length > 0).toBe(true)
    expect(response.body).toHaveLength(1)
  })

  test('DEL   expect 200 status code', async () => {
    const response = await request(app)
      .delete('/api/user/' + UserForTest.id)
      .send()
    expect(response.statusCode).toBe(200)
    expect(parseInt(response.body.rowCount)).toBe(1)
  })
})
