const makeRegisterCustomer = require('./customer/registerCustomer')

const bcrypt = require('bcrypt')
const { Customer, Address } = require('../models')
const registerCustomer = makeRegisterCustomer({ bcrypt, Customer, Address })

module.exports = {
  registerCustomer
}