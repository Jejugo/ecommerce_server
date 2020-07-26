const makeRegisterCustomer = require('./customer/registerCustomer')
const makeVerifyEmailToken = require('./email/verifyEmailToken')

const bcrypt = require('bcrypt')
const { Customer } = require('../models')


const registerCustomer = makeRegisterCustomer({ bcrypt, Customer })
const verifyEmailToken = makeVerifyEmailToken({})

module.exports = {
  registerCustomer,
  verifyEmailToken
}