//Health
const makeGetHealth = require("./health")
//Customers
const makePostCustomer = require("./customer/postCustomer")
const makeGetCustomerByToken = require('./customer/getCustomerByToken')
//Email
const makeGetEmailToken = require("./email/getEmailToken")
//Login
const makePostLogin = require('./login/postLogin')

//Use-cases...
const { verifyEmailToken } = require("../_use-cases")
const { registerCustomer } = require("../_use-cases")
const { retrieveCustomerByToken } = require('../_use-cases')
const { loginAction } = require('../_use-cases')


const getHealth = makeGetHealth()
const postCustomer = makePostCustomer({ registerCustomer })
const getEmailToken = makeGetEmailToken({ verifyEmailToken })
const getCustomerByToken = makeGetCustomerByToken({ retrieveCustomerByToken })
const postLogin = makePostLogin({ loginAction })

module.exports = {
  getHealth,
  postCustomer,
  getEmailToken,
  getCustomerByToken,
  postLogin
}
