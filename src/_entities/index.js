const makeCustomer = require("./customer")
const makeAddress = require("./address")
const makeLogin = require("./login")
const makeCreditCard = require("./credit-card")

const { isEmailValid } = require("../validators/email")

const customer = makeCustomer({ isEmailValid })
const address = makeAddress()
const login = makeLogin()
const creditCard = makeCreditCard()

module.exports = {
  customer,
  address,
  login,
  creditCard
}
