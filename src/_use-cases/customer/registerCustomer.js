const { customer: customerEntity } = require("../../_entities")

const makeRegisterCustomer = ({ bcrypt, Customer, sendEmail, jwt }) => {

  const saveToDb = (customer, hashedPassword) => Customer.create({
    name: customer.getName(),
    securityNumber: customer.getSecurityNumber(),
    email: customer.getEmail(),
    active: customer.getActive(),
    password: hashedPassword,
  }).catch(err => {
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

    //both has to work: transaction'
    await saveToDb(customer, hashedPassword)
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