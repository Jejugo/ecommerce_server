const makeVerifyEmailToken = ({ jwt, Customer } = {}) => {

  const activateCustomer = ({ email, active }) => {
    if (active !== 1)
      return Customer.update({ active: true }, { where: { email } })
    return null
  }

  const findCustomer = (email) =>
  Customer.findOne({
    where: {
      email
    },
  })

  return async function verifyEmailToken(code = ''){
    //verify if user exists on database
    const customerEmail = await jwt.verify(code, process.env.EMAIL_TOKEN)
    const customerFound = await findCustomer(customerEmail)

    if (!customerFound) {
      throw new Error("User is not valid.")
    }

    await activateCustomer(customerFound)

    return true
  }
}

module.exports = makeVerifyEmailToken