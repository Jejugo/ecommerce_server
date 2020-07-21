const makeCustomer = require('./customer')
const makeAddress = require('./address')

const { isEmailValid } = require('../validators/email')

const customer = makeCustomer({ isEmailValid })
const address = makeAddress()

module.exports = {
  customer, address
}