const { customer: customerEntity } = require("../../_entities")

const makeRegisterCustomer = ({ bcrypt, Customer, sendEmail, jwt, stripeMethods, builder }) => {

  const saveToStripe = (customer) => stripeMethods.createUser({
    name: customer.getName(),
    email: customer.getEmail(),
  })

  const saveToDb = (customer, hashedPassword, stripeId) => Customer
    .create(builder.customerRegistration(customer, hashedPassword, stripeId))
    .catch(err => {
    console.error('erro:', err)
    new Error('ERROR_DATABASE_CUSTOMER_CREATE')
  })

  const findCustomer = (email) => Customer.findOne({
    where: {
      email,
    },
  }).catch(err => {
    console.error('erro:', err)
    new Error('ERROR_FIND_CUSTOMER')
  })


  const generateEmailToken = (email) => jwt.sign(email, process.env.EMAIL_TOKEN)

  return async function registerCustomer(customerBody) {

    const customer = customerEntity({
      ...customerBody,
    })

    const customerFound = await findCustomer(customer.getEmail())

    if (customerFound) {
      throw new Error("Customer already exists.")
    }

    const hashedPassword = await bcrypt.hash(customer.getPassword(), 10)
    const emailToken = generateEmailToken(customer.getEmail())

    const stripeCustomer = await saveToStripe(customer)
    await saveToDb(customer, hashedPassword, stripeCustomer.id)
    await sendEmail({ name: customer.getName(), customerEmail: customer.getEmail(), emailToken })

    return {
      message: "Data saved successfully.",
      data: {
        customer: {
          name: customer.getName(),
          email: customer.getEmail()
        }
      },
    }
  }
}

module.exports = makeRegisterCustomer