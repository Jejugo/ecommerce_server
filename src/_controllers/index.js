//Health
const makeGetHealth = require("./health")
//Customers
const makePostCustomer = require("./customer/postCustomer")
const makeGetCustomerByToken = require('./customer/getCustomerByToken')
const makePutCustomer = require('./customer/putCustomer')
//Email
const makeGetEmailToken = require("./email/getEmailToken")
//Auth
const makePostRefreshToken = require('./authentication/postRefreshToken')
const makePostLogin = require('./login/postLogin')
//Purchase
const makePostCheckout = require('./purchase/checkout')
//Products
const makeGetProducts = require('./product/getProducts')
const makeGetProduct = require('./product/getProduct')

const jwt = require('jsonwebtoken')
const errorMessages = require('../error-messages.json')

//Use-cases...
const { verifyEmailToken } = require("../_use-cases")
const { registerCustomer } = require("../_use-cases")
const { retrieveCustomerByToken } = require('../_use-cases')
const { loginAction } = require('../_use-cases')
const { updateCustomer } = require('../_use-cases')
const { checkoutAction } = require('../_use-cases')
const { retrieveProducts } = require('../_use-cases')
const { retrieveProduct } = require('../_use-cases')


const getHealth = makeGetHealth()
const postCustomer = makePostCustomer({ registerCustomer, errorMessages })
const getEmailToken = makeGetEmailToken({ verifyEmailToken, errorMessages })
const getCustomerByToken = makeGetCustomerByToken({ retrieveCustomerByToken, errorMessages })
const postLogin = makePostLogin({ loginAction, errorMessages })
const postRefreshToken = makePostRefreshToken({ jwt, errorMessages })
const putCustomer = makePutCustomer({ updateCustomer, errorMessages })
const postCheckout = makePostCheckout({ checkoutAction, errorMessages })
const getProducts = makeGetProducts({ retrieveProducts, errorMessages })
const getProduct = makeGetProduct({ retrieveProduct, errorMessages })

module.exports = {
  getHealth,
  postCustomer,
  getEmailToken,
  getCustomerByToken,
  postLogin,
  postRefreshToken,
  putCustomer,
  postCheckout,
  getProducts,
  getProduct
}
