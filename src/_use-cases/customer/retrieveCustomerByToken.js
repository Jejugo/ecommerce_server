const { customer } = require("../../_entities")

const makeRetrieveCustomerByToken = ({ Customer, jwt }) => {
  const findCustomer = ({ username }) =>
    Customer.findOne({
      where: {
        email: username
      },
      raw: true,
    }).catch((err) => {
      console.error(err)
      throw new Error("CUSTOMER_NOT_FOUND")
    })

  const activateCustomer = ({ email, active }) => {
    if (active !== 1) return Customer.update({ active: true }, { where: { email } })
    return null
  }

  return async function retrieveCustomerByToken(token) {
    const customerEmail = await jwt.verify(token.toString(), process.env.ACCESS_TOKEN_SECRET)
    const customerFound = await findCustomer(customerEmail)
    if (!customerFound) {
      throw new Error("Customer was not found!")
    } else {
      activateCustomer(customerFound)
      const { password, ...customerObj } = customerFound
      return customerObj
    }
  }
}

module.exports = makeRetrieveCustomerByToken
