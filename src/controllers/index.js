const makeGetHealth = require('./health')
const makePostCustomer = require('./customer/postCustomer')

const getHealth = makeGetHealth()
const postCustomer = makePostCustomer()

module.exports = {
  getHealth,
  postCustomer
}