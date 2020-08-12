const { customer: customerEntity } = require("../../_entities")

const makeRegisterCustomer = ({ bcrypt, Customer, sendEmail, jwt }) => {

  const saveToDb = (customer, hashedPassword) => Customer.create({
      name: customer.getName(),
      securityNumber: customer.getSecurityNumber(),
      email: customer.getEmail(),
      active: customer.getActive(),
      password: hashedPassword,
    }).catch(err => {
      console.error(err)
      new Error('ERROR_DATABASE_CUSTOMER_CREATE')
    })

  const findCustomer = (email) =>
    Customer.findOne({
      where: {
        email,
      },
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
    //both has to work!!! transaction
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


    //create all addresses for single customer. 
    // const addressesCreated = await Promise.all(
    //   addresses.map((address) =>
    //     Address.create({
    //       street: address.getStreet(),
    //       number: address.getNumber(),
    //       neighborhood: address.getNeighborhood(),
    //       complement: address.getComplement(),
    //       zipcode: address.getZipcode(),
    //     })
    //   )
    // )
    // const idList = addressesCreated.map((addressCreated) =>
    //   addressCreated.get({ plain: true }).id
    // )

    // await Promise.all(idList.map((id) => customerCreate.setAddress([id])))
