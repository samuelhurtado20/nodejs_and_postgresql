const app = require('../app')
const request = require('supertest')
const EnumMessages = require('../types/EnumMessages')

let LoginForTest = { email: 'samuelhurtado20@gmail.com', password: 'password2022' }
let changePassword = { id: process.env.ID_USER_FAKE, currentPassword: 'password2022', newPassword: 'password2022' }

describe('AUTH /api/auth/', () => {
  test('POST  expect 200 status code', async () => {
    const response = await request(app).post('/api/auth/').send(LoginForTest)
    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    expect(response.body).toHaveProperty('token')
    expect(response.body.token.length > 30).toBe(true)
  })

  test('PUT   expect 200 status code', async () => {
    const response = await request(app).put('/api/auth/').send(changePassword)
    expect(response.statusCode).toBe(200)
    expect(response.body.code).toBe(EnumMessages.Success.code)
  })
})
