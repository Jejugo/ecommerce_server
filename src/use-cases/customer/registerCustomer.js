const { customer: customerEntity } = require("../../entities")

const makeRegisterCustomer = ({ bcrypt, Customer }) => {

  const saveToDb = async (customer, hashedPassword) => Customer.create({
      name: customer.getName(),
      securityNumber: customer.getSecurityNumber(),
      email: customer.getEmail(),
      password: hashedPassword,
    })

  const findCustomer = async (name) =>
    Customer.findOne({
      where: {
        name,
      },
    })

  return async function registerCustomer(customerBody) {
    const customer = customerEntity({
      ...customerBody,
    })

    const customerFound = await findCustomer(customer.getName())

    if (customerFound) {
      throw new Error("Customer already exists.")
    }

    const hashedPassword = await bcrypt.hash(customer.getPassword(), 10)
    await saveToDb(customer, hashedPassword)

    

    return {
      message: "Data saved successfully.",
      data: customer,
    }
  }
}

module.exports = makeRegisterCustomer


    // //create all addresses for single customer. 
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
