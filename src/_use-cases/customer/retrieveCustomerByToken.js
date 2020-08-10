const makeRetrieveCustomerByToken = ({ Customer, Address, BankCard, jwt, builder }) => {
  const findBankCards = (id) =>
    BankCard.findAll({
      where: {
        customerId: id,
      },
      raw: true,
    })

  const findCustomer = ({ username }) =>
    Customer.findOne({
      where: {
        email: username,
      },
      include: [
        {
          model: Address,
          as: "address",
          through: { attributes: [] },
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
    console.log("2 customerEmail: ", customerEmail)
    const customerFound = await findCustomer(customerEmail)
    if (!customerFound) {
      console.log('3')
      throw new Error("Customer was not found!")
    } else {
      const customerBankCards = await findBankCards(customerFound.id)
      const customerFoundFormatted = builder.customerByTokenResponse(
        customerFound, customerBankCards
      )
      activateCustomer(customerFound)
      const { password, ...customerObj } = customerFoundFormatted
      console.log(`5`, customerObj)
      return customerObj
    }

  }
}

module.exports = makeRetrieveCustomerByToken
