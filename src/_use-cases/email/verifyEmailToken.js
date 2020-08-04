const makeVerifyEmailToken = ({ jwt, Customer } = {}) => {

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

    return true
  }
}

module.exports = makeVerifyEmailToken