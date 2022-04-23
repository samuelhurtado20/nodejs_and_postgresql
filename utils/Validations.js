const Joi = require('@hapi/joi')

const createUser = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
})

const updateUser = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().min(6).required(),
})

const changePassword = Joi.object({
  id: Joi.number().required(),
  currentPassword: Joi.string().min(6).required(),
  newPassword: Joi.string().min(6).required(),
})

const createCategory = Joi.object({
  name: Joi.string().min(3).required(),
})

const updateCategory = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().min(3).required(),
})

const login = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
})

class DataValidation {
  static createUser(request) {
    return createUser.validate(request)
  }
  static updateUser(request) {
    return updateUser.validate(request)
  }

  static createCategory(request) {
    return createCategory.validate(request)
  }

  static updateCategory(request) {
    return updateCategory.validate(request)
  }

  static login(request) {
    return login.validate(request)
  }

  static changePassword(request) {
    return changePassword.validate(request)
  }
}

module.exports = { DataValidation }
