const makeRetrieveCustomerByToken = ({ Customer, Address, jwt, builder }) => {
  const findCustomer = ({ username }) =>
    Customer.findOne({
      where: {
        email: username
      },
      include: [
        {
          model: Address,
          as: "address",
          through: { attributes: [] }
        },
      ],
      raw: true,
    }).catch((err) => {
      console.error(err)
      throw new Error("CUSTOMER_NOT_FOUND")
    })

  const activateCustomer = ({ email, active }) => {
    if (active !== 1)
      return Customer.update({ active: true }, { where: { email } })
    return null
  }

  return async function retrieveCustomerByToken(token) {
    const customerEmail = await jwt.verify(
      token.toString(),
      process.env.ACCESS_TOKEN_SECRET
    )
    console.log("customerEmail: ", customerEmail)
    const customerFound = await findCustomer(customerEmail)
    const customerFoundFormatted = builder.customerByTokenResponse(customerFound)
    //find address with customerId
    //send back data with addresses and personal data
    if (!customerFound) {
      throw new Error("Customer was not found!")
    } else {
      activateCustomer(customerFound)
      const { password, ...customerObj } = customerFoundFormatted
      console.log(customerObj)
      return customerObj
    }
  }
}

module.exports = makeRetrieveCustomerByToken
