const makeCustomer = require("./customer")
const makeAddress = require("./address")
const makeLogin = require("./login")

const { isEmailValid } = require("../validators/email")

const customer = makeCustomer({ isEmailValid })
const address = makeAddress()
const login = makeLogin()

module.exports = {
  customer,
  address,
  login,
}
